<template>
  <div class="projects-section">
    <div class="section-body">
      <powerMonitor />
    </div>

  </div>
</template>

<script setup>
// import CardHead from './CardHead/cardhead.vue'
// import ParamsSettingPannel from "./Setting/paramsSettingPannel.vue";
// import ListShowCase from "./listShowcase/listShowCase.vue";
import {computed, onMounted, ref, unref} from 'vue';
import powerMonitor from './monitor/powerMonitor.vue'
// 页面位置 和 页面 module
import { PageLocationStateEnum, usePageLocationState,PageModulesNames } from '@/api/pageLocation'

const { setCurrentPageLocationState, getCurrentPageLocationState} = usePageLocationState();

const ModuleName = ref(PageModulesNames.Manager);
onMounted (()=>{
  setCurrentPageLocationState(PageLocationStateEnum.Manager); // set current page location as Manager
})
</script>


<style lang="scss" scoped>
.projects-section {
  width: 100%;
  height: 100%;

  .section-body  {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

  }
}
</style>
