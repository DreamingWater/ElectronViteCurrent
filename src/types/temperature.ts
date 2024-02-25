export interface TemperatureValue {
    name:   string ;
    TPV ?:  number;
    TPV_list?: [];
    TPV_List_length?:number;
    TSV?: number;
    PID_P ?: number;
    PID_I ?: number;
    PID_D ?:  number;
    Voltage_Proportion?:number;
}