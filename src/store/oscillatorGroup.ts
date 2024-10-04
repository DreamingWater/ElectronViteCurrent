// @ts-nocheck
import { defineStore, acceptHMRUpdate } from 'pinia'
import {OscillatorGettingDataModel, OscillatorSettingDataModel, OscillatorType} from "../types/oscillator";

function createOscillatorStore(id: string) {
    return defineStore({
        id,
        state: () => ({
            StoreData: {
                EnableStatus:0,    // RX的开关状态
                IsOpen:0,         // 是否开启
                SetTemperature:20,
                WorkingTemperature: 20,
                SetCurrent: 0,
                WorkingCurrent: 150,
                SamplingCurrentList:[20,15,20,15,20],
                SamplingTemperature: 0,
                SamplingCurrent: 0,
                SamplingTemperatureList:[10,0,20,0,10],
                StepTemperature: 0.1,  // 温度的调节步长
                StepCurrent: 0.1,      // 电流的调节步长
                functionIndexes: {
                    HeartReplyIndex: 0,         // 心跳的回复index
                    UploadDataIndex: 0,         // 数据上报index
                },
            } as OscillatorType,
            MaxLength: 40,
        }),
        getters: {
            getTargetParameter: (state) => (data:OscillatorGettingDataModel) => {
                if (data.data_type in state.StoreData) {
                    return state.StoreData[data.data_type];
                }
                if(data.data_type in state.StoreData.functionIndexes){
                    return state.StoreData.functionIndexes[data.data_type];
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
            setSampleCurrentList(value:number){
                this.StoreData.SamplingCurrentList.push(value);
                if (this.StoreData.SamplingCurrentList.length > this.MaxLength) {
                    this.StoreData.SamplingCurrentList.shift();
                }
            },
            // 设置参数
            setTargetParameter(data:OscillatorSettingDataModel) {
                if (data.data_type in this.StoreData) {
                    this.StoreData[data.data_type] = data.value;
                    if (data.data_type === 'SamplingTemperature') { // 如果是采样电阻采集的温度，更新list
                        this.setSampleTemperatureList(data.value)
                    }
                    if (data.data_type === 'SamplingCurrent') { // 如果是采样电阻采集的温度，更新list
                        this.setSampleCurrentList(data.value)
                    }
                }
                else if (data.data_type in this.StoreData.functionIndexes) {
                    this.StoreData.functionIndexes[data.data_type] = data.value;
                }
            }
        },
    });
}

export const useOscillatorGroupStore = createOscillatorStore('use-oscillator');