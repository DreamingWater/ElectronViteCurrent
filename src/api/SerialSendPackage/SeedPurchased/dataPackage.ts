
import { useSeedPurchasedStore } from "@/store/seedPurchased";
import { SeedPurchasedSettingDataModel } from "@/types/seedPurchased"


import {CommunicationProtocolClass,generate_package_buffer } from "../Base/packConstruct";



const setStoreData = (store:any,store_setter_key:SeedPurchasedSettingDataModel) => {
    return store.setTargetParameter(store_setter_key);
}

// 返回 [][] 二维数组
export const schedual_seed_purchased_package = () => {
    let instruct:any = [];
    // 开启数据上报
    const data_upload = generate_package_buffer(Buffer.from([0xD3]), Buffer.alloc(0))
    instruct.push([{ data_type: 'Seed-DataUpload', data: data_upload }]);

    return instruct as [];
}

export const initial_seed_purchased_package = () => {
    let instruct:any = [];
    // 读取功率
    const read_power = generate_package_buffer(Buffer.from([0xC3]), Buffer.alloc(0))
    instruct.push([{ data_type: 'Seed-ReadPower', data: read_power }]);
    // 读取波长
    const read_wavelength = generate_package_buffer(Buffer.from([0xC8]), Buffer.alloc(0))
    instruct.push([{ data_type: 'Seed-ReadWavelength', data: read_wavelength }]);

    return instruct as [];
}



interface ISerialCtrlCode {
    [key: string]: {
        ctrl_code: Buffer,
        function: (pkg:any) => Buffer
    }
}
//aa55d3000000
const actions: ISerialCtrlCode = {
    'EnableStatus': {
        'ctrl_code': Buffer.from([0xC1]),
        'function': (pkg:any)=>{
            let enable_bytes = Buffer.alloc(1);
            enable_bytes.writeUInt8(pkg['value']);
            return enable_bytes
        }
    },
    'WorkingPower': {
        'ctrl_code': Buffer.from([0xC3]),
        'function': (pkg:any)=>{
            let power_bytes = Buffer.alloc(2);
            power_bytes.writeUInt16LE(pkg['value']);
            return power_bytes
            // return power_bytes
        }
    },
    'WorkingWavelength': {
        'ctrl_code': Buffer.from([0xC8]),
        'function': (pkg:any)=>{
            let wave_length_number = Math.round(pkg['value'] * 10000);
            // const wavelength = wave_length_number.toFixed(0);
            let power_bytes = Buffer.alloc(4); // 创建一个新的缓冲区，大小为4字节
            power_bytes.writeInt32LE(wave_length_number); // 将整数写入缓冲区
            console.log(`wave_bytes is ${power_bytes.toString('hex')}`)
            // return power_bytes
            return power_bytes
        }
    },
};


export const seed_purchased_list_package_parser = (packages_data:any[])=>{
    let packaged_data_list:any[] = []
    const store = useSeedPurchasedStore();
    if (packages_data === undefined || packages_data.length === 0) {
        return [];
    }
    for (const package_data of packages_data) {
        let result = null;
        // 使用 `data_type` 来调用对应的函数
        if (actions[package_data['data_type']]['function']) {

            console.log(package_data)
            setStoreData(store,package_data);
            // buffer result
            result = generate_package_buffer(actions[package_data['data_type']].ctrl_code,actions[package_data['data_type']]['function'](package_data));
        }
        if (result) {
            packaged_data_list.push(
                { data_type: `Seed-${package_data['data_type']}`, data: result }
            );
        }
    }
    return packaged_data_list;
}