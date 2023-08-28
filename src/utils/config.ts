import { dataTool } from "echarts";

// Laser_Name
export const Laser_One:string = 'Laser_one';
export const Laser_Two:string = 'Laser_two';


export enum SendMessageType {
    SerialConfig,
    Order,
  }
export enum ReceiveMessageType {
    SerialValid,
    SerialResult,
    ShowData,
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
    data_number?:number;
}

export interface TempratureCurrent_Set{
    name?: string;
    set_temprature?: number;
    set_current?: number;
}

// const Receive_data_example = {
//     type:1,
//     data:{
//         name: 'laser_one',
//         temprature:23.23,
//         current:100.2, 
//     }
// }
