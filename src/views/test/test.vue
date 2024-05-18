
<template>
  <div>hello world</div>
  <button @click="stop_value_scheducl" style="height: 80px"></button>
  <button @click="set_value_scheducl"  style="height: 80px"></button>
  <el-input-number v-model="num3" size="small" />




</template>

<script lang="ts" setup>
import {useTemperatureGroupStore} from "@/store/TemperatureGroup";
import { TemperatureSettingDataModel,TemperatureGettingDataModel } from '@/types/temperature';
import { ref, inject } from  'vue'
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
// 定义一个任务函数
function taskFunction(hello:string, name1:string) {
  console.log('taskFunction', hello, name1);
}
const scheduler = inject('$scheduler');
const set_value_scheducl = ()=> {
  scheduler.addTask('task1', taskFunction, [{ hello:'hello',name1:'xiaoming' }] , 3);
}
const stop_value_scheducl = ()=> {
  scheduler.cancelTask('task1');
}
</script>


