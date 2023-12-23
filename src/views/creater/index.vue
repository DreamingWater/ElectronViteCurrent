<template>
    <div class="projects-section">
      <div class-section-head>
            <CardHead :CardLabel="component_name"/>
        </div>

      <div class="project-boxes jsGridView">
          <SettingValue :CardLabel="component_name"/>
          <LinePlot :childname="component_name" > </LinePlot>
          <!-- <LinePlot childname="Tec_One"> </LinePlot> -->
          <!-- <ShowCard CardLabel="LASER_TWO"/> -->
      </div>
    </div>
</template>

<script setup>
    import SettingValue from './Setting/setting.vue';
    import CardHead from './CardHead/cardhead.vue'
    import LinePlot from './LinePlot/g2myplot.vue'
    import { ref ,onMounted} from 'vue'
    import {PageStateEnum, useCurrentPageState } from '@/views/data'
    const { setCurrentPageState, getCurrentPagestate} = useCurrentPageState();
    
    const component_name = ref('Creater')
    onMounted(()=>{
      setCurrentPageState(PageStateEnum.Oscillator);
    }) 
</script>
<style lang="css" scoped>

.projects-section {
  width: 100%;
  height: 100%;
}
  
  .project-boxes  {
    width: 100%;
    height: 100%;
    display: flex;
  }
</style>