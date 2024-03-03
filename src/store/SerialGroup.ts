import { defineStore, acceptHMRUpdate } from 'pinia'
import { SerialGroupState } from "@/types/serial";
import { SerialGettingDataModel } from "@/types/serial";
import { PageLocationStateEnum  } from "@/api/pageLocation";
import {SerialSettingDataModel} from "../types/serial";



function createSerialGroupStore(id: string,target:PageLocationStateEnum) {
    return defineStore({
        id,
        state: () => ({
            Serial_Data: {
                Target: target,
                IsOpen: false,
                Port: 'COM1',
                BaudRate: 115200,
                SerialObject: null,   // 串口对象
                SerialParser: null,    // 串口解析对象
            } as SerialGroupState,
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
            sendSerialData(data: string) {
                // if (this.Serial_Data.Serial_object) {
                //     try {
                //         this.Serial_Data.Serial_object.write(data);
                //     }catch (e) {console.log(e);}
                // }
                console.log('模拟串口发送：',data);
            },
            // 成功连接、断开串口后配置store
            changeSerialConnectState(serial_object:any, serial_parser:any, isOpen_value: boolean) {
                this.Serial_Data.SerialObject = serial_object;
                this.Serial_Data.SerialParser = serial_parser;
                this.Serial_Data.IsOpen = isOpen_value;
            },
        },
    })
}


export const useSerialOscillatorStore = createSerialGroupStore('use-serial-oscillator',PageLocationStateEnum.Oscillator);
export const useSerialAmplifierStore = createSerialGroupStore('use-serial-amplifier',PageLocationStateEnum.Amplifier);
export const useSerialTemperaturePPLNStore = createSerialGroupStore('use-serial-temperature-ppln',PageLocationStateEnum.TemperaturePPLN);

export  const getStoreByPageLocation = (pageLocation: PageLocationStateEnum) => {
    switch (pageLocation) {
        case PageLocationStateEnum.Oscillator:
            console.log('useSerialOscillatorStore');
            return useSerialOscillatorStore;
        case PageLocationStateEnum.Amplifier:
            console.log('useSerialAmplifierStore');
            return useSerialAmplifierStore;
        case PageLocationStateEnum.TemperaturePPLN:
            console.log('useSerialTemperaturePPLNStore')
            return useSerialTemperaturePPLNStore;
        default:
            throw new Error("Invalid page location");
    }
}