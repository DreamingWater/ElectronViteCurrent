// @ts-nocheck
import { defineStore, acceptHMRUpdate } from 'pinia'
import {
    WaterCoolingType,
    WaterCoolingSettingDataModel,
    WaterCoolingGettingDataModel
} from "../types/manager";

function createWaterCoolingStore(id: string) {
    return defineStore({
        id,
        state: () => ({
            StoreData: {
                CurrentFlow: 0,         //  流量
                CurrentCompressorSpeed:0,
                WorkingStatus:0,        // 只关心这个，其它均不关心
                CurrentTemperature:0,
                SettingTemperature:0,
            } as WaterCoolingType,
        }),
        getters: {
            getTargetParameter: (state) => (data:WaterCoolingGettingDataModel) => {
                if (data.data_type in state.StoreData) {
                    return state.StoreData[data.data_type];
                }
                return null;
            },
        },
        actions: {
            // 设置参数
            setTargetParameter(data:WaterCoolingSettingDataModel) {
                if (data.data_type in this.StoreData) {
                    this.StoreData[data.data_type] = data.value;
                }
            }
        },
    });
}

export const useWaterCoolingStore = createWaterCoolingStore('use-watercooling');