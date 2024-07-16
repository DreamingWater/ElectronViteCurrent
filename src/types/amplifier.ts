export interface CurrentPowerType{
    SetPower : number;     // 希望发送给放大器设定的功率
    WorkingPower : number; // 放大器目前状态的功率
    Current : number;
}

export interface PidParameter {
    SetProportional  ?: number;
    SetIntegral ?: number;
    SetDerivative ?:  number;
}

export type CurrentPowerValueModel = 'SetPower' | 'Current' | 'WorkingPower';
export interface AmplifierGroupState{
    Channel_ONE : CurrentPowerType;
    Channel_TWO : CurrentPowerType;
    Channel_THREE : CurrentPowerType;
    Temperature:number;
    WorkingStatus:number; // 放大器的工作状态
    EnableStatus:number;    // 放大器的开关状态
    PIDParameter : PidParameter ; // 放大器3的PID参数
    PID_Enable : number ; // 是否使能PID控制
}
export type AmplifierChannelModel = 'ONE' | 'TWO' | 'THREE';

export type DataTypeModel = 'PowerCurrent' | 'Temperature' | 'WorkingStatus' | 'EnableStatus'|'SetProportional'|'SetIntegral'|'SetDerivative'|'PID_Enable';

export interface AmplifierSettingDataModel {
    data_type: DataTypeModel;
    value: number;
    value_TWO?: number;
    value_THREE?: number;
    channel_name?: AmplifierChannelModel;
    value_model?: CurrentPowerValueModel;
}

export interface AmplifierGettingDataModel {
    data_type: DataTypeModel;
    channel_name?:AmplifierChannelModel;
    value_model?:CurrentPowerValueModel
}
