import {temperature_list_package_parser, initial_temperature_package} from "./Temperature/dataPackage"
import { PageLocationStateEnum  } from "@/api/pageLocation";

// 重新排列数组元素
//let return_data_list = [[1,3,5],[132,323],[12],['a']];
//console.log(generateElements(return_data_list)); // 输出: [[1, 132, 12, 'a'], [3, 323], [5], []]
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


export const cut_data_package_list = (packages_data_list:[][],store:any) => {
    let return_data_list = [];
    for(const data_package of packages_data_list) {
        if(data_package.length !== 3) {      // 数据包不符合要求
            console.log('Invalid data package:',data_package);
            continue;
        }

        const target_getter_value = store.getTargetParameter(data_package[0]);  //working_data
        const target_setter_value = store.getTargetParameter(data_package[1]);  // set_data
        if(target_setter_value === target_getter_value && data_package[0]['data_type'] !== data_package[1]['data_type']) {   // 数据没有发生改变
            continue;
        }
        // 需要处理数据包，保存在下面
        let set_package_list:any = [];
        // 数据包符合要求，且数据发生改变
        if (data_package[2] === 0) {
            let set_package:any= JSON.parse(JSON.stringify(data_package[1]));  // 深拷贝
            set_package['data_type'] = data_package[0]['data_type'];
            set_package_list.push(set_package);
        }
        // 需要进行数据慢速解析
        else {
            let once_step = data_package[2];
            let step = target_getter_value > target_setter_value ?-1* once_step : 1*once_step;
            for (let i = target_getter_value + step; (i-target_setter_value)*step<0; i += step) {
                let set_package:any= JSON.parse(JSON.stringify(data_package[1]));  // 深拷贝
                set_package['value'] = i;
                set_package['data_type'] = data_package[0]['data_type'];
                set_package_list.push(set_package);
            }
            set_package_list.push(data_package[1]);
        }

        return_data_list.push(set_package_list);
    }
    return rearrangeArraysElements(return_data_list);
}

const actions = {
    [PageLocationStateEnum.Oscillator]: (packages_data:[],initial_needed) => 'add serial oscillator parser',
    [PageLocationStateEnum.Amplifier]: (packages_data:[],initial_needed) => 'add serial amplifier parser',
    [PageLocationStateEnum.TemperaturePPLN]: (packages_data:[],initial_needed) => {
        console.log('add serial amplifier parser');
        let result:string[] = temperature_list_package_parser(packages_data);
        if (initial_needed) {
            let initial_array =   initial_temperature_package();
            let concat_array = initial_array.concat(result)
            return concat_array
        }
        return result;
    },
}

export const serial_data_package_factory = (packages_data:any, serial_function: PageLocationStateEnum,initial_needed:boolean=false)=> {
    if (actions[serial_function]) {
        return actions[serial_function](packages_data,initial_needed);
    } else {
        throw new Error("Invalid serial function location: " + serial_function);
    }
}