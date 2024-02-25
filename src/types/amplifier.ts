export interface CurrentPowerType{
    Amplifier_SetPower : number;     // 希望发送给放大器设定的功率
    Amplifier_WorkingPower : number; // 放大器目前状态的功率
    Amplifier_Current : number;
}
export type CurrentPowerValueModel = 'SetPower' | 'Current' | 'WorkingPower';
export interface AmplifierGroupState{
    Amplifier_Channel_ONE : CurrentPowerType;
    Amplifier_Channel_TWO : CurrentPowerType;
    Amplifier_Channel_THREE : CurrentPowerType;
    AmplifierTemperature:number;
    AmplifierWorkingStatus:number; // 放大器的开关状态
    AmplifierOpenStatus:number;    // 放大器的工作状态
}
export type AmplifierChannelModel = 'ONE' | 'TWO' | 'THREE';

export type DataTypeModel = 'PowerCurrent' | 'Temperature' | 'WorkingStatus' | 'OpenStatus';

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
