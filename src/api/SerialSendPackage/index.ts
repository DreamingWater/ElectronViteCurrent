import {temperature_list_package_parser, initial_temperature_package} from "./Temperature/dataPackage"
import { PageLocationStateEnum  } from "@/api/pageLocation";
import {amplifier_list_package_parser, initial_amplifier_package, schedual_amplifier_package } from "./Amplifier/dataPackage";
import {seed_purchased_list_package_parser, initial_seed_purchased_package, schedual_seed_purchased_package} from "./SeedPurchased/dataPackage";

// 重新排列数组元素
//let return_data_list = [[1,3,5],[132,323],[12],['a']];
//console.log(rearrangeArraysElements(return_data_list)); // 输出: [[1, 132, 12, 'a'], [3, 323], [5], []]
function rearrangeArraysElements(return_data_list: any[][]): any[][] {
    let elements = [];
    for (let i = 0; i < return_data_list.length; i++) {
        for (let j = 0; j < return_data_list[i].length; j++) {
            if (return_data_list[i][j] === undefined) {
                continue;
            }
            if (elements[j] === undefined) {
                elements[j] = [];
            }
            elements[j].push(return_data_list[i][j]);
        }
    }
    return elements;
}

//  return [[1,3,5],[132,323],[12],['a']]
//packages_data_list =  [[amplifier_channel2show_workingpower_data,amplifier_channel2set_power_data,3000]]
export const cut_data_package_list = (packages_data_list:[][],store:any, reset:boolean=false) => {
    let return_data_list = [];
    console.log('cut_data_package_list:',packages_data_list)
    for(const data_package of packages_data_list) {
        if(data_package.length !== 3) {      // 数据包不符合要求
            console.log('Invalid data package:',data_package);
            continue;
        }

        const target_getter_value = store.getTargetParameter(data_package[0]);  //working_data
        let target_setter_value = store.getTargetParameter(data_package[1]);  // set_data
        // console.log('target_getter_value:',target_getter_value)
        // console.log('target_setter_value:',target_setter_value)
        if (reset) {           // 这是为了关闭的时候，将所有的数据都设置为0
            target_setter_value = 0;
        }
        if(target_setter_value === target_getter_value && data_package[0]['data_type'] !== data_package[1]['data_type']) {   // 数据没有发生改变
            continue;
        }
        // 需要处理数据包，保存在下面
        let set_package_list:any = [];
        // 数据包符合要求，且数据发生改变
        if (data_package[2] === 0) {
            let set_package:any= JSON.parse(JSON.stringify(data_package[0]));  // 深拷贝
            set_package['value'] = data_package[1]['value'];
            set_package_list.push(set_package);
        }
        // 需要进行数据慢速解析
        else {
            let once_step:number = data_package[2];
            let step:number = target_getter_value > target_setter_value ?-1* once_step : once_step;
            for (let i = target_getter_value + step; (i-target_setter_value)*step<0; i += step) {
                let set_package:any= JSON.parse(JSON.stringify(data_package[0]));  // 深拷贝
                set_package['value'] = i;
                set_package_list.push(set_package);
            }
            // 最后一个数据包 如果设定差不足step,或者之前的step最后一个数据不是设定值
            if(set_package_list.length===0 || set_package_list[set_package_list.length-1]['value']!==data_package[1]['value']){
                let set_package:any= JSON.parse(JSON.stringify(data_package[0]));  // 深拷贝
                set_package['value'] = data_package[1]['value'];
                set_package_list.push(set_package);
            }
        }

        return_data_list.push(set_package_list);
    }
    return return_data_list
    // return rearrangeArraysElements(return_data_list);
}

// [[pack1 buffer][pack2 buffer]]
// [{data:[pack1 buffer]},{data:[pack2 buffer]}]
function transformListToDataDictList(result: any[]): { data: any }[] {
    return result.map(item => ({ data: item }));
}
// initial_data 为真就在包中加入 初始发送包，否则不加入
// interval 就加入 interval包
function combine_package_with_or_not_initial(packages_data:[],  other_instruct: 'initial' | 'internal' | null,
                                             package_parser:any,initial_package:any,internal_package:any)
{
    let result:any[] = package_parser(packages_data);
    for(const data of result) {
        console.log('combined data is:',data['data'].toString('hex'));
    }
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
}


export const serial_data_package_factory = (packages_data:any, serial_function: PageLocationStateEnum,
                                            other_instruct: 'initial' | 'internal' | null=null)=> {
    if (actions[serial_function]) {
        return actions[serial_function](packages_data,other_instruct);
    } else {
        throw new Error("Invalid serial function location: " + serial_function);
    }
}