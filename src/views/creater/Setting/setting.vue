<template>
    <div class="project-box-wrapper">
        <div class="section_card">
            <div class="card-item-input">
                <div class="title">Current</div>
                <div class="value" >
                  <div class="current_value">{{ Current }}</div>
                    <InputView  :childname="CardLabel" property="SettingCurrent"/>
                </div> 
            </div>
            <div class="card-item-input">
                <div class="title">Kp</div>
                <p class="unit">&times;10<sup>&minus;3</sup></p>
              
                <div class="value" >
                  <div class="current_value">{{ PID_P }}</div>
                    <InputView  :childname="CardLabel" property="PID_P" datatype="int"/>
                </div> 
            </div>
            <div class="card-item-input">
                <div class="title">Ti</div>
                <p class="unit">&times;10<sup>&minus;4</sup></p>
                <div class="value" >
                  <div class="current_value">{{ PID_I }}</div>
                    <InputView  :childname="CardLabel" property="PID_I" datatype="int"/>
                </div> 
            </div>
            <div class="card-item-input">
                <div class="title">Td</div>
                <p class="unit">&times;10<sup>&minus;3</sup></p>
                <div class="value" >
                  <div class="current_value">{{ PID_D }}</div>
                    <InputView  :childname="CardLabel" property="PID_D" datatype="int"/>
                </div> 
            </div>
            <div class="card-button">
                    <SendButtonView :childname="CardLabel"/>
            </div> 

        </div>
    </div>
</template>
<script lang='ts' setup>
   // @ts-nocheck
    import InputView from '@/components/component/inputItem.vue'
    import SendButtonView from  './sendbutton/sendbutton.vue'
    import { useOscillatorStore } from "@/store/CreaterSet";
    const store = useOscillatorStore();       // store
    import { ref,onMounted ,watch, computed} from 'vue'
    const Current = ref(0);
    const PID_P = ref(0);
    const PID_I = ref(0);
    const PID_D = ref(0);


    // 父子接口
    const props = defineProps({
      CardLabel: { type: String, default: 'Creater' },
    });

  

    // onMounted
    onMounted(()=>{
            Current.value =   store.getCurrentStatus(props.CardLabel) ;
            PID_P.value = store.getPID_PStatus(props.CardLabel);
            PID_I.value = store.getPID_IStatus(props.CardLabel);
            PID_D.value = store.getPID_DStatus(props.CardLabel);
    });
    watch(() => store.getCurrentStatus(props.CardLabel) ,
          (newVal, oldVal) => {
            Current.value = newVal;
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
  .unit{
    font-size: 12px;
    color: rgb(250, 138, 138);
    font-style: italic;
  }
}

</style>

