import { defineStore, acceptHMRUpdate } from 'pinia'
import { SerialState, SerialConfig, SendMessageType } from "../utils/config"
import { websocket_send } from "../utils/WebsocketFunc"
import { PageStateEnum } from "@/views/data"
// 根据name来查询数据，返回index


// 根据name来查询数据，返回index
function GetObjIndexByTargetPage(SerialConfigData:SerialConfig[], current_page: number): number {
    for (let i = 0; i < SerialConfigData.length; i++){
        if (SerialConfigData[i].target === current_page) {
            return i;
        }
    }
    return -1;
}


export const useSerialStore = defineStore({
    id: 'use-serial',
    state: () => ({
        Serial_State: {
            validPorts:[''],
        } as SerialState,

        Serial_Config: [{
            target: PageStateEnum.Oscillator,
            isOpen:false,
            port: 'COM1',
            baudrate:115200
        },
            {
                target:PageStateEnum.Temperature,
                isOpen:false,
                port: 'COM2',
                baudrate:9600
            },
            {
                target:PageStateEnum.Amplifier,
                isOpen:false,
                port: 'COM3',
                baudrate:9600
            }] as SerialConfig [],
    }),
    getters: {
        getSerialOpenOrNot: (state) => (current_page:number) => {    // 获取open状态
            const targetObj = GetObjIndexByTargetPage(state.Serial_Config, current_page);    // 搜索name对象在数组中的index
            if (targetObj !== -1) {
                return state.Serial_Config[targetObj].isOpen;
            }
        },
        getSerialValidList: (state) => () => {    // 获取可用的端口数据
            return state.Serial_State.validPorts || [];
        },
        getSerialConfig: (state) => (current_page:number) => {       // 获取配置
            const targetObj = GetObjIndexByTargetPage(state.Serial_Config, current_page);    // 搜索name对象在数组中的index
            if (targetObj !== -1) {
                return state.Serial_Config[targetObj];
            }
        },
    },
    actions: {
        // 设置serial状态
        SetSerialState(current_page:number, value:boolean){
            const targetObj = GetObjIndexByTargetPage(this.Serial_Config, current_page);    // 搜索name对象在数组中的index
            if (targetObj !== -1) {
                this.Serial_Config[targetObj].isOpen = value;
            }
        },
        // 设置serial config
        SetSerialConfig(current_page:number, port:string, baudrate:number){
            const targetObj = GetObjIndexByTargetPage(this.Serial_Config, current_page);    // 搜索name对象在数组中的index
            if (targetObj !== -1) {
                this.Serial_Config[targetObj].baudrate = baudrate;
                this.Serial_Config[targetObj].port = port;
                console.log(`SetSerialConfig port${current_page}`);
            }
            console.log('SetSerialConfig');
        },
        // 设置serial config port,其它参数默认
        SetSerialPortWithDefaults(current_page:number, port:string){
            const targetObj = GetObjIndexByTargetPage(this.Serial_Config, current_page);    // 搜索name对象在数组中的index
            if (targetObj !== -1) {
                this.Serial_Config[targetObj].port = port;
            }
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
        ChangeConnectSerialState(current_page:number){
            let raw_data;
            const targetObj = GetObjIndexByTargetPage(this.Serial_Config, current_page);    // 搜索name对象在数组中的index
            if (targetObj !== -1) {
                raw_data = {
                    'target':this.Serial_Config[targetObj].target,
                    'port': this.Serial_Config[targetObj].port,
                    'baudrate':this.Serial_Config[targetObj].baudrate,
                    'state':!this.Serial_Config[targetObj].isOpen,
                }
                const json_data = JSON.stringify(raw_data);
                console.log(json_data);
                websocket_send(SendMessageType.SerialConfigConnect, json_data);
            }


        }
    },
})