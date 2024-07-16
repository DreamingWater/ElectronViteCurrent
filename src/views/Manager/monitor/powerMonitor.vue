
<template>
  <ModyCard :data_store="monitor_store" :store_getter_key="show_monitor_backpower" />

</template>

<script setup lang="ts">
  import ModyCard from "@/components/showContent/ModyCard.vue";
  import { useMonitorStore } from "@/store/monitorGroup";
  import { MonitorGettingDataModel } from "@/types/manager";

  const monitor_store = useMonitorStore();       // store


  const show_monitor_backpower:MonitorGettingDataModel = {
    data_type: 'BackPower',
  }
</script>



<style scoped lang="scss">

</style>