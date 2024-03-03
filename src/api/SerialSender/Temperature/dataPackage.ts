import { useTemperatureGroupStore} from "@/store/temperatureGroup";
import {SerialGettingDataModel} from "@/types/serial";
const store = useTemperatureGroupStore();
const getStoreData = (data_type: string) => {
    return store.getTargetParameter({ 'data_type':data_type } as SerialGettingDataModel);
}

// class TemperatureProtocol {
//     TecStartStopSwitch(): Buffer {
//         return Buffer.from('SEN' + getStoreData('')+ '\r\n', 'utf8');
//     }
//     TecTemperatureSetting(): Buffer {
//         return Buffer.from('S1' + temperature_config.Setting + '\r\n', 'utf8');
//     }
//     TecPid_P_Setting(): Buffer {
//         return Buffer.from('SP' + temperature_config.Pid_P + '\r\n', 'utf8');
//     }
//     TecPid_I_Setting(): Buffer {
//         return Buffer.from('SI' + temperature_config.Pid_I + '\r\n', 'utf8');
//     }
//     TecPid_D_Setting(): Buffer {
//         return Buffer.from('SD' + temperature_config.Pid_D + '\r\n', 'utf8');
//     }
//     TecPid_Reset_Setting(): Buffer {
//         return Buffer.from('SF' + '\r\n', 'utf8');
//     }
//     TecTemperatureDataReadEnable(): Buffer {
//         if (temperature_config.DataEnabled != 0) {
//             return Buffer.from('SS' + '\r\n', 'utf8');
//         } else {
//             return Buffer.from('SO' + '\r\n', 'utf8');
//         }
//     }
//     TsvTemperatureRead(): Buffer {
//         return Buffer.from('RS1' + '\r\n', 'utf8');
//     }
// }


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
    'SetTemperature': () => {
        console.log('SetTemperature');
        return 'S1' + getStoreData('SetTemperature') + '\r\n';
    },
    'SetProportional': () => {
        console.log('SetProportional');
        return 'SP' + getStoreData('SetProportional') + '\r\n';
    },
    'SetIntegral': () => {
        console.log('SetIntegral');
        return 'SI' + getStoreData('SetIntegral') + '\r\n';
    },
    'SetDerivative': () => {
        console.log('SetDerivative');
        return 'SD' + getStoreData('SetDerivative')  + '\r\n';
    },
    'EnableStatus': () => {
        return 'SEN' + getStoreData('EnableStatus')+ '\r\n';
    },
    'SetHeaterCooler':()=> {
        return 'SM' + getStoreData('SetHeaterCooler')+ '\r\n';
    }
};



export function list_package_parser(packages_data:[]){
    let packaged_data_list = []
    for (const package_data of packages_data) {
        let result = null;
    // 使用 `data_type` 来调用对应的函数
            if (actions[package_data['data_type']]) {
                result = actions[package_data['data_type']]();
            } else if (other_actions[package_data['data_type']]) {
                result = other_actions[package_data['data_type']]();
            }else {
                console.log('Unknown data_type: ' + package_data['data_type']);
            }
        if (result) {
            packaged_data_list.push(result);
        }
    }
    return packaged_data_list;
}