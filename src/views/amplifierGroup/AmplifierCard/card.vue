<template>
    <div class="project-box-wrapper">

        <div class="section_card">
            <div class="card-head">
                {{card_name}}
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
                <div class="title_working_value">
                    <div class="title">Power(mW)</div>
                    <div class="working_value">
                      <ValueShow :store_getter_key="show_power_data" :data_store="amplifier_store"></ValueShow>
                    </div>
                </div>
                <div class="set_value" >
                    <InputBox  :data_store="amplifier_store" :store_setting_key="set_power_data" :store_getter_key="show_power_data" :min_value="min_value" :max_value="max_value"/>
                </div>
            </div>
            
            <div class="card-button">
              <SendAirPlane :name="name" :proto_type='proto_type' :module_name="module_name" :data_store="amplifier_store" :data_package="packaged_send_data"/>
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup>
   // @ts-nocheck
   import {computed, ref} from "vue";
    import InputBox from "@/components/TextBox/InputBox.vue";
    import ValueShow from "@/components/showContent/ValueShow.vue";
    import SendAirPlane from "@/components/ButtonContent/SendAirPlane.vue";

   // 父子接口
   const props = defineProps({
     module_name: { type: null, required: true },
     name: { type: String, default: 'None-name' },
     proto_type:{type: String, default: 'None-type'},  // proto_type 可以是 ONE TWO THREE
     card_name: { type: String, default: 'None-name' },

   });
   const min_value = ref(0);
   const valueMap = {
     'ONE': 20000,
     'TWO': 10,
     'THREE': 40000
     
   };
   const max_value:number = computed(()=>{
     return valueMap[props.proto_type]
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
     channel_name: props.proto_type as string,
     value_model:'SetPower',
   };
   const show_power_data:AmplifierGettingDataModel = {
     data_type: 'PowerCurrent',
     channel_name:  props.proto_type as string,
     value_model: 'WorkingPower'
   };

   // @ts-nocheck
   const show_current_data:AmplifierGettingDataModel = {
     data_type: 'PowerCurrent',
     channel_name:  props.proto_type as string,
     value_model: 'Current'
   };
   const packaged_send_data = ref([
       [show_power_data,set_power_data,3000]
   ])

</script>

<style lang="scss" scoped>

@charset "UTF-8";

button, a {
  cursor: pointer;
}

.project-box-wrapper {
    margin: 5px;
    padding: 20px 5px;
    transition: 0.2s;
  .section_card{

    margin: 5px;
    padding: 20px 25px;
    border-radius: 5px;
    background-color: #f9f9fa;
    .card-head{
        color: red;
        font-style: italic;
        font-size: 20px;
        font-weight: bold;
   
    }
    .card-input {
        margin-top: 10px;
        background-color: #f0f8f8;
        padding: 10px 10px;
        border-radius: 3px;
    

        display: flex;
        flex-direction: column;
        align-items: flex-start;
      .title_working_value{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .title{
          font-size: 22px;
          color: rgb(250, 138, 138);
          justify-content: center;
          text-align: center;
          //float: left;
        }
        .working_value{
          font-size: 16px;
          font-style: italic;
        }
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

