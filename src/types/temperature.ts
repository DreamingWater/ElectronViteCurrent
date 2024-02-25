import {AmplifierChannelModel, AmplifierGroupState, CurrentPowerValueModel, DataTypeModel} from "./amplifier";

export interface PidParameter {
    SetProportional  ?: number;
    SetIntegral ?: number;
    SetDerivative ?:  number;
    WorkingProportional ?:  number;
    WorkingIntegral ?:  number;
    WorkingDerivative ?:  number;
}

export interface TemperatureGroupState{
    WorkingTemperature ?:  number;  // 温度cache，温度设定数值在嵌入式的表现数值
    SetTemperature?: number;        // 设定温度,和 input关联
    // 读取的温度值
    SamplingTemperature?: number;
    SamplingTemperatureList?: [];

    PIDParameter?: PidParameter;
    SetHeaterCooler:number;    //  0 双向； 1 制热；2 单制冷
    WorkingStatus:number;      // 工作状态
    EnableStatus:number;       // 工作状态
}

export interface TemperatureSettingDataModel {
    data_type: keyof TemperatureGroupState;
    value: number;
}

export interface TemperatureGettingDataModel {
    data_type: keyof TemperatureGroupState;
}
