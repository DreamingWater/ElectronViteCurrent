import { useMonitorStore } from "@/store/monitorGroup";

import { MonitorSettingDataModel } from "@/types/manager";

import {SerialSettingDataModel} from "@/types/serial";
import { monitor_parser } from "@/api/SerialParser/Base/packParser";

const create_store_object = ()=>{
    const store = useMonitorStore();
    return store
}

const actions = {
    'ee': (dataString:string,store:any)=> {
        let data = Buffer.from(dataString, 'hex');
        if( data.length === 1){
            return
        }
        // 读取设置的功率
        const set_monitor_power :MonitorSettingDataModel = {
            data_type: 'BackPower',
            value:parseFloat((data.readUInt16LE(0) / 4096 * 3.3).toFixed(2)), // 电压值

        }
        store.setTargetParameter(set_monitor_power);
    }
}

export function add_monitor_serial_data_parser(monitor_serial_parser:any) {
    console.log('add_monitor_serial_data_parser');

    monitor_serial_parser.on('data', (data) => {
        console.log('Received data from port:',data);
        const result = monitor_parser.append_data_parser(data);
        if(result && actions[result.ctrlCode]){
            const store = create_store_object();
            actions[result.ctrlCode](result.data, store);
        }
    });
}