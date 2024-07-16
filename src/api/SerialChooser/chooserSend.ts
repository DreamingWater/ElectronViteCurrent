import {each} from "chart.js/helpers";
import {append_serial_data_parser} from "../SerialParser";
import { PageLocationStateEnum  } from "@/api/pageLocation";
import {getStoreByPageLocation} from "../../store/SerialGroup";

// @ts-nocheck


const usedSerialPorts:any = [];          // 本程序以及占用的串口
let this_revived_times  = 0;            // 本次连接获取数据的次数
let connected_result:any = null   ;        // 连接的结果

const  chooser_function_for_serial = async (portPath:any, baudRate:9600,hexData=false,name='seedPurchased')=>{
    const available_ports =  await listAvailablePorts()
    if(available_ports.length == 0){
        console.log("No serial ports available")
        return
    }
    // 如果找到合适的端口，则开始尝试打开串口
    each(available_ports, async (port:any)=>{
        if(port in usedSerialPorts){
            return
        }
        const sender_buffer = Buffer.from([0xAA,0x55,0xD1,0x00,0x00,0x00,0x0D,0x0A])

        let use_port:any = null;
        let use_parser:any = null;
        ({ port: use_port, parser: use_parser } = askForSerialConnection(port, 9600,true));
        if(use_port || true ){
            // sendDataBySerial(use_port,send_data);
            use_port.write(sender_buffer);
            // 跟新配置到pinia,连接成功
            this_revived_times = 0; // 重置接收次数
            connected_result = null ; // 默认为不连接
            parser_different_types(use_parser,use_port);
        }
    })
}


function connect_target_serial(){
    const connected_store_result = getStoreByPageLocation(connected_result);
    const this_store = connected_store_result.store();
}


function parser_different_types(this_parser:any,this_port:any) {
    this_parser.on('data', data => {
        console.log('Received data from port:', data);

        if (this_revived_times > 3) {
            this_revived_times = 0;
            this_port.close();
        }else if (data.length > 4 && data[0] === 0xD1 && data[1] === 0x2E && data[2] === 0x00) {
            if(data[3] === 0x05){
                // 种子光源
                append_serial_data_parser(data);
                connected_result =  PageLocationStateEnum.SeedPurchased;
            }
            else if (data[3] === 0x00){
                // 放大器
                append_serial_data_parser(data);
            }

        }else if ( data.length == 5 && data[0] === 0xD3) {
            // 放大器
            append_serial_data_parser(data);

        }
        else if ( data.length == 9 && data[0] === 0xD3) {
            // 种子光源
            append_serial_data_parser(data);

        }
        this_revived_times += 1;
    });
}
