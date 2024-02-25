export interface CurrentPowerType{
    SetPower : number;     // 希望发送给放大器设定的功率
    WorkingPower : number; // 放大器目前状态的功率
    Current : number;
}
export type CurrentPowerValueModel = 'SetPower' | 'Current' | 'WorkingPower';
export interface AmplifierGroupState{
    Channel_ONE : CurrentPowerType;
    Channel_TWO : CurrentPowerType;
    Channel_THREE : CurrentPowerType;
    Temperature:number;
    WorkingStatus:number; // 放大器的工作状态
    EnableStatus:number;    // 放大器的开关状态
}
export type AmplifierChannelModel = 'ONE' | 'TWO' | 'THREE';

export type DataTypeModel = 'PowerCurrent' | 'Temperature' | 'WorkingStatus' | 'EnableStatus';

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
