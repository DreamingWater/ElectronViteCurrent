// interface VersionControlInterface {
//     [key: string]: {
//         ctrl_code: Buffer,
//         function_code:Buffer,
//         function: (pkg:any) => Buffer
//     }
// }
//0xEE,0xEE,0xEE,0x01
import {elementSelect} from "@antv/g2/lib/interaction/elementSelect";

const VersionControlManager = {
    // 设定工作温度
    'eeeeee01': {
        'Amplifier': {
            'ONE':20000,
            'THREE':40000,
        },
        'SeedPurchased': {
            'POWER': 40000,
            'Wavelength_max': 1540.65,
            'Wavelength_min': 1539.85,
        }
    },
    'eeeeee02': {
        'Amplifier': {
            'ONE':20000,
        },
        'SeedPurchased': {
            'POWER': 40000,
            'Wavelength-max': 1540.65,
            'Wavelength-min': 1539.85,
        }
    },
};

const get_control_config_based_version = (version: string) => {
    if (version in VersionControlManager) {
        return VersionControlManager[version];
    } else {
        return VersionControlManager['eeeeee02'];
    }
}
export default get_control_config_based_version;