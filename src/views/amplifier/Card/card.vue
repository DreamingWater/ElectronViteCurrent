<template>
    <div class="project-box-wrapper">

        <div class="section_card">
            <div class="card-head">
                {{ CardLabel }}
            </div>
            <div class="card-input">
                <div class="title">Power</div>
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
    import InputView from  '../inputData/InputData.vue'
    import SendButtonView from  '../SendButton/sendbutton.vue'

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
    padding: 20px 20px;
    border-radius: 5px;
    background-color: #f0f8ff;
    .card-head{
        color: red;
        font-style: italic;

   
    }
    .card-input {
        margin-top: 30px;
        background-color: #f0f8f8;
        padding: 10px 10px;
        border-radius: 3px;
    

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .title{
            font-size: 24px;
            color: red;
            justify-content: center;
            text-align: center;
        }

    }
    .card-button{
        margin: 80px auto;

    }
  }
}


@media screen and (max-width: 980px) {
 .project-box-wrapper {
    width: 50%;
  }
}
</style>

