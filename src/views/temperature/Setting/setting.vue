<template>
  <div class="project-box-wrapper">
    <div class="section_card">
      <div class="card-item-input">
        <div class="title">TSV(℃)</div>
        <div class="value" >
          <div class="current_value">{{ TSV }}</div>
          <InputView  :childname="CardLabel" property="TSV"/>
        </div>
      </div>
      <div class="card-item-input">
        <div class="title">PID_P</div>

        <div class="value" >
          <div class="current_value">{{ PID_P }}</div>
          <InputView  :childname="CardLabel" property="PID_P"/>
        </div>
      </div>
      <div class="card-item-input">
        <div class="title">PID_I</div>

        <div class="value" >
          <div class="current_value">{{ PID_I }}</div>
          <InputView  :childname="CardLabel" property="PID_I"/>
        </div>
      </div>
      <div class="card-item-input">
        <div class="title">PID_D</div>

        <div class="value" >
          <div class="current_value">{{ PID_D }}</div>
          <InputView  :childname="CardLabel" property="PID_D"/>
        </div>
      </div>
      <!-- <div class="card-item-input">
          <div class="title">Voltage</div>

          <div class="value" >
            <div class="current_value">{{ Voltage_Proportion }}</div>
              <InputView  :childname="CardLabel" property="Voltage_Proportion"/>
          </div>
      </div> -->
      <div class="card-button">
        <SendButtonView :childname="CardLabel"/>
      </div>

    </div>
  </div>
</template>
<script lang='ts' setup>
// @ts-nocheck
import InputView from '@/components/component/inputItem.vue'
import SendButtonView from  '@/views/temperature/Setting/sendbutton/sendbutton.vue'
import { useTemperatureStore } from "@/store/Temperature";
const store = useTemperatureStore();       // store
import { ref,onMounted ,watch, computed} from 'vue'
import { connect } from 'echarts';
const TSV = ref(0)
const PID_P = ref(0)
const PID_I = ref(0)
const PID_D = ref(0)
const Voltage_Proportion = ref(0)

// 父子接口
const props = defineProps({
  CardLabel: { type: String, default: 'Tec-One' },
});



// onMounted
onMounted(()=>{
  TSV.value =   store.getTSVStatus(props.CardLabel) ;
  PID_P.value = store.getPID_PStatus(props.CardLabel);
  PID_I.value = store.getPID_IStatus(props.CardLabel);
  PID_D.value = store.getPID_DStatus(props.CardLabel);
  Voltage_Proportion.value = store.getVoltageStatus(props.CardLabel);
});
watch(() => store.getTSVStatus(props.CardLabel) ,
    (newVal, oldVal) => {
      TSV.value = newVal;
    },);
watch(() => store.getPID_PStatus(props.CardLabel) ,
    (newVal, oldVal) => {
      PID_P.value = newVal;
    },);
watch(() => store.getPID_IStatus(props.CardLabel) ,
    (newVal, oldVal) => {
      PID_I.value = newVal;
    },);
watch(() => store.getPID_DStatus(props.CardLabel) ,
    (newVal, oldVal) => {
      PID_D.value = newVal;
    },);
watch(() => store.getVoltageStatus(props.CardLabel) ,
    (newVal, oldVal) => {
      Voltage_Proportion.value = newVal;
    },);


</script>

<style lang="scss" scoped>

@charset "UTF-8";
@import url("https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap");

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
      margin-top: 45px;
    }
  }
}

</style>