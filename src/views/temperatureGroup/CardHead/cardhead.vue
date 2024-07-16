<template>
    <div class="card-box-warpper">
      <RingVariationCard name="Setting T(℃)" :data_store="temperature_store" :store_getter_key="show_working_temperature_data" />
      <RingVariationCard name="Sample T(℃)" :data_store="temperature_store" :store_getter_key="show_sample_temperature_data" />
      <EnableOff :module_name="module_name" :name="name"  :data_store="temperature_store"  :data_package="send_data_package" :store_key="enable_status"/>
    </div>
</template>

<script lang='ts' setup>
  import { ref, onMounted, watch } from 'vue'
  import RingVariationCard from "@/components/showContent/RingVariationCard.vue";
  import EnableOff from "@/components/ButtonContent/EnableOff.vue";
  import { TemperatureSettingDataModel, TemperatureGettingDataModel } from '@/types/temperature';
  import { useTemperatureGroupStore } from "@/store/temperatureGroup";

  const temperature_store = useTemperatureGroupStore();       // store
    // 父子接口
    const props = defineProps({
      module_name: { type: null, required: true },
      name: { type: String, default: 'None-name' },
    });

    const show_sample_temperature_data:TemperatureGettingDataModel = {
      data_type: 'SamplingTemperature',
    }
    // 设定到下位机的的温度
    const show_working_temperature_data:TemperatureGettingDataModel = {
      data_type: 'WorkingTemperature',
    }
    const enable_status:TemperatureSettingDataModel = {
      data_type: 'EnableStatus',
      value:1,
    }
const send_data_package = ref([]); // 发送的数据包
</script>

<style lang="scss" scoped>

    @charset "UTF-8";
    .card-box-warpper {
        width: 100%;
        min-height: 100px;
        border-radius: 10px;
        border: dotted 1px rgb(211, 209, 209);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 0;
        justify-content: space-evenly;
    }
</style>

