import {RX_generate_package_buffer} from "../Base/RXPackConstruct";
import {OscillatorSettingDataModel} from "../../../types/oscillator";
import {useOscillatorGroupStore} from "../../../store/oscillatorGroup";


const setStoreData = (store:any,store_setter_key:OscillatorSettingDataModel) => {
    return store.setTargetParameter(store_setter_key);
}

// export const schedual_oscillator_package = () => {
//     let instruct:any = [];
//     // 开启数据上报
//     const data_upload = generate_package_buffer(Buffer.from([0xD3]), Buffer.alloc(0))
//     instruct.push([{ data_type: 'Oscillator-DataUpload', data: data_upload }]);
//     return instruct as [];
// }

export const initial_oscillator_package = () => {
    let instruct:any = [];

    //  同步功能
    const syn_time_buffer = Buffer.alloc(4);
    syn_time_buffer.writeUInt32LE(1000, 0);
    const synchronization = RX_generate_package_buffer(Buffer.from([0x00,0x00]), Buffer.from([0x01,0x00]),syn_time_buffer)
    instruct.push([{ data_type: 'Oscillator-Synchronization', data: synchronization }])

    //开启数据上报
    const data_report_time_buffer = Buffer.alloc(4);
    data_report_time_buffer.writeUInt32LE(1000, 0);
    const data_reporting_data = Buffer.concat([Buffer.from([0x01]),data_report_time_buffer]);
    const data_reporting = RX_generate_package_buffer(Buffer.from([0x00,0x00]), Buffer.from([0x04, 0x01]),data_reporting_data)
    instruct.push([{ data_type: 'Oscillator-DataReportingSwitch', data: data_reporting }])

    // 实时控制
    const realtime_control = RX_generate_package_buffer(Buffer.from([0x00,0x00]), Buffer.from([0x01, 0x02]),Buffer.from([0x01]))
    instruct.push([{ data_type: 'Oscillator-RealtimeControl', data: realtime_control }])

    return instruct as Buffer[];
}



interface ISerialCtrlCode {
    [key: string]: {
        ctrl_code: Buffer,
        function_code:Buffer,
        function: (pkg:any) => Buffer
    }
}
//aa55d3000000
const actions: ISerialCtrlCode = {
    // 设定工作温度
    'WorkingTemperature': {
        'ctrl_code': Buffer.from([0x00,0x00]),
        'function_code': Buffer.from([0x02, 0x02]),
        'function': (pkg:any)=>{
            const temperature_buffer = Buffer.alloc(4);
            temperature_buffer.writeUInt32LE(pkg['value'], 0);
            const data_reporting_data = Buffer.concat([Buffer.from([0x21]),temperature_buffer]);
            return data_reporting_data
        }
    },
    // 设定工作电流
    'WorkingCurrent': {
        'ctrl_code': Buffer.from([0x00,0x00]),
            'function_code': Buffer.from([0x03, 0x02]),
            'function': (pkg:any)=>{
                const current_buffer = Buffer.alloc(4);
                current_buffer.writeUInt32LE(pkg['value'], 0);
                const data_reporting_data = Buffer.concat([Buffer.from([0x11]),current_buffer]);
                return data_reporting_data
        }
    },
    'HeartReply': {
        'ctrl_code': Buffer.from([0x00,0x00]),
        'function_code': Buffer.from([0x02, 0x00]),
        'function': (pkg:any)=>{
          return Buffer.from([0xAA])
        }
    }
};


export const oscillator_list_package_parser = (packages_data:any[])=>{
    let packaged_data_list:any[] = []
    const store = useOscillatorGroupStore();
    for (const package_data of packages_data) {
        let result = null;
        // 使用 `data_type` 来调用对应的函数
        if (actions[package_data['data_type']]['function']) {
            setStoreData(store,package_data);
            result = RX_generate_package_buffer(actions[package_data['data_type']].ctrl_code,
                actions[package_data['data_type']].function_code,
                actions[package_data['data_type']]['function'](package_data));
        }
        if (result) {
            packaged_data_list.push(
                { data_type: `Oscillator-${package_data['data_type']}`, data: result }
            );
        }
    }
    return packaged_data_list;
}