<template>
    <div class="projects-section">
      <div class-section-head>
            <CardHead CardLabel="Tec_One"/>
        </div>

      <div class="project-boxes jsGridView">
          <SettingValue CardLabel="Tec_One"/>
          <LinePlot > </LinePlot>
          <!-- <LinePlot childname="Tec_One"> </LinePlot> -->
          <!-- <ShowCard CardLabel="LASER_TWO"/> -->
      </div>
    </div>
</template>

<script setup>
    import SettingValue from '@/views/temperature/Setting/setting.vue';
    import CardHead from './CardHead/cardhead.vue'
    import LinePlot from './LinePlot/g2myplot.vue'
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