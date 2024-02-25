<template>
    <div class="card-box-warpper">
      <RingVariationCard :name="CardLabel" :data_store="temperature_store" :store_getter_key="show_working_temperature_data" />
      <RingVariationCard :name="CardLabel" :data_store="temperature_store" :store_getter_key="show_sample_temperature_data" />
      <EnableOff :CardLabel="CardLabel" />
    </div>
</template>

<script lang='ts' setup>
import { ref,onMounted, watch } from 'vue'
  import RingVariationCard from "@/components/showContent/RingVariationCard.vue";
  import EnableOff from "@/components/ButtonContent/EnableOff.vue";
  import { TemperatureSettingDataModel, TemperatureGettingDataModel } from '@/types/temperature';
    import { useTemperatureGroupStore } from "@/store/temperatureGroup";
    const temperature_store = useTemperatureGroupStore();       // store


    // 父子接口
    const props = defineProps({
      CardLabel: { type: String, default: true },
    });


    const show_sample_temperature_data:TemperatureGettingDataModel = {
      data_type: 'SamplingTemperature',
    }
    // 设定到下位机的的温度
    const show_working_temperature_data:TemperatureGettingDataModel = {
      data_type: 'WorkingTemperature',
    }



</script>

<style lang="scss" scoped>

    @charset "UTF-8";
    @import url("https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap");
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

