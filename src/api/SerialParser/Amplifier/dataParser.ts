import {SerialSettingDataModel} from "@/types/serial";
import { useAmplifierGroupStore } from "@/store/amplifierGroup";
import { AmplifierSettingDataModel } from "@/types/amplifer"
import { amplifier_parser } from "@/api/SerialParser/Base/packParser";
import { scheduler } from '@/api/scheduler/base/scheduler';

const create_store_object = ()=>{
    const store = useAmplifierGroupStore();
    return store
}



const actions = {
    'd3': (dataString:string,store:any)=> {
        let data = Buffer.from(dataString, 'hex');
        if( data.length === 1){
            return
        }
        let receiveLaserStatus = {
            'openStatus': data[0],
            'status': data[1],
            'temperature': (data.readUInt16LE(2) - 27315) / 100,
            'currentOne': data.readUInt16LE(4),
            'currentTwo': data.readUInt16LE(6),
            'currentThree': data.readUInt16LE(8),
        };
        // 电流数据
        const set_amplifier_current :AmplifierSettingDataModel = {
            data_type: 'PowerCurrent',
            value:data.readUInt16LE(4) ,
            value_TWO:data.readUInt16LE(6) ,
            value_THREE:data.readUInt16LE(8) ,
            value_model:'Current',
        }
        store.setTargetParameter(set_amplifier_current);
        // 设置温度数据
        const set_amplifier_temperature :AmplifierSettingDataModel = {
            data_type: 'Temperature',
            value: (data.readUInt16LE(2) - 27315) / 100,
        }
        store.setTargetParameter(set_amplifier_temperature);
        // 设置工作状态数据
        const set_amplifier_workingStatus :AmplifierSettingDataModel = {
            data_type: 'WorkingStatus',
            value: data[1],
        }
        store.setTargetParameter(set_amplifier_workingStatus);

        // 开机状态数据
        const set_amplifier_enableStatus :AmplifierSettingDataModel = {
            data_type: 'EnableStatus',
            value: data[0],
        }
        store.setTargetParameter(set_amplifier_enableStatus);
        // 打印方便观测数据
        console.log(receiveLaserStatus);
    },
    'c4': (dataString:string,store:any)=> {
        let data = Buffer.from(dataString, 'hex');
        if( data.length === 1){
            return
        }
        // 读取设置的功率
        const this_channel = data[0]===1 ? 'ONE' : data[0]===2 ? 'TWO' : 'THREE';
        const set_amplifier_working_power :AmplifierSettingDataModel = {
            data_type: 'PowerCurrent',
            channel_name:  this_channel,
            value_model: 'WorkingPower',
            value:data.readUInt16LE(1),
        }
        if (data[0] === 2){
            scheduler.cancelTask('Amplifier-ReadChannel2Power');
        }else if(data[0] === 3){
            scheduler.cancelTask('Amplifier-ReadChannel3Power');
        }
        console.log(set_amplifier_working_power)
        store.setTargetParameter(set_amplifier_working_power);
    }
}

export function add_amplifier_serial_data_parser(amplifier_serial_parser:any) {
    console.log('add_amplifier_serial_data_parser');

    amplifier_serial_parser.on('data', (data) => {
        console.log('Received data from port:',data);
        const result = amplifier_parser.append_data_parser(data);
        if(result && actions[result.ctrlCode]){
            const store = create_store_object();
            actions[result.ctrlCode](result.data, store);
        }
        // console.log('Received data from port:', data.toString('hex'))
        // if(actions[data[2]]){
        //     const amplifier_store = create_store_object();
        //     actions[data[2]](data.slice(3),amplifier_store); // 传入数据位数
        // }

    });
}