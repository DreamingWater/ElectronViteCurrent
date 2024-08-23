<template>
  <div class="projects-section">
    <div class="section-body">
      <waterCooling />
    </div>

  </div>
</template>

<script setup>

import {computed, onMounted, ref, unref} from 'vue';
import waterCooling from './waterCooling.vue'
// 页面位置 和 页面 module
import { PageLocationStateEnum, usePageLocationState,PageModulesNames } from '@/api/pageLocation'

const { setCurrentPageLocationState, getCurrentPageLocationState} = usePageLocationState();

onMounted (()=>{
  setCurrentPageLocationState(PageLocationStateEnum.WaterCooling); // set current page location as Manager
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
