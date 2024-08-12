
<template>
  <div>hello world</div>
  <button @click="stop_value_scheducl" style="height: 80px"></button>
<!--  <button @click="set_value_scheducl"  style="height: 80px"></button>-->
  <el-input-number v-model="num3" size="small" />




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

const stop_value_scheducl = ()=>{
  // const manager = new ConfigManager();
  // const data = manager.get_serial_store_port('Amplifier');
  // console.log(data);
  serial_controller.auto_connect_serial();
}
</script>


