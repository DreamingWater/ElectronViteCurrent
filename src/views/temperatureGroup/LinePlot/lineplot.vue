<template>
  <G2LinePlot
      name="temperature_show_line"
      :data_store="temperature_store"
      :store_target_List_getter_key="show_sample_temperature_list_data"
      :store_baseline_getter_key="show_working_temperature_data"
  />
</template>

<script lang='ts' setup>
  import G2LinePlot from "@/components/showContent/G2LinePlot.vue";
  import { ref } from 'vue';
  import { TemperatureSettingDataModel, TemperatureGettingDataModel } from '@/types/temperature';
  import { useTemperatureGroupStore } from "@/store/temperatureGroup";
  const temperature_store = useTemperatureGroupStore();       // store

  const show_sample_temperature_list_data:TemperatureGettingDataModel = {
    data_type: 'SamplingTemperatureList',
  };
  const show_working_temperature_data:TemperatureGettingDataModel = {
    data_type: 'WorkingTemperature',
  };

</script>
  <style lang="scss" scoped>
  </style>