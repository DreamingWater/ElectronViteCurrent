//config
import { SendMessageType, ReceiveMessageType } from "./config";
import { useTemCurStore } from "@/store/TenCurData";
import { useSerialStore } from "@/store/Serial";

let websocket_obj:any; 



export const websockt_start = () =>{            // 启动websocket连接
    websocket_obj = new WebSocket('ws://127.0.0.1:9007');

    websocket_obj.onopen = function () {
        console.log('WebSocket connected');
    };

    websocket_obj.onmessage = function (e) {
        // 处理返回的对象
        websocketdata_hander(e.data);
    };
    websocket_obj.onclose = function (e) {
        console.error('WebSocket closed');
    };
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
            deal_temperature_current_data(data.data)
            break;

        default:
            // 未知的消息类型
            break;
    }  
}


// 将数据发送到python端
export const websocket_send = (send_type:number, data:string) => {
    const send_data = JSON.stringify({'type': send_type, 'data': data});
    websocket_obj.send(send_data);
}



// ###########################################                数据处理部分                 ############################################

// 串口连接的申请结果
const deal_serialresult = (receive_data:object) =>{
    window.console.log('the result of serial connect');
    window.console.log(receive_data.data);
    const serial_storeTemplate = useSerialStore();
    serial_storeTemplate.SetSerialState(receive_data.data === 'true' ? true : false);  
}

// 搜索可用的串口数据
const deal_serialvalid = (receive_data:object) =>{
    window.console.log('find valid ports for serial');
    window.console.log(receive_data.data);
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

