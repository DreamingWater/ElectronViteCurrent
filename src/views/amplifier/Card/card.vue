<template>
    <div class="project-box-wrapper">

        <div class="section_card">
            <div class="card-head">
                {{ CardLabel }}
            </div>
            <div class="card_current">
              <div class="title">
                Current(mA)
              </div>
              <div class="value">
              {{ this_current }}
              </div>
            </div>
            <div class="card-input">
                <div class="title">Power(mW)</div>
                <div class="value" >
                    <InputView  :childname="CardLabel"/>
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
    import InputView from  '@/views/amplifier/InputData/InputData.vue'
    import SendButtonView from  '../SendButton/sendbutton.vue'
    import { useAmplifierStore } from "@/store/Amplifier";
    const store = useAmplifierStore();       // store
    import { ref,onMounted ,watch} from 'vue'
    const this_current = ref(0) 

    // 父子接口
    const props = defineProps({
      CardLabel: { type: String, default: true },
    });

  

  // onMounted
  onMounted(()=>{
    window.console.log(props.CardLabel);
  });
  watch(() => store.getTargetCurrent(props.CardLabel),
        (newVal, oldVal) => {
          this_current.value = newVal;
        }
      );

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
    padding: 20px 5px;
    border-radius: 5px;
    background-color: #f9f9fa;
    .card-head{
        color: red;
        font-style: italic;
        font-size: 24px;
        font-weight: bold;
   
    }
    .card-input {
        margin-top: 20px;
        background-color: #f0f8f8;
        padding: 10px 10px;
        border-radius: 3px;
    

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .title{
            font-size: 22px;
            color: rgb(250, 138, 138);
            justify-content: center;
            text-align: center;
        }

    }
    .card-button{
        margin: 20px auto;

    }
  }
}
  .card_current{
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    .title{
      margin-top: 5px;
      font-size: 22px;
      color: rgb(250, 138, 138);
    }
    .value{
      font-size: 23px;
      color: rgb(12, 12, 12);
      font-weight:  bold;
      margin: 10px auto;
  
    }
  }

@media screen and (max-width: 980px) {
 .project-box-wrapper {
    width: 50%;
  }
}
</style>

