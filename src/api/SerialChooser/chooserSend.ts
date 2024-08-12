import {each} from "chart.js/helpers";
import {append_serial_data_parser} from "../SerialParser";
import { PageLocationStateEnum  } from "@/api/pageLocation";
import {getStoreByPageLocation} from "../../store/SerialGroup";
import {SerialGettingDataModel} from "../../types/serial";
import {scheduler} from "@/api/schedulerPipeline";
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
    // each(available_ports, async (port:any)=>{
    //     if(port in usedSerialPorts){
    //         return
    //     }
    //     const sender_buffer = Buffer.from([0xAA,0x55,0xD1,0x00,0x00,0x00,0x0D,0x0A])
    //
    //     let use_port:any = null;
    //     let use_parser:any = null;
    //     ({ port: use_port, parser: use_parser } = askForSerialConnection(port, 9600,true));
    //     if(use_port || true ){
    //         // sendDataBySerial(use_port,send_data);
    //         use_port.write(sender_buffer);
    //         // 跟新配置到pinia,连接成功
    //         this_revived_times = 0; // 重置接收次数
    //         connected_result = null ; // 默认为不连接
    //         parser_different_types(use_parser,use_port);
    //     }
    // })
}


function connect_target_serial(){
    const connected_store_result = getStoreByPageLocation(connected_result);
    const this_store = connected_store_result.store();
}




class SerialController {
    private serial_result: boolean = false;
    private port: any = null;
    private parser: any = null;
    serial_auto_config(name:string){
        let use_port:any = null, use_parser:any = null;
        const this_page_store = getStoreByPageLocation(PageLocationStateEnum[name]);
        const store = this_page_store.store();
        // PORT
        const search_port_key:SerialGettingDataModel = {
            'data_type':'Port',
        } ;
        const PORT = store.getTargetParameter(search_port_key);
        // BAUDRATE
        const search_key_baudrate:SerialGettingDataModel = {
            'data_type':'BaudRate',
        } ;
        const baudRate = store.getTargetParameter(search_key_baudrate);
        // connect the serial port
        ({ port: this.port, parser: this.parser } = askForSerialConnection(PORT, baudRate,this_page_store.flag));
        if(this.port) { //  || true
            //console.log(PORT, baudRate);
            append_serial_data_parser(this.parser,PageLocationStateEnum[name]);
            scheduler.addSerialSendPackagesTask([], PageLocationStateEnum[name],1,'internal','continuous');
            // 保存对象
            store.changeSerialConnectState(this.port,this.parser,true,PORT);
            scheduler.addSerialSendPackagesTask([],  PageLocationStateEnum[name],2,'initial','continuous');
        }
    }
    auto_connect_serial(){
        // const PageModulesNames = ['SeedPurchased','Amplifier','TemperaturePPLN','Manager'];  // 串口模块
        const PageModulesNames = ['Manager','SeedPurchased','Amplifier'];  // 串口模块
        each(PageModulesNames, (name:string)=>{
            this.serial_auto_config(name);
        })
    }
    auto_connect_serial_when_dead(name:string){
        const value = localStorage.getItem('time_reload');
        console.log('time_reload',value);
        if(value != '0' ){
            this.auto_connect_serial();
        }
    }
    //
    // parser_different_types() {
    //     this.parser.on('data', data => {
    //         console.log('Received data from port:', data);
    //         // Check if data is of type string and consider it as a temperature control system
    //         if (typeof data === 'string') {
    //             // Temperature control system
    //             this.serial_result = true;
    //             return;
    //         }
    //         // 0 TYPE 1 SIZE 2... DATA then CHECKSUM  0x55 0xAA =  6 + len(data)
    //         if (data.length > 4 && data[0] === 0xD1 && data[1] === 0x2E && data[2] === 0x00) {
    //             if(data[3] === 0x05){
    //                 // 种子光源
    //                // append_serial_data_parser(data);
    //                 this.serial_result = true;
    //                 return;
    //             }
    //             else if (data[3] === 0x00){
    //                 // 放大器
    //               //  append_serial_data_parser(data);
    //                 this.serial_result = true;
    //                 return;
    //             }
    //         }else if (data[0] === 0xD3) {
    //             if( data.length == 16 ){
    //                 // 放大器
    //                // append_serial_data_parser(data);
    //                 this.serial_result = true;
    //                 return;
    //             }
    //             else if ( data.length == 22){
    //                 // 种子光源
    //                // append_serial_data_parser(data);
    //                 this.serial_result = true;
    //                 return;
    //             }
    //         }
    //         else if ( data.length == 8 && data[0] === 0xEE) {  // Manager
    //             // Manager
    //           //  append_serial_data_parser(data);
    //             this.serial_result = true;
    //             return;
    //         }
    //     });
    //
    // }
    // deadline_check(){
    //     setTimeout(() => {
    //         if(this.serial_result){ // 如果连接成功
    //             this.serial_result = false;
    //             this.port.close();
    //         }
    //     }, 3000);
    // }
}

export const serial_controller = new SerialController();




