// @ts-nocheck
import { defineStore, acceptHMRUpdate } from 'pinia'
import {OscillatorGettingDataModel, OscillatorSettingDataModel, OscillatorType} from "../types/oscillator";

function createOscillatorStore(id: string) {
    return defineStore({
        id,
        state: () => ({
            StoreData: {
                SetTemperature:20,
                WorkingTemperature: 20,
                SetCurrent: 0,
                WorkingCurrent: 20000,

                SamplingTemperature: 0,
                SamplingCurrent: 10,
                SamplingTemperatureList:[0,0,0,0],
                StepTemperature: 0.1,  // 温度的调节步长
                StepCurrent: 0.1,      // 电流的调节步长
            } as OscillatorType,
            MaxLength: 80,
        }),
        getters: {
            getTargetParameter: (state) => (data:OscillatorSettingDataModel) => {
                if (data.data_type in state.StoreData) {
                    return state.StoreData[data.data_type];
                }
                return null;
            },
        },
        actions: {
            // 更新数据到list中
            setSampleTemperatureList(value:number){
                this.StoreData.SamplingTemperatureList.push(value);
                if (this.StoreData.SamplingTemperatureList.length > this.MaxLength) {
                    this.StoreData.SamplingTemperatureList.shift();
                }
            },
            // 设置参数
            setTargetParameter(data:OscillatorGettingDataModel) {
                if (data.data_type in this.StoreData) {
                    this.StoreData[data.data_type] = data.value;
                    if (data.data_type === 'SamplingTemperature') { // 如果是采样电阻采集的温度，更新list
                        this.setSampleTemperatureList(data.value)
                    }
                }
            }
        },
    });
}

export const useOscillatorGroupStore = createOscillatorStore('use-oscillator');