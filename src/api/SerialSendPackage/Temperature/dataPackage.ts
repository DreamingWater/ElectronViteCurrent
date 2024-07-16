import { useTemperatureGroupStore} from "@/store/temperatureGroup";
import {SerialSettingDataModel} from "@/types/serial";

const setStoreData = (store:any,store_setter_key:SerialSettingDataModel) => {
    return store.setTargetParameter(store_setter_key);
}

export const initial_temperature_package = () => {
    let instruct:any = [];
    // // 发送 读取PID 数据回来
    // instruct.push('RF' + '\r\n');
    // // 读取 加热制冷双向 的数据
    // instruct.push('RM' + '\r\n');
    // // 自动上报数据
    // instruct.push('SS' + '\r\n');
    //// TEC输出是否使能
    //// instruct.push('REN' + '\r\n');
    instruct.push([{ data_type: 'TemperaturePPLN-ReadPID', data: 'RF' + '\r\n' }])
    // instruct.push([{ data_type: 'TemperaturePPLN-ReadCOOLER', data: 'RM' + '\r\n' }])
    instruct.push([{ data_type: 'TemperaturePPLN-DataUpload', data: 'SS' + '\r\n' }])
    return instruct;
}

const other_actions = {
    'Reset_Setting': ()=> {
        return 'SF' + '\r\n';
    },
    'DataReadEnable':()=>  {
        return '';
        // if (temperature_config.DataEnabled != 0) {
        //     return 'SS' + '\r\n';
        // } else {
        //     return 'SO' + '\r\n';
        // }
    },
    'TsvTemperatureRead':()=>  {
        return 'RS1' + '\r\n';
    }
}

const actions = {
    'WorkingTemperature': (package_data:SerialSettingDataModel) => {
        console.log('SetWorkingTemperature');
        return 'S1' + package_data['value'] + '\r\n';
    },
    'WorkingProportional': (package_data:object) => {
        console.log('SetWorkingProportional');
        return 'SP' + package_data['value'] + '\r\n';
    },
    'WorkingIntegral': (package_data:object) => {
        console.log('SetWorkingIntegral');
        return 'SI' + package_data['value'] + '\r\n';
    },
    'WorkingDerivative': (package_data:object) => {
        console.log('SetWorkingDerivative');
        return 'SD' + package_data['value']  + '\r\n';
    },
    'EnableStatus': (package_data:object) => {
        return 'SEN' + package_data['value'] + '\r\n';
    },
    'HeaterCoolerStatus':(package_data:object)=> {
        return 'SM' + package_data['value'] + '\r\n';
    }
};



export function temperature_list_package_parser(packages_data:[]){
    let packaged_data_list = []
    const store = useTemperatureGroupStore();
    for (const package_data of packages_data) {
        let result = null;
            // 使用 `data_type` 来调用对应的函数
            if (actions[package_data['data_type']]) {
                setStoreData(store,package_data);
                result = actions[package_data['data_type']](package_data);
            } else if (other_actions[package_data['data_type']]) {
                result = other_actions[package_data['data_type']]();
            }else {
                console.log('Unknown data_type: ' + package_data['data_type']);
            }
        if (result) {
            packaged_data_list.push(
                { data_type: `TemperaturePPLN-${package_data['data_type']}`, data: result }
            );
        }
    }
    return packaged_data_list;
}