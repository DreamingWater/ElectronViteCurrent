//config
import { Laser_One, Laser_Two, SendMessageType, ReceiveMessageType } from "./config";
import { useTemCurStore } from "@/store/TenCurData";

let websocket_obj:any; 



export const websockt_start = () =>{            // 启动websocket连接
    websocket_obj = new WebSocket('ws://localhost:9007');

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
        case ReceiveMessageType.SerialResult:
            deal_serialresult(data.data);
            break;
        case ReceiveMessageType.SerialValid:
            deal_serialvalid(data.data);
            break;
        case ReceiveMessageType.ShowData:
            deal_showdata(data.data);
            break;
        default:
            // 未知的消息类型
            break;
    }  
}


// 将数据发送到python端
export const websocket_send = (send_type:SendMessageType, send_data_obj:object) => {
    const send_data = JSON.stringify({'type': send_type, 'data': send_data_obj});
    websocket_obj.send(send_data);
}



// deal data
// 串口连接的申请结果
const deal_serialresult = (data:object) =>{
    window.console.log('deal_serialresult');
    window.console.log(data);
}
// 可用的串口数据
const deal_serialvalid = (data:object) =>{
    window.console.log('deal_serialvalid');
    window.console.log(data);
}
// 串口收到的数据
const deal_showdata = (data:object)=>{
	const storeTemplate = useTemCurStore();
    storeTemplate.SetTempratureValue(data.name, data.current,data.temprature);
}

