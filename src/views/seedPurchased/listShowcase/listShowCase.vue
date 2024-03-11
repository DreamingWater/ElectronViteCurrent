<template>
  <div class="showcase_list">
    <div class="showcase-item" v-for="(item, index) in showcaseItems" :key="index">
      <div class="showcase_name">
        {{ item.name }}
      </div>
      <div class="showcase_value">
        <ValueShow :store_getter_key="item.getterKey" :data_store="seed_purchased_store" ></ValueShow>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue' ;
    import ValueShow from "@/components/showContent/ValueShow.vue";
    import { useSeedPurchasedStore } from "@/store/seedPurchased";

    import {  SeedPurchasedSettingDataModel,SeedPurchasedGettingDataModel } from '@/types/seedPurchased';

    const seed_purchased_store = useSeedPurchasedStore();       // store

    const showcaseItems = [
      { name: '模块温度(℃)',    getterKey: { data_type: 'TemperatureModule' } },
      { name: '泵浦 1 温度(℃)', getterKey: { data_type: 'TemperatureOne' } },
      { name: '泵浦 2 温度(℃)', getterKey: { data_type: 'TemperatureTwo' } },
      { name: '泵浦 1 电流(mA)', getterKey: { data_type: 'CurrentOne' } },
      { name: '泵浦 2 电流(mA)', getterKey: { data_type: 'CurrentTwo' } },
      { name: '输出光功率(mW)' ,  getterKey: { data_type: 'SamplePower' } },
    ];


</script>



<style scoped lang="scss">
.showcase_list {
  display: flex;
  flex-direction: column;
  //align-items: stretch; // Make items stretch to full width
  margin: 5px;
  padding: 10px 5px;
  border-radius: 3px;
  background-color: #f9f9fa;

  .showcase-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between; // Space between name and value
    align-items: center;
    margin: 0;
    padding: 5px;
    font-size: 20px;
    .showcase_name {
      margin-top: 5px;

      color: rgb(250, 138, 138);
      text-align: left; // Align text to the left
    }

    .showcase_value {
      margin-left: 20px;
      text-align: right; // Align text to the right
    }
  }
}
</style>