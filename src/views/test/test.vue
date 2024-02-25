
<template>
  <div>hello world</div>
  <button @click="clickbutton" style="height: 80px"></button>
  <button @click="set_value"  style="height: 80px"></button>
  <el-input-number v-model="num3" size="small" />
</template>


<script lang="ts" setup>
import {useTemperatureGroupStore} from "@/store/TemperatureGroup";
  import {  TemperatureSettingDataModel,TemperatureGettingDataModel } from '@/types/temperature';
  import { ref } from  'vue'
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


</script>