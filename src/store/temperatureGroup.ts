// @ts-nocheck
import { defineStore, acceptHMRUpdate } from 'pinia'
import { TemperatureGroupState, PidParameter,
    TemperatureSettingDataModel,TemperatureGettingDataModel } from '@/types/temperature';

function createTemperatureStore(id: string) {
    return defineStore({
        id,
        state: () => ({
            Temperature_Data: {
                SetTemperature: 0,
                WorkingTemperature: 20,
                SamplingTemperature: 30,
                SamplingTemperatureList:[1,2,3,4,5,6,5,4,3,2,1,3,6],
                PIDParameter: {
                    SetProportional: 0,
                    SetIntegral: 0,
                    SetDerivative: 0,
                    WorkingProportional: 0,
                    WorkingIntegral: 0,
                    WorkingDerivative: 0,
                } as PidParameter,
                SetHeaterCooler: 0,
                WorkingStatus: 0,
                EnableStatus: 0,
            } as TemperatureGroupState,
            MaxLength: 200,
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
            setWorkingTemperatureList(value:number){
                this.Temperature_Data.WorkingTemperatureList.push(value);
                if (this.Temperature_Data.WorkingTemperatureList.length > this.MaxLength) {
                    this.Temperature_Data.WorkingTemperatureList.shift();
                }
            },
            // 设置参数
            setTargetParameter(data:TemperatureSettingDataModel) {
                if (data.data_type in this.Temperature_Data) {
                    this.Temperature_Data[data.data_type] = data.value;
                    if (data.data_type === 'SamplingTemperature') { // 如果是采样电阻采集的温度，更新list
                        this.setWorkingTemperatureList(data.value)
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