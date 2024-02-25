<template>
    <div class="card-box-warpper">
        <div class="left-box">
               <div class="temperature">
                <TemperatureCard :data_store="amplifier_store" :store_getter_key="test_data_2" />
               </div>
        </div>
        <div class="middle-box">
               <div class="status-box">
                <div class="status">
                    {{ working_status }}
                </div> 
            </div>
        </div>
        <div class="right-box">
               <div class="status-box">
                <div class="status">
                  <CirlceButton />
                </div> 
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup>
    import TemperatureCard from "@/components/showContent/TemperatureCard.vue";
    import CirlceButton from   '@/components/animation/circleButton.vue'
    import { ref,onMounted, watch } from 'vue'
    import { useAmplifierStore } from "@/store/Amplifier";
    // import {AmplifierGettingDataModel} from "@/types/amplifier";
    const store = useAmplifierStore();       // store
    const StautsArray = ['Perfect well' , 'An Error Check!!!']
    const working_status = ref('Perfect well')
    // 父子接口
    const props = defineProps({
      CardLabel: { type: String, default: true },
    });

    import { useAmplifierGroupStore } from "@/store/amplifierGroup";
    import {  AmplifierSettingDataModel,AmplifierGettingDataModel } from '@/types/amplifier';


    const amplifier_store = useAmplifierGroupStore();       // store
    const test_data_2:AmplifierGettingDataModel = {
      data_type: 'Temperature',
    }


    const show_temperature_value = ref(20); // 用于显示的温度

    watch(() => store.getTargetWorkingStatus(),
        (newVal, oldVal) => {
            if(newVal!== 0 ){
                working_status.value = StautsArray[1];
          }
         else if(newVal === 0){
            working_status.value = StautsArray[0];
         }
        }
       
      );

</script>

<style lang="scss" scoped>

    @charset "UTF-8";
    @import url("https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap");
    .card-box-warpper {
        width: 100%;
        min-height: 100px;
        border-radius: 5px;
        border: dotted 1px rgb(211, 209, 209);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 0;
        .left-box{

            margin-left: 20px;
            // border-radius: 3px;
            justify-content: center;
            // border-style: dotted;
            // border-color: antiquewhite;
            width: 20%;
            height: 100%;
            .temperature{
                width: 100%;
                height: 100%;
            }
        }
        .middle-box{
            width: 40%;
            height: 100%;
       
            margin-right: 20px;
          
  
            .status-box{
                height: 80px;
                background-color: rgb(255, 255, 255);
                display: flex;
                align-content: center;
                justify-content: center;
                align-items: center;
                border-radius: 3px;
                border-style: dotted;
                border-color: antiquewhite;
                .status{
                    font-size: 30px;
                    color:rgb(223, 126, 126);
                    
                }
            }
            
        }
        .right-box{
            width: 25%;
            height: 100%;
            .status-box{
                height: 80px;
                display: flex;
                align-content: center;
                justify-content: center;
                align-items: center;

                .status{
                    font-size: 25px;
                }
            }
        }
    }
</style>

