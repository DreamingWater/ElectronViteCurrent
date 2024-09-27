import {SerialSettingDataModel} from "@/types/serial";
import { oscillator_parser } from "@/api/SerialParser/Base/packParser";
import { scheduler } from '@/api/scheduler/base/scheduler';
import {serialOscillator} from "@/api/scheduler/ScheSerial/ScheOscillator";
import {OscillatorSettingDataModel} from "../../../types/oscillator";
import {useOscillatorGroupStore} from "../../../store/oscillatorGroup";

const create_store_object = ()=>{
    const store = useOscillatorGroupStore();
    return store
}



const actions = {
    // 心跳功能
    '0200': (dataString:string,store:any)=> {
        if(dataString.length === 0){
            // 需要回复💓
        }
        console.log('心跳功能');
       serialOscillator.HeartReplyTask(0,null,'once');
    },
    // 正常数据上报
    '0210': (dataString:string,store:any)=> {
        let data = Buffer.from(dataString, 'hex');
        if( data.length === 1){
            return
        }
        let receiveLaserStatus = {
            'current_channel': data[0],
            'current_value': data.readUInt32LE(1),
            'temperature_channel': data[5],
            'temperature_value': data.readUInt32LE(6),
        };
        // 电流数据
        const set_oscillator_current :OscillatorSettingDataModel = {
            data_type: 'SamplingCurrent',
            value:data.readUInt32LE(1),
        }
        store.setTargetParameter(set_oscillator_current);
        // 设置温度数据
        const set_oscillator_temperature :OscillatorSettingDataModel = {
            data_type: 'SamplingTemperature',
            value: data.readUInt32LE(6)/1000,
        }
        store.setTargetParameter(set_oscillator_temperature);
        // 打印方便观测数据
      //  console.log(receiveLaserStatus);
    },
}

export function add_oscillator_serial_data_parser(oscillator_serial_parser:any) {
    console.log('add_oscillator_serial_data_parser');

    oscillator_serial_parser.on('data', (data) => {
       console.log('Received data from port:',data);
        const result = oscillator_parser.append_data_parser(data);
        console.log('result',result);
        if(result && actions[result.function_code]){
            const store = create_store_object();
            actions[result.function_code](result.data, store);
        }
        // console.log('Received data from port:', data.toString('hex'))
        // if(actions[data[2]]){
        //     const amplifier_store = create_store_object();
        //     actions[data[2]](data.slice(3),amplifier_store); // 传入数据位数
        // }

    });
}