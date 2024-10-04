<template>
  <div class="project-box-wrapper">
    <div class="project-box" style="background-color: #fee4cb;">
      <Cardhead :module_name="module_name" :name="CardLabel" />
      <settingCard  :module_name="module_name"/>

    </div>

  </div>
</template>

<script lang='ts' setup>
  import ChargeView from '@/components/showContent/ChargeCard.vue'
  import TempratureView from '@/components/showContent/TemperatureDisk.vue'
  import Cardhead from "@/views/OscillatorGroup/CardHead/cardhead.vue";

  // import ShowFoldLine from '@/components/animation/ShowFoldLine.vue'
  import settingCard from '@/views/OscillatorGroup/SettingCard/index.vue'
  import { ref } from 'vue';

  const CardLabel = 'Oscillator';

  const swichLineOff = ref(false);

  import { useOscillatorGroupStore } from "@/store/oscillatorGroup";
  import {
    OscillatorSettingDataModel,
    OscillatorGettingDataModel} from '@/types/oscillator';

  const oscillator_store = useOscillatorGroupStore();

  const props = defineProps({
    module_name: { type: null, required: true },
    name: { type: String, default: 'None-name' },
  });
  // @ts-nocheck



</script>

<style lang="css" scoped>

@charset "UTF-8";
@import url("https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap");

button, a {
  cursor: pointer;
}

.project-box-wrapper {
  height: 100%;
  width: 100%;
}
.project-box{
  //height: 100%;
  width: 100%;
}

.project-boxes.jsGridView .project-box-wrapper {
  width: 90%;
  min-width: 440px;
  height: 100%;
}
.project-boxes.jsListView .project-box {
  display: flex;
  border-radius: 10px;
  position: relative;
}
.project-boxes.jsListView .project-box > * {
  margin-right: 24px;
}


.project-boxes.jsListView .project-box-header > span {
  position: absolute;
  bottom: 16px;
  left: 16px;
  font-size: 12px;
}


.project-box {
  --main-color-card: #dbf6fd;
  border-radius: 30px;
  padding: 16px;
  background-color: var(--main-color-card);
}
.project-box-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  color: var(--main-color);
}
.project-box-header span {
  color: #4A4A4A;
  opacity: 0.7;
  font-size: 24px;
  line-height: 48px;
}


.project-box-wrapper {
  padding: 8px;
  transition: 0.2s;
}

.project-btn-more {
  padding: 0;
  position: relative;
  background-color: transparent;
  border: none;
  flex-shrink: 0;
  /*&:after, &:before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--main-color);
    opacity: .8;
    left: 50%;
    transform: translatex(-50%);
  }

  &:before { top: 0;}
  &:after { bottom: 0; }*/
}

.more-wrapper {
  position: relative;
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



@media screen and (max-width: 980px) {
  .project-boxes.jsGridView .project-box-wrapper {
    width: 50%;
  }

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
@media screen and (max-width: 520px) {

  .project-boxes.jsGridView .project-box-wrapper {
    width: 100%;
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