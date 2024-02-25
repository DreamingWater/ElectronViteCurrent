<template>
    <div class="projects-section">
      <div class="section-head">
            <CardHead CardLabel="Tec_One"/>
        </div>

      <div class="section-body">
          <SettingValue CardLabel="Tec_One"/>
          <LinePlot > </LinePlot>
      </div>
    </div>
</template>

<script setup>
    import SettingValue from './Setting/setting.vue';
    import CardHead from './CardHead/cardhead.vue'
    import LinePlot from './LinePlot/lineplot.vue'
    import { onMounted,ref } from 'vue';

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
        justify-content: space-evenly;

      }
  }
</style>
