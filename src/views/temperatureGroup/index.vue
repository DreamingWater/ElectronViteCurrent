<template>
    <div class="projects-section">
      <div class="section-head">
          <CardHead :module_name="ModuleName" />
        </div>

      <div class="section-body">
          <SettingValue  name="temperature_setting_panel" :module_name="ModuleName"/>
          <LinePlot > </LinePlot>
      </div>
    </div>
</template>

<script setup>
    import SettingValue from './Setting/paramsSettingPannel.vue';
    import CardHead from './CardHead/cardhead.vue'
    import LinePlot from './LinePlot/lineplot.vue'
    import {computed, onMounted, ref, unref} from 'vue';

    // 页面位置 和 页面 module
    import { PageLocationStateEnum, usePageLocationState,PageModulesNames } from '@/api/pageLocation'
    const { setCurrentPageLocationState, getCurrentPageLocationState} = usePageLocationState();

    const ModuleName = ref(PageModulesNames.TemperaturePPLN);
    onMounted (()=>{
      setCurrentPageLocationState(PageLocationStateEnum.TemperaturePPLN); // set current page location as amplifier
    })


</script>


<style lang="scss" scoped>
  .projects-section {
    width: 100%;
    height: 100%;
      .section-head{
        justify-content: space-around;
        display: flex;
        align-items: center;
      }

      .section-body  {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;

      }
  }
</style>
