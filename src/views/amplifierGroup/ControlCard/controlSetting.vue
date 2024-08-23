<template>
  <div class="project-box-wrapper">
    <div class="section_card">
      <ShowInput
          v-for="(item, index) in show_data_list"
          :key="index"
          :name="item.name"
          :data_store="amplifier_store"
          :show_data="item.show_data"
          :set_data="item.set_data"
          :min_value="item.min_value"
          :max_value="item.max_value"
          :show_last_value="false"
      />
      <div class="card-button">
        <SwitchView childname="amplifier" @getValue="changeSwitchValue"  :defaultSwitchValue="defaultValue" />
<!--        <SendAirPlane :name="name" proto_type='send-button' :module_name="module_name" :data_store="temperature_store" :data_package="packaged_send_data"/>-->
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>

// @ts-nocheck
import {ref, reactive, onMounted, watch, computed} from 'vue' ;
import SwitchView from "@/components/ButtonContent/switchView.vue";
import ShowInput from "@/components/Items/ShowInput.vue";

import {useAmplifierGroupStore} from "@/store/amplifierGroup";
import {AmplifierGettingDataModel} from "@/types/amplifier";
const amplifier_store = useAmplifierGroupStore();       // store
const defaultValue = computed(()=>{
  const show_pid_enable_control_data:AmplifierGettingDataModel = {
    data_type: 'PID_Enable',
  };
  const amplifier_enabled_data = amplifier_store.getTargetParameter(show_pid_enable_control_data);
  return amplifier_enabled_data !== 0;
});

import { add_control_task,stop_control_task} from "@/api/scheduler/SchePowerS/powerStability";

const props = defineProps({
  module_name: { type: null, required: true },
  name: { type: String, default: 'None-name' },
});

/////////// 显示数值区间 begin //////////////////////////

// 显示的数值  下位机的设定温度  设定的P I D

const show_working_proportional_data:AmplifierGettingDataModel = {
  data_type: 'SetProportional',
};
const show_working_integral_data:AmplifierGettingDataModel = {
  data_type: 'SetIntegral',
};
const show_working_derivative_data:AmplifierGettingDataModel = {
  data_type: 'SetDerivative',
};

const set_proportional_data:AmplifierSettingDataModel = {
  data_type: 'SetProportional',
  value: 0,
};
const set_integral_data:AmplifierSettingDataModel = {
  data_type: 'SetIntegral',
  value: 0,
};
const set_derivative_data:AmplifierSettingDataModel = {
  data_type: 'SetDerivative',
  value: 0,
};


const set_pid_enable_control_data:AmplifierSettingDataModel = {
  data_type: 'PID_Enable',
  value: 0,
};

const changeSwitchValue = ()=>{
  const this_state = defaultValue.value?0:1 ;
  const set_pid_enable_control_data:AmplifierSettingDataModel = {
    data_type: 'PID_Enable',
    value :  this_state ,
  };
  amplifier_store.setTargetParameter(set_pid_enable_control_data);

  if(this_state===0){    // 之前是true,那现在就是关闭
    stop_control_task('amplifier-power-pid-control',amplifier_store);
  }else {
    const show_power_data:AmplifierGettingDataModel = {
      data_type: 'PowerCurrent',
      channel_name:  'THREE',
      value_model: 'SetPower'
    };
    const show_power_data_value = amplifier_store.getTargetParameter(show_power_data);
    add_control_task('amplifier-power-pid-control',show_power_data_value,amplifier_store);
  }








  // console.log(defaultValue.value);
}
/////////// 设定的数值区间 end //////////////////////////

const show_data_list = [
  {
    'name': 'PID_P',
    'show_data': show_working_proportional_data,
    'set_data':set_proportional_data ,
    'min_value': 0,
    'max_value': 200,
  },
  {
    'name': 'PID_I',
    'show_data': show_working_integral_data,
    'set_data': set_integral_data,
    'min_value': 0,
    'max_value': 100,
  },
  {
    'name': 'PID_D',
    'show_data': show_working_derivative_data,
    'set_data': set_derivative_data,
    'min_value': 0,
    'max_value': 200,
  }
]
/////////// 设定的数值 end //////////////////////////


</script>

<style lang="scss" scoped>

@charset "UTF-8";

button, a {
  cursor: pointer;
}



.project-box-wrapper {
  margin: 5px;
  padding: 20px 5px;
  transition: 0.2s;
  .section_card{

    margin: 5px;
    padding: 10px 5px;
    border-radius: 5px;
    background-color: #f0f8ff;
    .card-item-input {
      margin-top: 5px;
      background-color: #f0f8f8;
      padding: 5px 5px;
      border-radius: 3px;
      align-items: center;
      justify-content: space-between;

      display: flex;
      .title{
        font-size: 16px;
        color: rgb(250, 138, 138);
        justify-content: center;
        text-align: center;

      }
      .current_value{
        font-size: 12px;
        font-family: 'Courier New', Courier, monospace;
        font-style: italic;
      }
      .value{
        margin-left: 10px;
      }

    }

    .card-button{
      margin-top: 25px;
    }
  }
}

</style>

