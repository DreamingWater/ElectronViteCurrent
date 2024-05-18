<template>
  <div class="project-box-wrapper">
    <div class="section_card">
      <ShowInput
          v-for="(item, index) in show_data_list"
          :key="index"
          :name="item.name"
          :data_store="temperature_store"
          :show_data="item.show_data"
          :set_data="item.set_data"
          :min_value="item.min_value"
          :max_value="item.max_value"
      />
<!--      <RadioBox name="temperature_radio" :data_store="temperature_store"-->
<!--                :store_getter_key="show_heater_cooler_data"-->
<!--                :store_setting_key="set_heater_cooler_data"/>-->
      <div class="card-button">
        <SendAirPlane :name="name" proto_type='send-button' :module_name="module_name" :data_store="temperature_store" :data_package="packaged_send_data"/>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
  // @ts-nocheck
  import { ref,reactive,onMounted ,watch} from 'vue' ;
  import SendAirPlane from "@/components/ButtonContent/SendAirPlane.vue";
  import ShowInput from "@/components/Items/ShowInput.vue";
  import RadioBox from "@/components/TextBox/RadioBox.vue";
  import { TemperatureSettingDataModel, TemperatureGettingDataModel } from '@/types/temperature';
  import { useTemperatureGroupStore } from "@/store/temperatureGroup";
  const temperature_store = useTemperatureGroupStore();       // store




  const props = defineProps({
    module_name: { type: null, required: true },
    name: { type: String, default: 'None-name' },
  });

  /////////// 显示数值区间 begin //////////////////////////

  // 显示的数值  下位机的设定温度  设定的P I D
  const show_working_temperature_data:TemperatureGettingDataModel = {
    data_type: 'WorkingTemperature',
  };
  const show_working_proportional_data:TemperatureGettingDataModel = {
    data_type: 'WorkingProportional',
  };
  const show_working_integral_data:TemperatureGettingDataModel = {
    data_type: 'WorkingIntegral',
  };
  const show_working_derivative_data:TemperatureGettingDataModel = {
    data_type: 'WorkingDerivative',
  };

  const show_heater_cooler_data:TemperatureGettingDataModel = {
    data_type: 'HeaterCoolerStatus',
  };

  // 设置的数值  希望发送的设定温度  希望发送的设定的P I D
  const set_temperature_data:TemperatureSettingDataModel = {
    data_type: 'SetTemperature',
    value: 0,
  };
  const set_proportional_data:TemperatureSettingDataModel = {
    data_type: 'SetProportional',
    value: 0,
  };
  const set_integral_data:TemperatureSettingDataModel = {
    data_type: 'SetIntegral',
    value: 0,
  };
  const set_derivative_data:TemperatureSettingDataModel = {
    data_type: 'SetDerivative',
    value: 0,
  };
  const set_heater_cooler_data:TemperatureSettingDataModel = {
    data_type: 'HeaterCoolerStatus',
    value: 0,
  };
  /////////// 设定的数值区间 end //////////////////////////

  const show_data_list = [
    {
    'name': 'TSV(℃)',
    'show_data': show_working_temperature_data,
    'set_data': set_temperature_data,
      'min_value': 0,
      'max_value': 120,
  },
    {
      'name': 'PID_P',
      'show_data': show_working_proportional_data,
      'set_data':set_proportional_data ,
      'min_value': 0,
      'max_value': 200,
    },
    {
      'name': 'PID_I',
      'show_data': show_working_integral_data,
      'set_data': set_integral_data,
      'min_value': 0,
      'max_value': 100,
    },
    {
      'name': 'PID_D',
      'show_data': show_working_derivative_data,
      'set_data': set_derivative_data,
      'min_value': 0,
      'max_value': 200,
    }
  ]

const packaged_send_data = ref([
      [show_working_temperature_data,set_temperature_data,0],
      [show_working_proportional_data,set_proportional_data,0],
      [show_working_integral_data,  set_integral_data,0],
      [show_working_derivative_data,set_derivative_data,0],
    //  [show_heater_cooler_data, set_heater_cooler_data,0]
]); // send button 发送的数据包


  /////////// 设定的数值 end //////////////////////////


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
      margin-top: 25px;
    }
  }
}

</style>

