
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
};
export enum ReceiveMessageType {
    SerialValid = 0,
    SerialResult = 1,
    Temperature= 2,
    Current= 3,
    TemperatureCurrent=4,
    HeartPong=5,
    AmplifierCurrent=10,
    AmplifierTemperature=11
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
  }
  
// 串口设置
export interface SerialState {
    isOpen: boolean;
    validPorts?:string[];
  }


  // 放大器部分设置

  export interface AmplifierState{
    Amplifier_ONE : number;
    Amplifier_TWO : number;
    Amplifier_THREE : number;
    AmplifierTemperature:number;
  }