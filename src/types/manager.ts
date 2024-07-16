export interface MonitorType{
    BackPower : number;     // 希望发送给放大器设定的功率
    WorkingStatus : number; // 放大器目前状态的功率
}

export type DataTypeModel = 'BackPower' | 'WorkingStatus';

export interface MonitorSettingDataModel {
    data_type: DataTypeModel;
    value: number;
}

export interface MonitorGettingDataModel {
    data_type: DataTypeModel;
}
