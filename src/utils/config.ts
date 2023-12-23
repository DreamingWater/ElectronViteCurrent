
// Laser_Name
export const Laser_One:string = 'LASER_ONE';
export const Laser_Two:string = 'LASER_TWO';


export const SendMessageType = {
    SerialPortsSearch: 0,
    SerialConfigConnect: 1,
    Temperature: 2,
    Current: 3,
    DataUpload:4,
    RealtimeControl:5,
    TemperatureChannel: 6,
    CurrentChannel: 7,
    HeartPing:8,
    ShutDownPython:9,
    Amplifier_ONE:20,
    Amplifier_TWO:21,
    Amplifier_THREE:22,
    Amplifier_OPEN_STATUS: 23,
    Amplifier_Realtime_Data_Upload: 24,

    Temperature_TEC_Setting:30,
    Temperature_TEC_Pid_P:31,
    Temperature_TEC_Pid_I:32,
    Temperature_TEC_Pid_D:33,
    Temperature_TEC_OPEN_STATUS:34,
    Temperature_TEC_Data_Upload:35,
    // 振荡器部分
    Oscillator_Current_Setting: 40,
    Oscillator_Pid_P: 41,
    Oscillator_Pid_I: 42,
    Oscillator_Pid_D: 43,
    Oscillator_OPEN_STATUS: 44,
};
export enum ReceiveMessageType {
    SerialValid = 0,
    SerialResult = 1,
    Temperature= 2,
    Current= 3,
    TemperatureCurrent=4,
    HeartPong=5,
    AmplifierCurrent=10,
    AmplifierTemperature=11,
    AmplifierWorkingStatus=12,  // 放大器的开关状态
    AmplifierOpenStatus=13,     // 放大器的工作状态
    AmplifierWholeStatus=14 ,    // 放大器整体状态

    TemperatureTPV=20,     // 上传 TPV温度
    //振荡器部分
    Oscillator_Res_Voltage= 30  // 上传 放大器的电阻值和电压
}


export interface TempratureCurrent_Receive{
    name?: string;
    temprature?: number;
    current?: number;

}

export interface TempratureCurrent_Cache{
    name?: string;
    // show value
    temprature_array?: number[];
    current_array?:number[];
    latest_temprature?: number;
    latest_current?: number;
    temprature_data_number?:number;
    current_data_number?:number;
    realtime_control:boolean;
}

export interface TempratureCurrent_Set{
    name?: string;
    set_temprature?: number;
    set_current?: number;
    temprature_using?: boolean;
    current_using?: boolean;
    temprature_tune_range?:number;  // 温度的调节步长
    current_tune_range?:number;     // 电流的调节步长
}



export interface SerialConfig {
    port: string;
    baudrate: number;
    target?:number;
    isOpen: boolean;
  }
  
// 串口设置
export interface SerialState {
    validPorts?:string[];
  }


  // 放大器部分设置

  export interface AmplifierState{
    Amplifier_ONE : number;
    Amplifier_TWO : number;
    Amplifier_THREE : number;
    AmplifierTemperature:number;
    AmplifierWorkingStatus:number; // 放大器的开关状态
    AmplifierOpenStatus:number;  // 放大器的工作状态
  }
