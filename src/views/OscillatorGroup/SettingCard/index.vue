<template>
  <div class="box-progress-wrapper">
    <p class="box-progress-header">Control Section</p>
    <div class="control-pannel">
      <div class="temprature-control">
        <div class="control-pannel-header">
          <div class="control-pannel-name">Temprature</div>
          <div class="conrol-pannel-label">
<!--            <SwitchButtons :childname="CardLabel" property="temprature"/>-->
          </div>
        </div>
        <div class="icon-control">
          <div class="input-control">
            <InputBox  :data_store="oscillator_store" :store_setting_key="set_power_data" :store_getter_key="show_power_data" :min_value="min_value" :max_value="max_value"/>
          </div>
        </div>
        <div class="click_circle">
          <SendAirPlane name="oscillator-temperature" :proto_type='proto_type' :module_name="module_name" :data_store="oscillator_store" :data_package="packaged_send_data"/>
        </div>
      </div>
      <div class="current-control">
        <div class="control-pannel-header">
          <div class="control-pannel-name"> Current</div>
          <div class="conrol-pannel-label">
<!--            <SwitchButtons :childname="CardLabel" property="current"/>-->
          </div>
        </div>
        <div class="icon-control">
          <InputBox  :data_store="oscillator_store" :store_setting_key="set_power_data" :store_getter_key="show_power_data" :min_value="min_value" :max_value="max_value"/>
        </div>
        <div class="click_circle">
          <SendAirPlane name="oscillator-temperature" :proto_type='proto_type' :module_name="module_name" :data_store="oscillator_store" :data_package="packaged_send_data"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang='ts' setup>
// import ChargeView from '@/components/showContent/ChargeCard.vue'
// import TempratureView from '@/components/showContent/TemperatureDisk.vue'
import InputBox from  '@/components/TextBox/InputBox.vue'
// import ShowFoldLine from '@/components/animation/ShowFoldLine.vue'
// import SwitchButtons from  '@/components/component/switchinput.vue'
import { ref } from 'vue';

const CardLabel = 'cardnale';
const min_value = ref(10);
const max_value = ref(200);
// 父子接口
const props = defineProps({
  module_name: { type: null, required: true },
  name: { type: String, default: 'None-name' },
  proto_type:{type: String, default: 'None-type'},  // proto_type 可以是 ONE TWO THREE
  card_name: { type: String, default: 'None-name' },

});

const swichLineOff = ref(true);



import { useOscillatorGroupStore } from "@/store/oscillatorGroup";
import {
  OscillatorSettingDataModel,
  OscillatorGettingDataModel} from '@/types/oscillator';
import SendAirPlane from "@/components/ButtonContent/SendAirPlane.vue";

const oscillator_store = useOscillatorGroupStore();


// @ts-nocheck
const set_power_data:OscillatorSettingDataModel = {
  data_type: 'SetTemperature',
  value: 0,
};
const show_power_data:OscillatorGettingDataModel = {
  data_type: 'WorkingTemperature',
};

// @ts-nocheck

const packaged_send_data = ref([
  [show_power_data,set_power_data,30]
])







</script>

<style lang="css" scoped>

@charset "UTF-8";
@import url("https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap");

button, a {
  cursor: pointer;
}


.box-progress-wrapper {
  height: 100%;
  width: 100%;
}


.project-boxes.jsListView .project-box-header > span {
  position: absolute;
  bottom: 16px;
  left: 16px;
  font-size: 12px;
}
.project-boxes.jsListView .box-progress-wrapper {
  order: 3;
  flex: 1;
}


.project-box-header span {
  color: #4A4A4A;
  opacity: 0.7;
  font-size: 14px;
  line-height: 16px;
}



.box-progress-header {
  font-size: 32px;
  font-family: cursive;
  font-weight: 700;
  line-height: 16px;
  margin: 0;
  font-style: italic;
  color:#fd88b9
}

.participants img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  -o-object-fit: cover;
  object-fit: cover;
}
.participants img:not(:first-child) {
  margin-left: -8px;
}





@media screen and (max-width: 720px) {
  .app-name, .profile-btn span {
    display: none;
  }

  .add-btn svg, .notification-btn svg, .mode-switch svg {
    width: 16px;
    height: 16px;
  }

  .app-header-right button {
    margin-left: 4px;
  }
}



  .profile-btn img {
    width: 24px;
    height: 24px;
  }


  .projects-section-header p,
  .projects-section-header .time {
    font-size: 18px;
  }


  .project-boxes.jsListView .project-box-header > span {
    font-size: 10px;
  }




  .project-boxes.jsListView .project-box > * {
    margin-right: 10px;
  }

  .project-boxes.jsListView .more-wrapper {
    right: 2px;
    top: 10px;
  }

</style>


<style lang="scss" scoped>
// swith 选择框
$primary-light: #8abdff;
$primary: #6d5dfc;
$primary-dark: #5b0eeb;
$white: #FFFFFF;
$greyLight-1: #E4EBF5;
$greyLight-2: #c8d0e7;
$greyLight-3: #bec8e4;
$greyDark: #9baacf;

/*  SWITCH  */
.switch {
  grid-column: 1/2;
  display: grid;
  grid-template-columns: repeat(2, -webkit-min-content);
  grid-template-columns: repeat(2, min-content);
  grid-gap: 1rem;
  justify-self: center;
}
.switch input {
  display: none;
}


.switch__1 {
  width: 2rem;

  label, .switch__2 label {
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.5rem;
    box-shadow: 0.3rem 0.3rem 0.6rem $greyLight-2, -0.2rem -0.2rem 0.5rem $white;
    background: rgba(255, 255, 255, 0);
    position: relative;
    cursor: pointer;
    border-radius: 1.6rem;

    &::after, .switch__2 label::after {
      content: "";
      position: absolute;
      left: 0rem;
      width: 1rem;
      height: 1.5rem;
      border-radius: 50%;
      background: $greyDark;
      transition: all 0.4s ease;
    }

    &::before, .switch__2 label::before {
      content: "";
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(330deg, $primary-dark 0%, $primary 50%, $primary-light 100%);
      opacity: 0;
      transition: all 0.4s ease;
    }
  }

  input:checked ~ label::before {
    opacity: 1;
  }

  input:checked ~ label::after {
    left: 57%;
    background: $greyLight-1;
  }
}
</style>
<style scoped lang="scss">

.project-box-content-header {
  text-align: center;
  display: flex;
  flex-direction: row;
  position: relative;
  height: 200px;
  justify-content: space-around;
  .temprature-show {
    float: left;
  }

  .current-show {
    float: right;
  }
}
.control-pannel{
  margin-top: 15px;
  text-align: center;
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-around;
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

  .temprature-control{
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