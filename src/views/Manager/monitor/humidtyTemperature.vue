<template>
  <div class="container">
    <h1 style="color: #747e7d">温湿度监控</h1>
    <div class="showcase_list">
      <div class="showcase-item" v-for="(item, index) in showcaseItems" :key="index">
        <div class="showcase_name">
          {{ item.name }}
        </div>
        <div class="showcase_value">
          <ValueShow :store_getter_key="item.getterKey" :data_store="monitor_store" ></ValueShow>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue' ;
import ValueShow from "@/components/showContent/ValueShow.vue";
import {useMonitorStore} from "@/store/monitorGroup";

const monitor_store = useMonitorStore();       // store

const showcaseItems = [
  { name: '热沉 温度(℃)', getterKey: { data_type: 'HeatTemperature' } },
  { name: '热沉 湿度（%)', getterKey: { data_type: 'HeatHumidity' } },
  { name: '外部 温度(℃)', getterKey: { data_type: 'OuterTemperature' } },
  { name: '外部 湿度（%)', getterKey: { data_type: 'OuterHumidity' } },
];


</script>



<style scoped lang="scss">
.container {
  font-size: 10px;

}
.showcase_list {
  display: flex;
  flex-direction: column;
  //align-items: stretch; // Make items stretch to full width
  margin-top: 10px;
  padding: 10px 5px;
  border-radius: 3px;
  //background-color: #f1eaf1;
  background-image: linear-gradient(89deg, #f1eaf1 0%, #d0e2e4 100%);
  height: fit-content;
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
      color: orchid;
      font-size: larger;
      min-width: 50px;
      margin-left: 20px;
      text-align: right; // Align text to the right
    }
  }
}
</style>