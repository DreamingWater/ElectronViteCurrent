<template>
  <div class="box-progress-wrapper">
    <p class="box-progress-header">Control Section</p>
    <div class="control-pannel">
      <SetCard  :module_name=module_name name="temperature" proto_type="Temp" :data_store="oscillator_store" :store_setting_key="set_temperature_data"
                  :store_getter_key="show_temperature_data"  :packaged_send_data="packaged_send_temperature_data"   />
      <SetCard  :module_name=module_name name="current" proto_type="Current" :data_store="oscillator_store" :store_setting_key="set_current_data"
                :store_getter_key="show_current_data"  :packaged_send_data="packaged_send_current_data"   />

    </div>
  </div>

</template>




<script lang='ts' setup>
import SetCard from "@/views/OscillatorGroup/SettingCard/SetCard.vue";
// import ChargeView from '@/components/showContent/ChargeCard.vue'
// import TempratureView from '@/components/showContent/TemperatureDisk.vue'
// import InputBox from  '@/components/TextBox/InputBox.vue'
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


const oscillator_store = useOscillatorGroupStore();


// @ts-nocheck
const set_temperature_data:OscillatorSettingDataModel = {
  data_type: 'SetTemperature',
  value: 0,
};
const show_temperature_data:OscillatorGettingDataModel = {
  data_type: 'WorkingTemperature',
};
const set_current_data:OscillatorSettingDataModel = {
  data_type: 'SetCurrent',
  value: 0,
};
const show_current_data:OscillatorGettingDataModel = {
  data_type: 'WorkingCurrent',
};
// @ts-nocheck

const packaged_send_current_data = ref([
  [show_current_data,set_current_data,0]
])

const packaged_send_temperature_data = ref([
  [show_temperature_data,set_temperature_data,0]
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
}

.control-pannel{

    margin-top: 15px;
    text-align: center;
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: space-around;
}
</style>