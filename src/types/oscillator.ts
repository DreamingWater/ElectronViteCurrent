import {WaterCoolingType} from "./waterCooling";



interface FunctionIndexType{
    HeartReplyIndex?: number;         // 心跳的回复index
    UploadDataIndex?: number;         // 数据上报index
}


export interface OscillatorType{
    EnableStatus:number;    // 开关状态
    IsOpen?:number;         // 是否开启
    SetTemperature?: number;
    WorkingTemperature?: number;
    SetCurrent?: number;
    WorkingCurrent?: number;
    SamplingCurrentList?:number[];

    SamplingTemperature?: number;
    SamplingCurrent?: number;
    SamplingTemperatureList?:number[];

    StepTemperature?: number;  // 温度的调节步长
    StepCurrent?: number;      // 电流的调节步长
    functionIndexes?: FunctionIndexType;
}


export interface OscillatorSettingDataModel {
    data_type: keyof OscillatorType;
    value: number;
}

export interface OscillatorGettingDataModel {
    data_type: keyof OscillatorType;
}
