
<template>
  <div>hello world</div>
  <button @click="stop_value_scheducl" style="height: 80px"></button>
<!--  <button @click="set_value_scheducl"  style="height: 80px"></button>-->




</template>

<script lang="ts" setup>
import {useTemperatureGroupStore} from "@/store/TemperatureGroup";
import { TemperatureSettingDataModel,TemperatureGettingDataModel } from '@/types/temperature';




// serial_controller.auto_connect_serial()

import { ref, inject } from  'vue'
import {ConfigManager} from "@/api/Config/configManager";
// import {serialOscillator} from "@/api/scheduler/ScheSerial/ScheOscillator";
import {HYParseFrameData} from '@/api/SerialParser/Base/HYParser';

const num3 = ref(3);

const store = useTemperatureGroupStore();       // store
const clickbutton = ()=>{
  const data:TemperatureGettingDataModel = {
    data_type: 'SetDerivative',
  }
  console.log(store.getTargetParameter(data) );
  // console.log(store.getTargetParameter() );
}
const set_value = ()=>{
  const data:TemperatureSettingDataModel = {
    data_type: 'SetDerivative',
    value: 532,
  }

  // store.SetTargetData('Current', 100,100,100,'ONE');
  store.setTargetParameter(data);
}

const print_hello = (data:string,value:string)=>{
  console.log('hello world');
  console.log(data);
  console.log(value);
}

const do_hanshu = (fun:any,args:any)=>{
  fun('hello','world');
}

function calc_checksum_str(str_data: string): string {
  function crc_check(data: Buffer): Buffer {
    let sum = 0;
    for (let byte of data) {
      sum += byte;
    }
    let sum_bytes = Buffer.alloc(2);
    sum_bytes.writeUInt16LE(sum, 0);
    return sum_bytes;
  }
  let data = Buffer.from(str_data, 'hex');
  let check_data = crc_check(data);
  return check_data.toString('hex');
}

const stop_value_scheducl = ()=>{

  // serialOscillator.SetCurrentTask(0,null,'once');
  console.log('test')
  const data_str = '55aac804b004eb009ff1';
  // const result = HYParseFrameData(data_str);

  let valid_data = 'b004eb00';
  const da = calc_checksum_str(valid_data);
console.log(da);


}
</script>


