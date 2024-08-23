import { defineStore, acceptHMRUpdate } from 'pinia'
import { SerialGroupState } from "@/types/serial";
import { SerialGettingDataModel } from "@/types/serial";
import { PageLocationStateEnum  } from "@/api/pageLocation";
import {SerialSettingDataModel} from "../types/serial";


function createSerialGroupStore(id: string,baudRate:number,target:PageLocationStateEnum) {
    return defineStore({
        id,
        state: () => ({
            Serial_Data: {
                Target: target,
                IsOpen: false,
                Port: 'COM2',
                BaudRate: baudRate,
                SerialObject: null,   // 串口对象
                SerialParser: null,    // 串口解析对象
                SerialTask: null,      // 串口任务
            } as SerialGroupState,
            Error_send_times: 0,
        }),

        getters: {
            getTargetParameter: (state) => (data: SerialGettingDataModel) => {
                if (data.data_type in state.Serial_Data) {
                    return state.Serial_Data[data.data_type];
                }
                return null;
            },
        },
        actions: {
            // 设置参数
            setTargetParameter(data: SerialSettingDataModel) {
                if (data.data_type in this.Serial_Data) {
                    this.Serial_Data[data.data_type] = data.value;
                }
            },
            // 发送串口数据
            // sendSerialData({ data, ...rest }: { data?: any [];  [key: string]: any }) { // 每100ms发送一次数据
            //     if (this.Serial_Data.SerialObject) {
            //         try {
            //             this.Serial_Data.SerialObject.write(data);
            //         }catch (e) {console.log(e);}
            //     }
            //     // console.log('模拟串口发送：',data.toString('hex'));
            //     console.log('模拟串口发送：',data);
            //     // for(const [index, _data] of data.entries()){
            //     // setTimeout(() => {
            //     //         if (this.Serial_Data.SerialObject) {
            //     //             try {
            //     //                 this.Serial_Data.SerialObject.write(_data);
            //     //             }catch (e) {console.log(e);}
            //     //         }
            //     //         console.log('模拟串口发送：',_data.toString('hex'));
            //     //     },500*index);
            //     // }
            // },
            sendSerialData({ data, ...rest }: { data?: Buffer;  [key: string]: any }) { // 每100ms发送一次数据
                if (this.Serial_Data.SerialObject) {
                    try {
                        this.Serial_Data.SerialObject.write(data);
                    }catch (e) {console.log(e);}
                }
                console.log('模拟串口发送：',data.toString('hex'));
            },
            // 成功连接、断开串口后配置store
            changeSerialConnectState(serial_object:any, serial_parser:any, isOpen_value: boolean, port:string) {
                this.Serial_Data.SerialParser = serial_parser;
                this.Serial_Data.IsOpen = isOpen_value;
                this.Serial_Data.Port = port; // 更新port，方便后续保存配置，对其进行访问
                if (serial_object){
                    this.Serial_Data.SerialObject = serial_object;
                }else {
                    this.Serial_Data.SerialObject.close(); // 首先关闭串口
                    this.Serial_Data.SerialObject = null;
                }
            },
        },
    })
}


export const useSerialOscillatorStore = createSerialGroupStore('use-serial-oscillator',115200,PageLocationStateEnum.Oscillator);
export const useSerialAmplifierStore = createSerialGroupStore('use-serial-amplifier',9600,PageLocationStateEnum.Amplifier);
export const useSerialTemperaturePPLNStore = createSerialGroupStore('use-serial-temperature-ppln',9600,PageLocationStateEnum.TemperaturePPLN);
export const useSerialSeedPurchasedStore = createSerialGroupStore('use-serial-seed-purchased',9600,PageLocationStateEnum.SeedPurchased);
export const useSerialManagerStore = createSerialGroupStore('use-serial-manager',9600,PageLocationStateEnum.Manager);
export const useSerialWaterCoolingStore = createSerialGroupStore('use-serial-watercooling',9600,PageLocationStateEnum.WaterCooling);

export  const getStoreByPageLocation = (pageLocation: PageLocationStateEnum) => {
    switch (pageLocation) {
        case PageLocationStateEnum.Oscillator:
            // console.log('useSerialOscillatorStore');
            return {store: useSerialOscillatorStore, flag: 'str'}
        case PageLocationStateEnum.Amplifier:
            // console.log('useSerialAmplifierStore');
            return {store: useSerialAmplifierStore, flag: '55AA' }
        case PageLocationStateEnum.TemperaturePPLN:
            // console.log('useSerialTemperaturePPLNStore')
            return {store: useSerialTemperaturePPLNStore, flag: 'str'}
        case PageLocationStateEnum.SeedPurchased:
            // console.log('useSerialSeedPurchasedStore');
            return {store: useSerialSeedPurchasedStore, flag: '55AA'};
        case PageLocationStateEnum.Manager:
            // console.log('useSerialSeedPurchasedStore');
            return {store: useSerialManagerStore, flag: '55AA'};
        case PageLocationStateEnum.WaterCooling:
            return {store: useSerialWaterCoolingStore, flag: '01C0'};
        default:
            throw new Error("Invalid page location");
    }
}