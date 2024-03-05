<template>
    <div class="project-box-wrapper">

        <div class="section_card">
            <div class="card-head">
                {{ CardLabel }}_{{name}}
            </div>
            <div class="card_current">
              <div class="title">
                Current(mA)
              </div>
              <div class="value">
                <ValueShow :data_store="amplifier_store" :store_getter_key="show_current_data"  />

              </div>
            </div>
            <div class="card-input">
                <div class="title">Power(mW)</div>
                <div class="value" >
                    <InputBox  :data_store="amplifier_store" :store_setting_key="set_power_data" :store_getter_key="show_power_data"/>
                </div>
            </div>
            
            <div class="card-button">
                <SendAirPlane :name="CardLabel"/>
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup>
   // @ts-nocheck
   import { ref,onMounted ,watch} from 'vue' ;
   import InputView from '@/views/amplifier1/InputData/InputData.vue'
    import InputBox from "@/components/TextBox/InputBox.vue";
    import ValueShow from "@/components/showContent/ValueShow.vue";
    import SendButtonView from  '../SendButton/sendbutton.vue'
    import SendAirPlane from "@/components/ButtonContent/SendAirPlane.vue";
    import { useAmplifierStore } from "@/store/Amplifier";
    const store = useAmplifierStore();       // store

   // 父子接口
   const props = defineProps({
     CardLabel: { type: String, default: 'None-label'},
     name: { type: String, default: 'None-name' },
   });


   import { useAmplifierGroupStore } from "@/store/amplifierGroup";
   import {
     AmplifierSettingDataModel,
     AmplifierGettingDataModel,
     DataTypeModel,
     AmplifierChannelModel, CurrentPowerValueModel
   } from '@/types/amplifier';
   const amplifier_store = useAmplifierGroupStore();       // store

   // @ts-nocheck
   const set_power_data:AmplifierSettingDataModel = {
     data_type: 'PowerCurrent',
     value: 0,
     channel_name: props.name as string,
     value_model:'SetPower',
   };
   const show_power_data:AmplifierGettingDataModel = {
     data_type: 'PowerCurrent',
     channel_name:  props.name as string,
     value_model: 'WorkingPower'
   };

   // @ts-nocheck
   const show_current_data:AmplifierGettingDataModel = {
     data_type: 'PowerCurrent',
     channel_name:  props.name as string,
     value_model: 'Current'
   };


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
        font-size: 20px;
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
      color: rgb(203, 61, 61);
      font-weight:  bold;
      margin: 10px auto;
      font-family: lemon;
    }
  }

@media screen and (max-width: 980px) {
 .project-box-wrapper {
    width: 50%;
  }
}
</style>

