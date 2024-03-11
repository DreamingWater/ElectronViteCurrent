<template>
  <div class="project-box-wrapper">
    <div class="section_card">
      <ShowInput
          v-for="(item, index) in show_data_list"
          :key="index"
          :name="item.name"
          :data_store="seed_purchased_store"
          :show_data="item.show_data"
          :set_data="item.set_data"
          :max_value="item.max_value"
          :min_value="item.min_value"
          :precision="item.precision"
      />
      <div class="card-button">
        <SendAirPlane :name="name" proto_type='send-button' :module_name="module_name" :data_store="seed_purchased_store" :data_package="packaged_send_data"/>
      </div>
    </div>
  </div>
</template>


<script lang='ts' setup>
  // @ts-nocheck
  import { ref } from 'vue' ;
  import SendAirPlane from "@/components/ButtonContent/SendAirPlane.vue";
  import ShowInput from "@/components/Items/ShowInput.vue";

  import { useSeedPurchasedStore } from "@/store/seedPurchased";
  import {  SeedPurchasedSettingDataModel,SeedPurchasedGettingDataModel } from '@/types/seedPurchased';
  const seed_purchased_store = useSeedPurchasedStore();       // store


  const props = defineProps({
    module_name: { type: null, required: true },
    name: { type: String, default: 'none-Name' },
  });

  /////////// 显示数值区间 begin //////////////////////////

  // 显示的数值  下位机的设定温度  设定的P I D
  const show_working_power:SeedPurchasedGettingDataModel = {
    data_type: 'WorkingPower',
  };
  const show_working_wavelength:SeedPurchasedGettingDataModel = {
    data_type: 'WorkingWavelength',
  };

  // 设置的数值  希望发送的设定温度  希望发送的设定的P I D
  const set_power_data:SeedPurchasedSettingDataModel = {
    data_type: 'SetPower',
    value: 0,
  };
  const set_wavelength_data:SeedPurchasedSettingDataModel = {
    data_type: 'SetWavelength',
    value: 0,
  };
  /////////// 设定的数值区间 end //////////////////////////

  const show_data_list = [
    {
    'name': '设定功率(mw)',
    'show_data': show_working_power,
    'set_data': set_power_data,
    'min_value':0,
    'max_value':40000,
      'precision': 2,
  },
    {
      'name': '设定波长(nm)',
      'show_data': show_working_wavelength,
      'set_data':set_wavelength_data ,
      'min_value':1539.80,
      'max_value':1540.65,
      'precision': 3,
    }
  ]

const packaged_send_data = ref([
      [show_working_power,set_power_data,5000],
      [show_working_wavelength,set_wavelength_data,0],
]); // send button 发送的数据包


  /////////// 设定的数值 end //////////////////////////


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

