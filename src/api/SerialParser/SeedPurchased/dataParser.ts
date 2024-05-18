import {SerialSettingDataModel} from "@/types/serial";
import { useSeedPurchasedStore } from "@/store/seedPurchased";
import { SeedPurchasedSettingDataModel } from "@/types/seedPurchased"
import { seed_purchased_parser } from "@/api/SerialParser/Base/packParser";

import { scheduler } from '@/api/schedulerPipeline';


const create_store_object = ()=>{
    const store = useSeedPurchasedStore();
    return store
}


const actions = {
    'd3': (dataString:string,store:any)=> {
        let data = Buffer.from(dataString, 'hex');
        if(data.length===1){
            return
        }
        let receive_laser_status = {
            'open_status': data[0],
            'status': data[1],
            'temperature_module': (data.readUInt16LE(2) - 27315) / 100,
            'current_one': data.readUInt16LE(4),
            'current_two': data.readUInt16LE(6),
            'temperature_one': (data.readUInt16LE(8) - 27315) / 100,
            'temperature_two': (data.readUInt16LE(10) - 27315) / 100,
            'temperature_seed': (data.readUInt16LE(12) - 27315) / 100,
            'working_power': data.readUInt16LE(14),
        }
        // 温度数据
        const set_seed_purchased_temperature_module :SeedPurchasedSettingDataModel = {
            data_type: 'TemperatureModule',
            value:(data.readUInt16LE(2) - 27315) / 100,
        }
        store.setTargetParameter(set_seed_purchased_temperature_module);

        const set_seed_purchased_temperature_one :SeedPurchasedSettingDataModel = {
            data_type: 'TemperatureOne',
            value: parseFloat(((data.readUInt16LE(8) - 27315) / 100).toFixed(2)),
        }
        store.setTargetParameter(set_seed_purchased_temperature_one);
        const set_seed_purchased_temperature_two :SeedPurchasedSettingDataModel = {
            data_type: 'TemperatureTwo',
            value: parseFloat(((data.readUInt16LE(10) - 27315) / 100).toFixed(2)),
        }
        store.setTargetParameter(set_seed_purchased_temperature_two);
        const set_seed_purchased_temperature_seed :SeedPurchasedSettingDataModel = {
            data_type: 'TemperatureSeed',
            value:(data.readUInt16LE(12) - 27315) / 100,
        }
        store.setTargetParameter(set_seed_purchased_temperature_seed);


        // 设置电流数据
        const set_seed_purchased_current_one :SeedPurchasedSettingDataModel = {
            data_type: 'CurrentOne',
            value: data.readUInt16LE(4),
        }
        store.setTargetParameter(set_seed_purchased_current_one);
        const set_seed_purchased_current_two :SeedPurchasedSettingDataModel = {
            data_type: 'CurrentTwo',
            value: data.readUInt16LE(6),
        }
        store.setTargetParameter(set_seed_purchased_current_two);
        // 采集的功率数据
        const set_seed_purchased_power :SeedPurchasedSettingDataModel = {
            value:data.readUInt16LE(14),
            data_type: 'SamplePower',
        }
        store.setTargetParameter(set_seed_purchased_power);
        const set_seed_purchased_working_power :SeedPurchasedSettingDataModel = {
            value:data.readUInt16LE(14),
            data_type: 'WorkingPower',
        }
        store.setTargetParameter(set_seed_purchased_working_power);
        // 设置工作状态数据
        const set_seed_purchased_workingStatus :SeedPurchasedSettingDataModel = {
            data_type: 'WorkingStatus',
            value: data[1],
        }
        store.setTargetParameter(set_seed_purchased_workingStatus);

        // 开机状态数据
        const set_seed_purchased_enableStatus :SeedPurchasedSettingDataModel = {
            data_type: 'EnableStatus',
            value: data[0],
        }
        store.setTargetParameter(set_seed_purchased_enableStatus);
        // 打印方便观测数据
        console.log(receive_laser_status);
    },
    'c8': (dataString:string,store:any)=> {
        let data = Buffer.from(dataString, 'hex');
        console.log('find the wavelength data come from the seeder')
        // 读取设置的波长
        if(data.length === 4){
            const set_seed_purchased_working_wavelength :SeedPurchasedSettingDataModel = {
                data_type: 'WorkingWavelength',
                value: data.readUInt32LE(0) / 10000,
            }
            scheduler.cancelTask('Seed-ReadWavelength');
            store.setTargetParameter(set_seed_purchased_working_wavelength);
        }

    },
    'c3': (dataString:string,store:any)=> {
        let data = Buffer.from(dataString, 'hex');
        // 读取设置的功率
        if(data.length===2){
            const set_seed_purchased_working_power :SeedPurchasedSettingDataModel = {
                data_type: 'WorkingPower',
                value: data.readUInt16LE(0),
            }
            scheduler.cancelTask('Seed-ReadPower');
            store.setTargetParameter(set_seed_purchased_working_power);
        }
    }
}


export function add_seed_purchased_serial_data_parser(seed_purchased_serial_parser:any) {
    console.log('add_seed_purchased_serial_data_parser');
    seed_purchased_serial_parser.on('data', data => {
        console.log('Received data from port:', data);
        const result = seed_purchased_parser.append_data_parser(data);
        if(result && actions[result.ctrlCode]){
            const store = create_store_object();
            actions[result.ctrlCode](result.data,store);
        }
    });
}