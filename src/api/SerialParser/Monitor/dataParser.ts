import { useMonitorStore } from "@/store/monitorGroup";

import { MonitorSettingDataModel } from "@/types/manager";

import {SerialSettingDataModel} from "@/types/serial";
import { monitor_parser } from "@/api/SerialParser/Base/packParser";

const create_store_object = ()=>{
    const store = useMonitorStore();
    return store
}

const actions = {
    // Monitor 检测
    'ee': (dataString:string,store:any)=> {
        let data = Buffer.from(dataString, 'hex');
        if( data.length < 5){
            console.log('data length is not enough in receiving the monitor data');
            return
        }
        // 已经读取到现在的设备信息
        localStorage.set('control_device_sms',dataString.slice(0,8));
        // 读取设置的功率
        const set_monitor_power :MonitorSettingDataModel = {
            data_type: 'BackPower',
            value:parseFloat((data.readUInt16LE(4) / 4096 * 3.3).toFixed(2)), // 电压值
        }
        store.setTargetParameter(set_monitor_power);
    },
    // 温度湿度检测
    'ef': (dataString:string,store:any)=> {
        let data = Buffer.from(dataString, 'hex');
        if( data.length === 1){
            return
        }
        // 热沉温度
        const set_heat_temperature :MonitorSettingDataModel = {
            data_type: 'HeatTemperature',
            value:parseFloat((data.readUInt16LE(0) / 10).toFixed(1)), // HeatTemperature

        }
        store.setTargetParameter(set_heat_temperature);
        // // 热沉湿度
        const set_heat_humidity :MonitorSettingDataModel = {
            data_type: 'HeatHumidity',
            value:parseFloat((data.readUInt16LE(2) / 10).toFixed(1)), // HeatHumidity

        }
        store.setTargetParameter(set_heat_humidity);
        const set_outer_temperature :MonitorSettingDataModel = {
            data_type: 'OuterTemperature',
            value:parseFloat((data.readUInt16LE(4) / 10).toFixed(1)), // OuterTemperature

        }
        store.setTargetParameter(set_outer_temperature);
        const set_outer_humidity :MonitorSettingDataModel = {
            data_type: 'OuterHumidity',
            value:parseFloat((data.readUInt16LE(6) / 10).toFixed(1)), // HeatHumidity

        }
        store.setTargetParameter(set_outer_humidity);
    }
}

export function add_monitor_serial_data_parser(monitor_serial_parser:any) {
    console.log('add_monitor_serial_data_parser');

    monitor_serial_parser.on('data', (data) => {
      //  console.log('Received data from port:',data);
        const result = monitor_parser.append_data_parser(data);
        if(result && actions[result.function_code]){
            const store = create_store_object();
           // console.log('parse the data is :',result);
            actions[result.function_code](result.data, store);
        }
    });
}