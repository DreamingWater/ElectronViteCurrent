
import { useTemperatureGroupStore } from "@/store/temperatureGroup";
import { SerialSettingDataModel } from "@/types/serial";
const store = useTemperatureGroupStore();


const dealData = (data:any) => {
    let compile = new RegExp('PV(.*?) SV(.*?) ', 'g');
    let compile2 = new RegExp('P(.*?) I(.*?) D(.*?)', 'g');
    let compile3 = new RegExp('M(.*?)', 'g');
    let result = compile.exec(data.toString());
    let result2 = compile2.exec(data.toString());
    let result3 = compile3.exec(data.toString());
    if(result3) {
        store.setTargetParameter({ 'data_type':'SetHeaterCooler', value: result3[1]} as SerialSettingDataModel);
        console.log('返回工作模式:', result3[1]);
    }
    else if (result) {
        let sample_temperature = result[1];
        let working_temperature = result[2];
        store.setTargetParameter({ 'data_type':'SamplingTemperature', value: result3[1]} as SerialSettingDataModel);
        store.setTargetParameter({ 'data_type':'WorkingTemperature', value: result3[2]} as SerialSettingDataModel);
        console.log(`采样温度：${sample_temperature}-设定温度：${working_temperature}`);
    }
    else if(result2 && result2.length >= 4){
        let [data_p, data_i, data_d] = [result2[1], result2[2],  result2[3]];
        store.setTargetParameter({ 'data_type':'WorkingProportional', value: result3[1]} as SerialSettingDataModel);
        store.setTargetParameter({ 'data_type':'WorkingIntegral', value: result3[2]} as SerialSettingDataModel);
        store.setTargetParameter({ 'data_type':'WorkingDerivative', value: result3[3]} as SerialSettingDataModel);
        console.log(`pid数据:${data_p}-${data_i}-${data_d}`);
    }
}

function add_serial_data_parser(this_parser:any) {
    this_parser.on('data', data => {
        console.log('Received data from port:', data);
        dealData(data);
        // receivedData.value += data;
        // if (data.trim() === 'hello') {
        //     console.log('你好');
        // } else if (data.trim() === '你好') {
        //     console.log('hello');
        // }
    });
}