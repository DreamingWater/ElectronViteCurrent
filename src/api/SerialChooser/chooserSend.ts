import { each } from "chart.js/helpers";
import { append_serial_data_parser } from "../SerialParser";
import { PageLocationStateEnum  } from "@/api/pageLocation";
import { getStoreByPageLocation } from "../../store/SerialGroup";
import { SerialGettingDataModel } from "../../types/serial";
import { schedulerSerial } from "@/api/scheduler/ScheSerial/schedulerPipeline";
// @ts-nocheck

let connected_result:any = null   ;        // 连接的结果

export async function  connectAndInitializeSerial(port: string, store:any, flag: any, pageLocation: PageLocationStateEnum) {
    // 获取指定数据类型的参数
    const search_key: SerialGettingDataModel = { 'data_type': 'BaudRate' };
    const baudRate = store.getTargetParameter(search_key);
    let { port: use_port, parser: use_parser } = await askForSerialConnection(port, baudRate, flag);
    if (use_port) {
        append_serial_data_parser(use_parser, pageLocation);
        schedulerSerial.addSerialSendPackagesTask([], pageLocation, 1, 'internal', 'continuous');
        store.changeSerialConnectState(use_port, use_parser, true, port);
        schedulerSerial.addSerialSendPackagesTask([], pageLocation, 2, 'initial', 'continuous');
    }
}

function connect_target_serial(){
    const connected_store_result = getStoreByPageLocation(connected_result);
    const this_store = connected_store_result.store();
}

class SerialController {
    private serial_result: boolean = false;

    serial_auto_config(name:string){
        const this_page_store = getStoreByPageLocation(PageLocationStateEnum[name]);
        const store = this_page_store.store();
        // PORT
        const search_port_key:SerialGettingDataModel = {
            'data_type':'Port',
        } ;
        const PORT = store.getTargetParameter(search_port_key);
        // console.log('auto Connect the serial port:',PORT);
        // console.log('shutdown the serial connect action');
        connectAndInitializeSerial(PORT, store, this_page_store.flag, PageLocationStateEnum[name]);
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
        function isValidUTC(dateString: string): boolean {
            // Regular expression to validate UTC date format
            const utcRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
            return utcRegex.test(dateString);
        }
        function getTimeDifferenceInSeconds(time1: string, time2: string): number {
            const date1 = new Date(time1);
            const date2 = new Date(time2);
            const differenceInMilliseconds = Math.abs(date2.getTime() - date1.getTime());
            const differenceInSeconds = differenceInMilliseconds / 1000;
            return differenceInSeconds;
        }

// Example usage:
//         const value = '2023-10-01T12:00:00Z'; // Example UTC time from backend
        const currentUTCTime = new Date().toISOString();
        // console.log('time_reload', value);
        // console.log('currentUTCTime', currentUTCTime);
        if (isValidUTC(value)) {
            const timeDifference = getTimeDifferenceInSeconds(value, currentUTCTime);
            if (timeDifference > 10) {       // 开机时间大约是5s左右，我这里设置10s后如果渲染页面刷新就启动串口重新连接
                this.auto_connect_serial();
            }
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




