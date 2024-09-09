// @ts-nocheck
import { defineStore, acceptHMRUpdate } from 'pinia'
import {
    MonitorType,
    MonitorSettingDataModel,
    MonitorGettingDataModel
} from "../types/manager";

function createMonitorStore(id: string) {
    return defineStore({
        id,
        state: () => ({
            StoreData: {
                BackPower: 0,        // 设定激光功率
                WorkingStatus:0,
                HeatTemperature : 0,
                OuterTemperature : 0,
                HeatHumidity : 0,
                OuterHumidity : 0,
            } as MonitorType,
        }),
        getters: {
            getTargetParameter: (state) => (data:MonitorGettingDataModel) => {
                if (data.data_type in state.StoreData) {
                    return state.StoreData[data.data_type];
                }
                return null;
            },
        },
        actions: {
            // 设置参数
            setTargetParameter(data:MonitorSettingDataModel) {
                if (data.data_type in this.StoreData) {
                    this.StoreData[data.data_type] = data.value;
                }
            }
        },
    });
}

export const useMonitorStore = createMonitorStore('use-monitor');