import { useAmplifierGroupStore } from "@/store/amplifierGroup";
import { AmplifierSettingDataModel } from "@/types/amplifier";
import {CommunicationProtocolClass,HYgenerate_package_buffer } from "../Base/packConstruct";


const setStoreData = (store:any,store_setter_key:AmplifierSettingDataModel) => {
    return store.setTargetParameter(store_setter_key);
}

export const schedual_amplifier_package = () => {
    let instruct:any = [];
    // 开启数据上报
    const data_upload = HYgenerate_package_buffer(Buffer.from([0xD3]), Buffer.alloc(0))
    instruct.push([{ data_type: 'Amplifier-DataUpload', data: data_upload }]);
    return instruct as [];
}

export const initial_amplifier_package = () => {
    let instruct:any = [];
    // 读取通道1功率
    // const channel1_power = generate_package_buffer(Buffer.from([0xC4]), Buffer.from([0x01]))
    // instruct.push([{ data_type: 'Amplifier-ReadChannel1Power', data: channel1_power }])
    // 读取通道2功率
    const channel2_power = HYgenerate_package_buffer(Buffer.from([0xC4]), Buffer.from([0x02]))
    instruct.push([{ data_type: 'Amplifier-ReadChannel2Power', data: channel2_power }])
    // 读取通道3功率
    const channel3_power = HYgenerate_package_buffer(Buffer.from([0xC4]), Buffer.from([0x03]))
    instruct.push([{ data_type: 'Amplifier-ReadChannel3Power', data: channel3_power }])

    return instruct as Buffer[];
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
    'PowerCurrent': {
        'ctrl_code': Buffer.from([0xC4]),
        'function': (pkg:any)=>{
            const channel =  pkg['channel_name'] === 'ONE' ? 1 : pkg['channel_name'] === 'TWO' ? 2:3;
            const power = pkg['value'];
            let channel_bytes = Buffer.alloc(1);
            channel_bytes.writeUInt8(channel);
            let powerEnergy = Buffer.alloc(2);
            powerEnergy.writeUInt16LE(power);
            let result = Buffer.concat([channel_bytes, powerEnergy]);
            return result;
        }
    },
};


export const amplifier_list_package_parser = (packages_data:any[])=>{
    let packaged_data_list:any[] = []
    const store = useAmplifierGroupStore();
    for (const package_data of packages_data) {
        let result = null;
        // 使用 `data_type` 来调用对应的函数
        if (actions[package_data['data_type']]['function']) {
            setStoreData(store,package_data);
            result = HYgenerate_package_buffer(actions[package_data['data_type']].ctrl_code,actions[package_data['data_type']]['function'](package_data));

        }
        if (result) {
            if (package_data['data_type'] !== 'PowerCurrent') {
                packaged_data_list.push(
                    { data_type: `Amplifier-${package_data['data_type']}`, data: result }
                );
            }else {
                packaged_data_list.push(
                    { data_type: `Amplifier-${package_data['data_type']}-${package_data['channel_name']}`, data: result }
                );
            }

        }
    }
    return packaged_data_list;
}