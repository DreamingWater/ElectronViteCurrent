import {TemperatureGroupState} from "./temperature";

export interface WaterCoolingType{
    CurrentFlow ?: number;     //  流量
    CurrentCompressorSpeed ?: number; // 压缩机转速
    WorkingStatus ?: number; // 工作状态
    CurrentTemperature ?: number; // 当前温度
    SettingTemperature ?: number; // 设定温度
}


export interface WaterCoolingSettingDataModel {
    data_type: keyof WaterCoolingType;
    value: number;
}

export interface WaterCoolingGettingDataModel {
    data_type: keyof WaterCoolingType;
}
