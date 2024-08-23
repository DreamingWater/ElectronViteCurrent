
<template>
  <div>hello world</div>
  <button @click="stop_value_scheducl" style="height: 80px"></button>
<!--  <button @click="set_value_scheducl"  style="height: 80px"></button>-->




</template>

<script lang="ts" setup>
import {useTemperatureGroupStore} from "@/store/TemperatureGroup";
import { TemperatureSettingDataModel,TemperatureGettingDataModel } from '@/types/temperature';
import {serial_controller} from "@/api/SerialChooser/chooserSend";




// serial_controller.auto_connect_serial()

import { ref, inject } from  'vue'
import {ConfigManager} from "@/api/Config/configManager";


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

const stop_value_scheducl = ()=>{
  // const manager = new ConfigManager();
  // const data = manager.get_serial_store_port('Amplifier');
  // console.log(data);
  // do_hanshu();
  const deal_water_cooling_status = (dataHex: Buffer, store: any) => {
    console.log(dataHex);

    const target1 = [0xc0, 0x0e, 0x01, 0x03];
    const target2 = [0x0e, 0x01, 0x03];

    if (dataHex.slice(0, target1.length).every((value, index) => value === target1[index])) {
      console.log('dealed in 4 datas');
      console.log(parseInt(dataHex[4].toString(), 16));
      // setWorkingStatus(store, parseInt(dataHex[4].toString(), 16));
    } else if (dataHex.slice(0, target2.length).every((value, index) => value === target2[index])) {
      console.log('dealed in 3 datas');
      console.log(parseInt(dataHex[3].toString(), 16));
      // setWorkingStatus(store, parseInt(dataHex[3].toString(), 16));
    }
  }

  const send_data = Buffer.from([0xC0,0x0E,0x01,0x03,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x88,0x01]);
  deal_water_cooling_status(send_data,send_data);
}
</script>


