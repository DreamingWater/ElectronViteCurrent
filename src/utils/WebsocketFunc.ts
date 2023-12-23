// @ts-nocheck

import { SendMessageType, ReceiveMessageType } from "./config";
import { useTemCurStore } from "@/store/TenCurData";
import { useSerialStore } from "@/store/Serial";
import { useAmplifierStore } from "@/store/Amplifier";
import { TemperatureShowValue, useTemperatureDataStore } from "@/store/TemperatureData";

import { OscillatorDataState, useOscillatorDataStore } from "@/store/CreaterData";
let websocket_obj:any; 
let websocket_connection_state:boolean = false; // Websocket连接状态
let heartPingTimer:any; // 用于存储定时器引用
let heart_connection_times:number = 0 // websocket 错误连接的次数
let Max_Heart_Connection_Times:number = 10 
export const websockt_start = () =>{            // 启动websocket连接
    if(websocket_connection_state == false){
        heart_connection_times = 0; // 重置，不然如果前面断开后，后面无法连接，必须刷新页面
        websocket_obj = new WebSocket('ws://127.0.0.1:9007');

        websocket_obj.onopen = function () {
            console.log('WebSocket connected');
            websocket_connection_state = true;
            // send_heart_ping(); //发送心跳包
            read_realtime_order(); // 获取下位机运行参数
        };
    
        websocket_obj.onmessage = function (e) {
            // 处理返回的对象
            websocketdata_hander(e.data);
        };
        websocket_obj.onclose = function (e) {
            // stop_heart_ping() // 停止心跳包
            update_serial_connection_state(false);
            console.error('WebSocket closed');
            websocket_connection_state = false; 
        };
    }
}



// 处理收到来自python的数据
const websocketdata_hander = (message:string) =>{
    const data = JSON.parse(message);   // 解析为json对象
    window.console.log('处理收到来自python的数据');
    window.console.log(data);
    if (data === null || typeof data !== 'object') {
        // 数据解析失败或不是一个对象
        return;
    }
    switch (data.type) {
        case ReceiveMessageType.SerialValid:
            deal_serialvalid(data.data);
            break;
        case ReceiveMessageType.SerialResult:
            deal_serialresult(data.data);
            break;
        case ReceiveMessageType.Temperature:
            deal_template_data(data.data);
            break;
        case ReceiveMessageType.Current:
            deal_current_data(data.data);
            break;
        case ReceiveMessageType.TemperatureCurrent:
            deal_temperature_current_data(data.data);
            break;
        case ReceiveMessageType.HeartPong:
            deal_heart_answer();
            break;
        case ReceiveMessageType.AmplifierCurrent:
            deal_amplifier_current(data.data)
            break;
        case ReceiveMessageType.AmplifierTemperature:
            deal_amplifier_temperature(data.data)
            break;

        case ReceiveMessageType.AmplifierWorkingStatus:
            deal_amplifier_realtime_working_status(data.data)
            break
        case ReceiveMessageType.AmplifierOpenStatus:
            deal_amplifier_openstatus(data.data)
            break   
        case ReceiveMessageType.AmplifierWholeStatus:
            deal_amplifier_wholestatus(data.data)       
        
        case ReceiveMessageType.TemperatureTPV:
            deal_temperature_tec_value(data.data)
        case ReceiveMessageType.Oscillator_Res_Voltage:
            deal_oscillator_data(data.data)
        default:
            // 未知的消息类型
            break;
    }  
}


// 将数据发送到python端
export const websocket_send = (send_type:number, data:string) => {
    const send_data = JSON.stringify({'type': send_type, 'data': data});
    try {
        websocket_obj.send(send_data);
      } catch (error) {
        console.log('WebSocket send error: ', error);
      }
}



// ###########################################                数据处理部分                 ############################################

// 串口连接的申请结果
const deal_serialresult = (receive_data:object) =>{
    let receive_result = receive_data.data
    let result = receive_result.split(',')
    console.log(result[0] == 'true' ? true : false) 
    update_serial_connection_state(eval(result[1]),result[0] == 'true' ? true : false);
}

const update_serial_connection_state = (page:number, data:boolean) =>{
    const serial_storeTemplate = useSerialStore();
    serial_storeTemplate.SetSerialState(page, data);  
}

// 搜索可用的串口数据
const deal_serialvalid = (receive_data:object) =>{
    const serial_storeTemplate = useSerialStore();
    serial_storeTemplate.UpdateValidSerialPorts(receive_data.data);

}
// 串口收到温度的数据
const deal_template_data = (receive_data:object)=>{
	const data_storeTemplate = useTemCurStore();
    data_storeTemplate.SetTempratureCurrentValue(receive_data.name, receive_data.data, undefined);
}

// 串口收到电流的数据
const deal_current_data = (receive_data:object)=>{
	const data_storeTemplate = useTemCurStore();
    data_storeTemplate.SetTempratureCurrentValue(receive_data.name, undefined, receive_data.data);
}
// 串口收到温度和电流数据 同时
const deal_temperature_current_data = (receive_data:object)=>{
	const data_storeTemplate = useTemCurStore();
    let temperature_current_data = receive_data.data;
    temperature_current_data = temperature_current_data.split(',') 
    // 温度
    data_storeTemplate.SetTempratureCurrentValue(receive_data.name,parseFloat( temperature_current_data[0]), undefined);
    // 电流
    data_storeTemplate.SetTempratureCurrentValue(receive_data.name,undefined, parseFloat(temperature_current_data[1]));
}


// 放大器部分的代码如下
const deal_amplifier_current = (receive_data:object) =>{
    const amplifier_store = useAmplifierStore();
    let amplifier_current_data = receive_data.data;
    amplifier_current_data = amplifier_current_data.split(',')
    amplifier_store.SetAmplifierCurrent(amplifier_current_data[0],amplifier_current_data[1],amplifier_current_data[2])
    console.log('current is');
    console.log(amplifier_current_data)
} 
// 放大器部分的代码如下
const deal_amplifier_temperature = (receive_data:object) =>{
    const amplifier_store = useAmplifierStore();
    let amplifier_current_temperature = receive_data.data;
    amplifier_store.SetAmplifierTemperature(amplifier_current_temperature)
} 

// 放大器部分的代码如下
const deal_amplifier_openstatus = (receive_data:object) =>{
    const amplifier_store = useAmplifierStore();
    let amplifier_open_status = receive_data.data;
    amplifier_store.SetAmplifierOpenStatus(amplifier_open_status)
} 
// 放大器部分的代码如下
const deal_amplifier_realtime_working_status = (receive_data:object) =>{
    const amplifier_store = useAmplifierStore();
    let amplifier_working_status = receive_data.data;
    amplifier_store.SetAmplifierRealtimeWorkingStatus(amplifier_working_status)
} 

const deal_amplifier_wholestatus = (receive_data:object) =>{
    const amplifier_store = useAmplifierStore();
    let amplifier_whole_data = receive_data.data;
    let amplifier_data = amplifier_whole_data.split(',')
    amplifier_store.SetAmplifierOpenStatus(Number(amplifier_data[0]))
    amplifier_store.SetAmplifierRealtimeWorkingStatus(Number(amplifier_data[1]))
    amplifier_store.SetAmplifierTemperature(Number(amplifier_data[2]))
    amplifier_store.SetAmplifierCurrent(Number(amplifier_data[3]),Number(amplifier_data[4]),Number(amplifier_data[5]))
} 

// 处理温控板上传的温控数据
const deal_temperature_tec_value =  (receive_data:object) =>{
    const temperature_store = useTemperatureDataStore(); 
    let received_data = receive_data.data;
    let received_name = receive_data.name;

    temperature_store.SetTPVValue(received_name, Number(received_data));
    temperature_store.SetTPVList(received_name, Number(received_data));
}

// 处理振荡器的数据
const deal_oscillator_data = (receive_data:object) =>{
    const oscillator_store = useOscillatorDataStore(); 
    let received_package = receive_data.data;
    let received_name = receive_data.name;
    let oscillator_data = received_package.split(',')
    oscillator_store.SetResistanceVoltageValue(received_name, Number(oscillator_data[0]),Number(oscillator_data[1]));
    oscillator_store.SetVoltageList(received_name,Number(oscillator_data[1]));
    
}



// 读取下位机参数
const read_realtime_order = () => {
    const ReadStatusTimer = setInterval(() => {
        // websocket_send(SendMessageType.Amplifier_Realtime_Data_Upload, ''); // 发送读取状态信息
    }, 3000); // 3秒 一个心跳包
   
};


//////////////////////////////////      心跳               //////////////////
const send_heart_ping = () => {
    heartPingTimer = setInterval(() => {
        console.log('heartPingTimer');
        websocket_send(SendMessageType.HeartPing, ''); // 发送心跳包
        heart_connection_times += 1;       // 一次心跳 记录一次连接
        // if(heart_connection_times>Max_Heart_Connection_Times){
        //     console.log('心跳检测失败，断开连接');
        //     websocket_obj.close()
        //     clearTimeout(heartPingTimer);
        // }
    }, 5000); // 5秒 一个心跳包
   
};

// 在外部调用该函数来停止定时器
const stop_heart_ping = () => {
    clearTimeout(heartPingTimer);
};

const deal_heart_answer = () =>{
    heart_connection_times = 0
}