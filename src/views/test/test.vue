
<template>
  <div>hello world</div>
  <button @click="clickbutton" style="height: 80px"></button>
  <button @click="set_value"  style="height: 80px"></button>
  <el-input-number v-model="num3" size="small" />
</template>


<script lang="ts" setup>
  import { useAmplifierGroupStore } from "@/store/amplifierGroup";
  import { useTemperatureDataStore } from "@/store/TemperatureData";
  import {  AmplifierSettingDataModel,AmplifierGettingDataModel } from '@/types/amplifier';
  import { ref } from  'vue'
  const num3 = ref(3);

  const store = useAmplifierGroupStore();       // store
  const clickbutton = ()=>{
    const data:AmplifierGettingDataModel = {
      data_type: 'PowerCurrent',
      channel_name: 'ONE',
      value_model: 'SetPower'
    }
    console.log(store.getTargetParameter(data) );
    // console.log(store.getTargetParameter() );
  }
  const set_value = ()=>{
    const data:AmplifierSettingDataModel = {
      data_type: 'PowerCurrent',
      value: 532,
      channel_name: 'ONE',
      value_model: 'SetPower'
    }

    // store.SetTargetData('Current', 100,100,100,'ONE');
    store.SetTargetData(data);
  }


</script>