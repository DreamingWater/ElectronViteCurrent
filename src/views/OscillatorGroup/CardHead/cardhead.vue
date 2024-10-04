
<template>
  <div class="project-box-header">

    <div class="more-wrapper">
      <div class="project-btn-more">
        <span class="labelname" :onclick="change_switch_value">{{ name }}</span>
          <EnableOff :module_name="module_name" :name="name"  :data_store="oscillator_store"  :data_package="send_data_package" :store_key="enable_status"/>
        <!--            <SwitchButtonView @getValue="changeSwitchValue" :childname="CardLabel"/>-->
      </div>
    </div>
  </div>
  <template v-if="swichLineOff">
    <div class="switch-line-container" >
      <div class="switch-line-class" >
        <G2LinesPlots :module_name="module_name" :name="name" :data_store="oscillator_store" :store_target_key="store_key_list" :store_target_ele_name="store_target_name" />
        <!--        <ShowFoldLine  :childname="CardLabel" property="temprature"/>-->
        <!--       -->
      </div>
    </div>
  </template>

  <div class="project-box-content-header" v-if="!swichLineOff">
    <div class="temprature-show">
      <TempratureView name='oscillator' :data_store="oscillator_store" :store_getter_key="show_temperature_data"/>
    </div>
    <div class="current-show">
      <ChargeView name='oscillator' :data_store="oscillator_store" :store_getter_key="show_current_data" />
    </div>
  </div>


</template>





<script lang='ts' setup>
// @ts-nocheck
import EnableOff from "@/components/ButtonContent/EnableOff.vue";
import G2LinesPlots from "../../../components/showContent/G2LinesPlots.vue";
import { ref,onMounted, watch } from 'vue'


// 父子接口
const props = defineProps({
  module_name: { type: null, required: true },
  name: { type: String, default: 'None-name' },
});
const swichLineOff = ref(false);
import { useOscillatorGroupStore } from "@/store/oscillatorGroup";
import {
  OscillatorSettingDataModel,
  OscillatorGettingDataModel} from '@/types/oscillator';
import ChargeView from "@/components/showContent/ChargeCard.vue";
import TempratureView from "@/components/showContent/TemperatureDisk.vue";

const oscillator_store = useOscillatorGroupStore();

const change_switch_value = () => {
  swichLineOff.value = !swichLineOff.value;
}

const enable_status: OscillatorSettingDataModel= {
  data_type: 'EnableStatus',
  value:1,
}

const send_data_package = ref([]); // 发送的数据包


const show_temperature_data:OscillatorGettingDataModel = {
  data_type: 'SamplingTemperature',
};
const show_current_data:OscillatorGettingDataModel = {
  data_type: 'SamplingCurrent',
};

//////////       G2 LINE SHOW //////////
const store_target_name = ['Current', 'Temperature'];
const show_current_list:OscillatorGettingDataModel = {
  data_type: 'SamplingCurrentList',
}
const show_temperature_list:OscillatorGettingDataModel = {
  data_type: 'SamplingTemperatureList',
}
const store_key_list = [show_current_list];

</script>

<style lang="scss" scoped>

@charset "UTF-8";


.card-box-warpper {
  width: 100%;
  min-height: 100px;
  border-radius: 10px;
  border: dotted 1px rgb(211, 209, 209);
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  justify-content: space-around;
}

.project-box-content-header {
  text-align: center;
  display: flex;
  flex-direction: row;
  position: relative;
  height: 100%;
  width: 100%;
  justify-content: space-around;
  .temprature-show {
    float: left;
  }

  .current-show {
    float: right;
  }
}

.project-btn-more {
  display: flex;
  justify-content: space-between;
  align-items: center; // Optional: Align items vertically in the center
  padding: 0 10px; // Optional: Add padding for spacing
}
.labelname{
  font-size: 34px;
  font-family: cursive;
  color: rgb(245, 106, 175);
  font-style: italic;
  float: left;
  margin-left: 5px;
}
</style>



<style lang="scss" scoped>
.switch-line-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.switch-line-class {
  width: 100%;
}
</style>