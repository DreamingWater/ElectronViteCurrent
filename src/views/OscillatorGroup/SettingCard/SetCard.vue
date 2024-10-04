<template>
  <div :class="`${name}-control`">
    <div class="control-pannel-header">
      <div class="control-pannel-name"> {{name}}</div>
      <div class="conrol-pannel-label">
        <!--            <SwitchButtons :childname="CardLabel" property="current"/>-->
      </div>
    </div>
    <div class="icon-control">
      <InputBox  :data_store="data_store" :store_setting_key="store_setting_key" :store_getter_key="store_getter_key" :min_value="min_value" :max_value="max_value" :precision="precision"
       :step="step" :disabled="disabled"
      />
    </div>
    <div class="click_circle">
      <SendAirPlane name="name" :proto_type='proto_type' :module_name="module_name" :data_store="data_store" :data_package="packaged_send_data"/>
    </div>
  </div>
</template>


<script lang='ts' setup>

import InputBox from  '@/components/TextBox/InputBox.vue'
import SendAirPlane from "@/components/ButtonContent/SendAirPlane.vue";

import { ref } from 'vue';

const CardLabel = 'cardnale';
const min_value = ref(10);
const max_value = ref(200);
// 父子接口
const props = defineProps({
  name: {type:String, default:'None-name'},
  module_name: { type: null, required: true },
  data_store: { type: null , required: true},
  store_setting_key:{type:null,required:true},
  store_getter_key:{type:null,required:true},
  packaged_send_data:{type:null,required:true},
  proto_type: { type: null, default: 'None-type' },
  step: {type:Number, default:1          },
  disabled: {type:Boolean, default:false },
  precision: {type:Number, default:2     },
  min_value: {type:Number, default:0     },
  max_value: {type:Number, default:100   },
});

const swichLineOff = ref(true);




</script>
<style scoped lang="scss">


  .control-pannel-header{
    text-align: center;
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: space-between;
    background-color: rgb(243, 206, 213);
    border: 1px dashed rgb(252, 178, 109);
    border-radius: 3px;
    .control-pannel-name{
      font-size: 30px;
      font-family:cursive;
      color: rgb(245, 106, 175);
      font-style: italic;
      float: left;
      margin-left: 5px;
    }
    .conrol-pannel-label{
      float: right;
      display: flex;
      align-items: center;
    }
  }

  .temperature-control{
    float: left;
    width: 45%;
    background-color:rgb(254, 228, 210);
    border: 1px solid rgb(233, 240, 181);
    border-radius: 3px;
  }
  .current-control{
    float: right;
    width: 45%;
    background-color:rgb(254, 228, 210);
    border: 1px solid rgb(233, 240, 181);
    border-radius: 3px;
  }
  .icon-control{
    margin-top: 15px;
    display: flex;
    justify-content: center;
    text-align: center;
  }

.click_circle {
  height: 40px;
  display: flex;
  flex-direction: row;
  margin: 10px auto;
  justify-content: space-around;
}

// circle wave

.days-left {
  font-size: 12px;
  border-radius: 20px;
  flex-shrink: 0;
  padding: 0px 16px;
  text-align: center;
}

</style>