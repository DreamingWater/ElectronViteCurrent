
export interface MonitorType{
    BackPower : number;       // 希望发送给放大器设定的功率
    WorkingStatus : number;   // 放大器目前状态的功率
    HeatTemperature : number;
    OuterTemperature : number;
    HeatHumidity : number;
    OuterHumidity : number;
}


export interface MonitorSettingDataModel {
    data_type: keyof MonitorType;
    value: number;
}

export interface MonitorGettingDataModel {
    data_type: keyof MonitorType;
}
