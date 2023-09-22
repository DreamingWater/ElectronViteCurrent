import { defineStore, acceptHMRUpdate } from 'pinia'
import { SerialState, SerialConfig, SendMessageType } from "../utils/config"
import { websocket_send } from "../utils/WebsocketFunc"

// 根据name来查询数据，返回index


export const useSerialStore = defineStore({
  id: 'useserial',
  state: () => ({
    Serial_State: {
        isOpen : false,
        validPorts:[''],

    } as SerialState,
    Serial_Config: {
        port: 'COM1',
        baudrate:115200
    } as SerialConfig,
  }),
  getters: {
    getSerialOpenOrNot: (state) => () => {    // 获取open状态
            return state.Serial_State.isOpen;
        },
    getSerialValidList: (state) => () => {    // 获取可用的端口数据
        return state.Serial_State.validPorts || [];
    },
    getSerialConfig: (state) => () => {       // 获取配置
        return state.Serial_Config;
    },
  },
  actions: {
    // 设置serial状态
    SetSerialState(value:boolean){
        this.Serial_State.isOpen = value;
    },
    // 设置serial config
    SetSerialConfig(config:SerialConfig){

        this.Serial_Config = config;
    },
    // 设置serial config port,其它参数默认
    SetSerialPortWithDefaults(port:string){

        this.Serial_Config.port = port;
    },
    // 申请查询可用串口端口
    SearchValidSerialPorts(){
        websocket_send(SendMessageType.SerialPortsSearch, '')
    },
    // 更新可用的串口
    UpdateValidSerialPorts(data:string){
        this.Serial_State.validPorts = data.split(',');
    },
    // 申请连接串口
    AskForConnectSerial(){
        const raw_data = this.Serial_Config;
        const json_data = JSON.stringify(raw_data);
        websocket_send(SendMessageType.SerialConfigConnect, json_data);
    }
  },
})


