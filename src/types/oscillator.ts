import {WaterCoolingType} from "./waterCooling";


export interface OscillatorType{
    SetTemperature?: number;
    WorkingTemperature?: number;
    SetCurrent?: number;
    WorkingCurrent?: number;

    SamplingTemperature?: number;
    SamplingCurrent?: number;
    SamplingTemperatureList?:number[];

    StepTemperature?: number;  // 温度的调节步长
    StepCurrent?: number;      // 电流的调节步长

}


export interface OscillatorSettingDataModel {
    data_type: keyof OscillatorType;
    value: number;
}

export interface OscillatorGettingDataModel {
    data_type: keyof OscillatorType;
}
