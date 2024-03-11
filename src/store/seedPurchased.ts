// @ts-nocheck
import { defineStore, acceptHMRUpdate } from 'pinia'
import {
    CurrentParameter, TemperatureParameter,
    SeedPurchasedState,SeedPurchasedSettingDataModel,
    SeedPurchasedGettingDataModel
} from "../types/seedPurchased";

function createSeedPurchasedStore(id: string) {
    return defineStore({
        id,
        state: () => ({
            StoreData: {
                SetPower: 0,        // 设定激光功率
                WorkingPower:0,
                SamplePower:0,
                SetWavelength: 1540.216,   // 设定激光波长
                WorkingWavelength :1540.216,
                // 读取的温度值
                TemperatureParams: {
                    TemperatureModule:0,
                    TemperatureOne:0,
                    TemperatureTwo:0,
                    TemperatureSeed:0,
                } as TemperatureParameter,
                CurrentParams: {
                    CurrentOne: 0,
                    CurrentTwo: 0,
                } as CurrentParameter,
                WorkingStatus: 0,      // 工作状态
                EnableStatus: 0,       // 开关状态
            } as SeedPurchasedState,
        }),
        getters: {
            getTargetParameter: (state) => (data:SeedPurchasedGettingDataModel) => {
                if (data.data_type in state.StoreData) {
                    return state.StoreData[data.data_type];
                }
                if (data.data_type in state.StoreData.TemperatureParams) {
                    return state.StoreData.TemperatureParams[data.data_type];
                }
                if (data.data_type in state.StoreData.CurrentParams) {
                    return state.StoreData.CurrentParams[data.data_type];
                }
                return null;
            },
        },
        actions: {
            // 设置参数
            setTargetParameter(data:SeedPurchasedSettingDataModel) {
                if (data.data_type in this.StoreData) {
                    this.StoreData[data.data_type] = data.value;
                }
                else if (data.data_type in this.StoreData.TemperatureParams) {
                    this.StoreData.TemperatureParams[data.data_type] = data.value;
                }
                else if (data.data_type in this.StoreData.CurrentParams) {
                    this.StoreData.CurrentParams[data.data_type] = data.value;
                }
            }
        },
    });
}

export const useSeedPurchasedStore = createSeedPurchasedStore('use-seed_purchased');