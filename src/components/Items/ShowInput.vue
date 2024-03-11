<template>
  <div class="card-item-input">
    <div class="title">{{ name }}</div>
    <div class="value">
      <div class="current_value">
        <ValueShow :data_store="data_store" :store_getter_key="show_data" />
      </div>
      <InputBox :data_store="data_store" :store_setting_key="set_data" :store_getter_key="show_data" :min_value="min_value" :max_value="max_value" :precision="precision"/>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps } from 'vue';
import InputBox from "@/components/TextBox/InputBox.vue";
import ValueShow from "@/components/showContent/ValueShow.vue";
import {number} from "echarts";

const props = defineProps({
  name: { type: String , required: 'None-name'},
  data_store: { type: null , required: true},
  show_data:  {type:null,required:true},
  set_data:   {type:null,required:true},
  min_value:{type:Number,require:true},
  max_value:{type:Number,require:true},
  precision:{type:Number,default:2},
});
</script>

<style scoped>
.card-item-input {
  margin-top: 5px;
  background-color: #f0f8f8;
  padding: 5px 5px;
  border-radius: 3px;
  align-items: center;
  justify-content: space-between;
  display: flex;
  .title {
    font-size: 16px;
    color: rgb(250, 138, 138);
    justify-content: center;
    text-align: center;
  }
  .current_value {
    font-size: 12px;
    font-family: 'Courier New', Courier, monospace;
    font-style: italic;
  }
  .value {
    margin-left: 10px;
  }
}
</style>