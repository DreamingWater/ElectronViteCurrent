export interface TemperatureParameter {
    TemperatureModule  ?: number;
    TemperatureOne? : number;
    TemperatureTwo? : number;
    TemperatureSeed? : number;
}

export interface CurrentParameter {
    CurrentOne: number;
    CurrentTwo: number;
}

export interface SeedPurchasedState{
    SetPower?: number;        // 设定激光功率
    WorkingPower?:number;
    SamplePower?:number;
    SetWavelength?: number;   // 设定激光波长
    WorkingWavelength?: number;
    // 读取的温度值
    TemperatureParams?: TemperatureParameter;
    CurrentParams?: CurrentParameter;

    WorkingStatus:number;      // 工作状态
    EnableStatus:number;       // 开关状态
}

export interface SeedPurchasedSettingDataModel {
    data_type: keyof SeedPurchasedState;
    value: number;
}

export interface SeedPurchasedGettingDataModel {
    data_type: keyof SeedPurchasedState;
}



