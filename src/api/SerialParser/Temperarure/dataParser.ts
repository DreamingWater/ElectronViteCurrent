import {SerialSettingDataModel} from "@/types/serial";
import { useTemperatureGroupStore} from "@/store/temperatureGroup";


const create_store_object = ()=>{
    const store = useTemperatureGroupStore();
    return store
}

const deal_received_data_by_regex = (reg_compile_pattern:any,data:any) => {
    let result = reg_compile_pattern.exec(data.toString());
    if (result){
        return result
    }
    return null
}

const regexHandlers = {
    'PV(.*?) SV(.*?) (.*)': (result:any,store:any) => {
        console.log('PV SV:',result[1],result[2],result[3])
        let sample_temperature = result[1];
        let working_temperature = result[2];
        store.setTargetParameter({ 'data_type':'SamplingTemperature', value: result[1]} as SerialSettingDataModel);
        store.setTargetParameter({ 'data_type':'WorkingTemperature', value: result[2]} as SerialSettingDataModel);
        // 是否使能 TEC output
        if (result[3].indexOf('TEC Disabled!') !== -1) {
            store.setTargetParameter({'data_type':'EnableStatus', value: 0} as SerialSettingDataModel);
        } else {
            store.setTargetParameter({'data_type':'EnableStatus', value: 1} as SerialSettingDataModel);
        }
        console.log(`采样温度：${sample_temperature}-设定温度：${working_temperature}`);
        },
    'P:(.*?) I:(.*?) D:(.*?)$': (result:any,store:any) => {  // P:50 I:15 D:20
        let [data_p, data_i, data_d] = [result[1], result[2],  result[3]];
        store.setTargetParameter({ 'data_type':'WorkingProportional', value: result[1]} as SerialSettingDataModel);
        store.setTargetParameter({ 'data_type':'WorkingIntegral', value: result[2]} as SerialSettingDataModel);
        store.setTargetParameter({ 'data_type':'WorkingDerivative', value: result[3]} as SerialSettingDataModel);
        console.log(`pid数据:${data_p}-${data_i}-${data_d}`);
    },
    'M(.*?)': (result:any,store:any) => {
        if(result) {
            store.setTargetParameter({'data_type':'HeaterCoolerStatus', value: result[1]} as SerialSettingDataModel);
            console.log('返回工作模式:', result[1]);
        }
    }
};

const dealData = (data:any, store:any) => {
    for (const [regex, handler] of Object.entries(regexHandlers)) {
        let result = deal_received_data_by_regex(new RegExp(regex, 'g'), data);
        if (result) {
            handler(result,store);
        }
    }
}

export function add_temperature_serial_data_parser(temperature_serial_parser:any) {
    console.log('add_temperature_serial_data_parser');
    temperature_serial_parser.on('data', data => {
        console.log('Received data from port:', data);
        const temperature_store = create_store_object();
        dealData(data,temperature_store);
    });
}