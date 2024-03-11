<template>
  <div class="projects-section">
    <div class="section-head">
      <CardHead :module_name="ModuleName" />
    </div>

    <div class="section-body">
        <ParamsSettingPannel name="seed_purchased_setting_panel" :module_name="ModuleName" />
        <ListShowCase > </ListShowCase>
    </div>
  </div>
</template>

<script setup>
    import CardHead from './CardHead/cardhead.vue'
    import ParamsSettingPannel from "./Setting/paramsSettingPannel.vue";
    import ListShowCase from "./listShowcase/listShowCase.vue";
    import {computed, onMounted, ref, unref} from 'vue';

    // 页面位置 和 页面 module
    import { PageLocationStateEnum, usePageLocationState,PageModulesNames } from '@/api/pageLocation'

    const { setCurrentPageLocationState, getCurrentPageLocationState} = usePageLocationState();

    const ModuleName = ref(PageModulesNames.SeedPurchased);
    onMounted (()=>{
      setCurrentPageLocationState(PageLocationStateEnum.SeedPurchased); // set current page location as amplifier
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
