// @ts-nocheck
import { defineStore, acceptHMRUpdate } from 'pinia'
import { TemperatureGroupState, PidParameter,
    TemperatureSettingDataModel,TemperatureGettingDataModel } from '@/types/temperature';

function createTemperatureStore(id: string) {
    return defineStore({
        id,
        state: () => ({
            Temperature_Data: {
                SetTemperature: 20,
                WorkingTemperature: 20,
                SamplingTemperature: 30,
                SamplingTemperatureList:[1,2,3],
                PIDParameter: {
                    SetProportional: 50,
                    SetIntegral: 10,
                    SetDerivative: 20,
                    WorkingProportional: 50,
                    WorkingIntegral: 10,
                    WorkingDerivative: 20,
                } as PidParameter,
                HeaterCoolerStatus: 1,
                WorkingStatus: 0,
                EnableStatus: 0,
            } as TemperatureGroupState,
            MaxLength: 80,
        }),
        getters: {
            getTargetParameter: (state) => (data:TemperatureGettingDataModel) => {
                if (data.data_type in state.Temperature_Data) {
                    return state.Temperature_Data[data.data_type];
                }
                if (data.data_type in state.Temperature_Data.PIDParameter) {
                    return state.Temperature_Data.PIDParameter[data.data_type];
                }
                return null;
            },
        },
        actions: {
            // 更新数据到list中
            setSampleTemperatureList(value:number){
                this.Temperature_Data.SamplingTemperatureList.push(value);
                if (this.Temperature_Data.SamplingTemperatureList.length > this.MaxLength) {
                    this.Temperature_Data.SamplingTemperatureList.shift();
                }
            },
            // 设置参数
            setTargetParameter(data:TemperatureSettingDataModel) {
                if (data.data_type in this.Temperature_Data) {
                    this.Temperature_Data[data.data_type] = data.value;
                    if (data.data_type === 'SamplingTemperature') { // 如果是采样电阻采集的温度，更新list
                        this.setSampleTemperatureList(data.value)
                    }
                }
                if (data.data_type in this.Temperature_Data.PIDParameter) {
                    this.Temperature_Data.PIDParameter[data.data_type] = data.value;
                }
            }
        },
    });
}

export const useTemperatureGroupStore = createTemperatureStore('use-temperature');