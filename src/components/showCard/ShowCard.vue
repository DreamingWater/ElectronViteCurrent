<template>
    <div class="project-box-wrapper">
      <div class="project-box" style="background-color: #fee4cb;">
        <div class="project-box-header">
            <span>{{ CardLabel }}</span>
            <div class="more-wrapper">
              <div class="project-btn-more">
                <!-- <div id="lineoff-switch"  class="switch">
                  <div class="switch__1">
                    <input id="switch-1" type="checkbox" @change="transValue">
                    <label for="switch-1"></label>
                  </div>
                </div> -->
                  <SwitchButtonView @getValue="changeSwitchValue" :childname="CardLabel"/>
              </div>
        </div>
      </div>
      <template v-if="swichLineOff">
        <ShowFoldLine  :childname="CardLabel" property="temprature"/>
      </template>
         
      <div class="project-box-content-header" v-if="!swichLineOff">
        <div class="temprature-show"> 
          <TempratureView :childname="CardLabel" :temperature_value="10"/>
        </div>
        <div class="current-show"> 
          <ChargeView :childname="CardLabel"> </ChargeView>
        </div>
      </div>    
  
      <div class="box-progress-wrapper">
        <p class="box-progress-header">Control Section</p>
        <div class="control-pannel">
          <div class="temprature-control"> 
            <div class="control-pannel-header"> 
              <div class="control-pannel-name"> Temprature</div>
              <div class="conrol-pannel-label"> 
                <SwitchButtons :childname="CardLabel" property="temprature"/>
              </div>
            </div>
            <div class="icon-control">
              <div class="input-control">
                <InputView :childname="CardLabel" property="temprature"/>
              </div>
               
            </div>
            
            <div class="click_circle">
              <SendButtonView  :childname="CardLabel" property="temprature"/> 
            </div>
          </div>
          <div class="current-control"> 
            <div class="control-pannel-header"> 
              <div class="control-pannel-name"> Current</div>
            <div class="conrol-pannel-label"> 
              <SwitchButtons :childname="CardLabel" property="current"/>
              </div>
            </div>
            <div class="icon-control">
              <InputView :childname="CardLabel" property="current"/>
            </div>
            
            <div class="click_circle">
              <SendButtonView  :childname="CardLabel" property="current"/>
            </div>
          </div>  

        </div>

        <!-- `${CardLabel}_tempratue` -->
        
        <!-- <div class="box-progress-bar">
          <span class="box-progress" style="width: 70%; background-color: #ff942e"></span>
        </div>
        <p class="box-progress-percentage">60%</p> -->
      </div>
      <div class="project-box-footer">
        <div class="participants">
          <ButtonGroupView />
        </div>
        <div class="days-left" style="color: #ff942e;">
          <CircleWaveView />
        </div>
      </div>
    </div>
    </div>
</template>
<script lang='ts' setup>
    import ChargeView from '@/components/animation/ChargeView.vue'
    import TempratureView from '@/components/animation/TempratureView.vue'
    import CircleWaveView from '@/components/animation/CircleWave.vue'
    import InputView from  '@/components/component/DataInputView.vue'
    import SwitchButtonView from  '@/components/showCard/Switch/SwitchShowThings.vue'
    import ButtonGroupView from  '@/components/component/buttongroupview.vue'
    import SendButtonView from  '@/components/animation/SendButtonView.vue'
    import ShowFoldLine from '@/components/animation/ShowFoldLine.vue'
    import SwitchButtons from  '@/components/showCard/Switch/SwitchRadioGroupEnableSetSteps.vue'
    import { ref,onMounted } from 'vue'
    const this_tempratue = ref([])
    const this_current = ref([]) 

    // 父子接口
    const props = defineProps({
      CardLabel: { type: String, default: true },
    });

    // swith 处理
    const swichLineOff = ref(false);
    const changeSwitchValue = (value: boolean) => {
      swichLineOff.value = value;
      window.console.log(swichLineOff.value);
  }
  // const transValue = () => {
  //         switchvalue.value = !switchvalue.value;
  //         // window.console.log('checked');
  //         emit("props.childname", switchvalue.value)
  //     }

  // onMounted
  onMounted(()=>{
    window.console.log(props.CardLabel);
  })

</script>

<style lang="css" scoped>

@charset "UTF-8";
@import url("https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap");

button, a {
  cursor: pointer;
}

.project-box-wrapper {
  height: 100%;
  height: 100%;
}
.project-box{
  height: 100%;
  height: 100%;
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
.project-boxes.jsListView .more-wrapper {
  position: absolute;
  right: 16px;
  top: 16px;
}

.project-boxes.jsListView .project-box-header {
  order: 2;
}
.project-boxes.jsListView .project-box-footer {
  order: 3;
  padding-top: 0;
  flex-direction: column;
  justify-content: flex-start;
}
.project-boxes.jsListView .project-box-footer:after {
  display: none;
}
.project-boxes.jsListView .participants {
  margin-bottom: 8px;
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
  font-size: 14px;
  line-height: 16px;
}


.project-box-wrapper {
  padding: 8px;
  transition: 0.2s;
}

.project-btn-more {
  padding: 0;
  height: 14px;
  width: 24px;
  height: 24px;
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

.box-content-header {
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  opacity: 0.7;
}

.box-content-subheader {
  font-size: 14px;
  line-height: 24px;
  opacity: 0.7;
}

.box-progress {
  display: block;
  height: 4px;
  border-radius: 6px;
}
.box-progress-bar {
  width: 100%;
  height: 4px;
  border-radius: 6px;
  overflow: hidden;
  background-color: #fff;
  margin: 8px 0;
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
.box-progress-percentage {
  text-align: right;
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
}

.project-box-footer {
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  position: relative;
}
.project-box-footer:after {
  content: "";
  position: absolute;
  background-color: rgba(255, 255, 255, 0.6);
  width: calc(100% + 32px);
  top: 0;
  left: -16px;
  height: 1px;
}

.participants {
  display: flex;
  align-items: center;
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

.add-participant {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.6);
  margin-left: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}



.mode-switch.active .moon {
  fill: var(--main-color);
}

@media screen and (max-width: 980px) {
  .project-boxes.jsGridView .project-box-wrapper {
    width: 50%;
  }

  .status-number, .status-type {
    font-size: 14px;
  }

  .status-type:after {
    width: 4px;
    height: 4px;
  }

  .item-status {
    margin-right: 0;
  }
}
@media screen and (max-width: 880px) {
  .messages-section {
    transform: translateX(100%);
    position: absolute;
    opacity: 0;
    top: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
  }
  .messages-section .messages-close {
    display: block;
  }

  .messages-btn {
    display: flex;
  }
}
@media screen and (max-width: 720px) {
  .app-name, .profile-btn span {
    display: none;
  }

  .add-btn, .notification-btn, .mode-switch {
    width: 20px;
    height: 20px;
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
  .projects-section {
    overflow: auto;
  }

  .project-boxes {
    overflow-y: visible;
  }

  .app-sidebar, .app-icon {
    display: none;
  }

  .app-content {
    padding: 16px 12px 24px 12px;
  }

  .status-number, .status-type {
    font-size: 10px;
  }

  .view-btn {
    width: 24px;
    height: 24px;
  }

  .app-header {
    padding: 16px 10px;
  }

  .search-input {
    max-width: 120px;
  }

  .project-boxes.jsGridView .project-box-wrapper {
    width: 100%;
  }

  .projects-section {
    padding: 24px 16px 0 16px;
  }

  .profile-btn img {
    width: 24px;
    height: 24px;
  }

  .app-header {
    padding: 10px;
  }

  .projects-section-header p,
.projects-section-header .time {
    font-size: 18px;
  }

  .status-type {
    padding-right: 4px;
  }
  .status-type:after {
    display: none;
  }

  .search-input {
    font-size: 14px;
  }

  .messages-btn {
    top: 48px;
  }

  .box-content-header {
    font-size: 12px;
    line-height: 16px;
  }

  .box-content-subheader {
    font-size: 12px;
    line-height: 16px;
  }

  .project-boxes.jsListView .project-box-header > span {
    font-size: 10px;
  }

  .box-progress-header {
    font-size: 12px;
  }

  .box-progress-percentage {
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
