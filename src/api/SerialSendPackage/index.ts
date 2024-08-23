import {temperature_list_package_parser, initial_temperature_package} from "./Temperature/dataPackage"
import { PageLocationStateEnum  } from "@/api/pageLocation";
import {amplifier_list_package_parser, initial_amplifier_package, schedual_amplifier_package } from "./Amplifier/dataPackage";
import {seed_purchased_list_package_parser, initial_seed_purchased_package, schedual_seed_purchased_package} from "./SeedPurchased/dataPackage";
import {schedual_water_cooling_package, water_cooling_package_parser} from "./WaterCooling/dataPackage";


// initial_data 为真就在包中加入 初始发送包，否则不加入
// interval 就加入 interval包
//return [[pack1 buffer][pack2 buffer]]
function combine_package_with_or_not_initial(packages_data:[],  other_instruct: 'initial' | 'internal' | null,
                                             package_parser:any,initial_package:any,internal_package:any)
{
    let result:any[] = package_parser(packages_data);
    // for(const data of result) {
    //     console.log('combined data is:',data['data'].toString('hex')); // 将数据打印出来
    // }
    if (other_instruct) {
        let other_package = null;
        if(other_instruct === 'initial' && initial_package){
            other_package = initial_package();  // 初始发送的数据包
        }else if(other_instruct === 'internal' && internal_package){
            other_package = internal_package();  // 定时数据包
        }
        if(other_package){
            result = [...other_package, ...result];
            // let concat_array = other_package.concat(result)
            // result = concat_array;
        }
    }
    // 此时 result 为 [[pack1 buffer][pack2 buffer]]
    // return transformListToDataDictList(result); // [{data:[pack1 buffer]},{data:[pack2 buffer]}]
    return result;
}

const actions = {
    [PageLocationStateEnum.Oscillator]: (packages_data:[],other_instruct: 'initial' | 'internal' | null) => [],
    [PageLocationStateEnum.Amplifier]: (packages_data:[],other_instruct: 'initial' | 'internal' | null) => {
       return combine_package_with_or_not_initial(packages_data,other_instruct,
           amplifier_list_package_parser,initial_amplifier_package,
           schedual_amplifier_package)
    },
    [PageLocationStateEnum.TemperaturePPLN]: (packages_data:[],other_instruct: 'initial' | 'internal' | null) => {
       return combine_package_with_or_not_initial(packages_data,other_instruct,
           temperature_list_package_parser,initial_temperature_package,
           null)
    },
    [PageLocationStateEnum.SeedPurchased]: (packages_data:[],other_instruct: 'initial' | 'internal' | null) => {
         return combine_package_with_or_not_initial(packages_data,other_instruct,
              seed_purchased_list_package_parser,initial_seed_purchased_package,
              schedual_seed_purchased_package)
    },
    [PageLocationStateEnum.Manager]: (packages_data:[],other_instruct: 'initial' | 'internal' | null) =>
    {
        return [] ;  // 没有数据需要发送
    },
    [PageLocationStateEnum.WaterCooling]: (packages_data:[],other_instruct: 'initial' | 'internal' | null) =>
    {
        return combine_package_with_or_not_initial(packages_data,other_instruct,
            water_cooling_package_parser,null,
            schedual_water_cooling_package)
    },
}


export const serial_data_package_factory = (packages_data:any, serial_function: PageLocationStateEnum,
                                            other_instruct: 'initial' | 'internal' | null=null)=> {
    if (actions[serial_function]) {
        return actions[serial_function](packages_data,other_instruct);
    } else {
        throw new Error("Invalid serial function location: " + serial_function);
    }
}