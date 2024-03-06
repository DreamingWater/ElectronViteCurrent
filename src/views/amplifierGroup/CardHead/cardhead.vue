<!--<template>-->
<!--  <div class="card-box-warpper">-->
<!--    <div class="left-box">-->
<!--      <div class="temperature">-->
<!--        <TemperatureCard :data_store="amplifier_store" :store_getter_key="show_amplifier_temperature" />-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="middle-box">-->
<!--      <div class="status-box">-->
<!--        <div class="status">-->
<!--            <statusShow :name="name" :data_store="amplifier_store" :store_getter_key="show_amplifier_working_status"/>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="right-box">-->
<!--      <div class="status-box">-->
<!--        <div class="status">-->
<!--            <EnableOff :module_name="module_name" :name="name"  :data_store="amplifier_store"  :data_package="send_data_package" :store_key="enable_status"/>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<template>
  <div class="card-box-warpper">
    <TemperatureCard :data_store="amplifier_store" :store_getter_key="show_amplifier_temperature" />
    <statusShow  :data_store="amplifier_store" :store_getter_key="show_amplifier_working_status" :name="name"   />
    <EnableOff :module_name="module_name" :name="name"  :data_store="amplifier_store"  :data_package="send_data_package" :store_key="enable_status"/>
  </div>
</template>
<script lang='ts' setup>
// @ts-nocheck
    import TemperatureCard from "@/components/showContent/TemperatureCard.vue";
    import EnableOff from "@/components/ButtonContent/EnableOff.vue";
    import statusShow from './StatusShow/statusshow.vue'
    import { ref,onMounted, watch } from 'vue'


    // 父子接口
    const props = defineProps({
      module_name: { type: null, required: true },
      name: { type: String, default: 'None-name' },
    });

    import { useAmplifierGroupStore } from "@/store/amplifierGroup";
    import {  AmplifierSettingDataModel,AmplifierGettingDataModel } from '@/types/amplifier';

    const amplifier_store = useAmplifierGroupStore();       // store


    const show_amplifier_temperature:AmplifierGettingDataModel = {
      data_type: 'Temperature',
    }
    const show_amplifier_working_status:AmplifierGettingDataModel = {
      data_type: 'WorkingStatus',
    }
    const enable_status:AmplifierSettingDataModel = {
      data_type: 'EnableStatus',
      value:1,
    }

    const send_data_package = ref([]); // 发送的数据包
</script>

<style lang="scss" scoped>

@charset "UTF-8";
@import url("https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap");
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
</style>



