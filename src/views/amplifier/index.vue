<template>
    <div class="projects-section">
        <div class-section-head>
            <TemperatureCard :CardLabel="CardLabel"/>
        </div>
        <div class="project-boxes jsGridView">
            <ShowCard CardLabel="Amplifier_ONE"/>
            <ShowCard CardLabel="Amplifier_TWO"/>
            <ShowCard CardLabel="Amplifier_THREE"/>
            <!-- <ShowCard CardLabel="LASER_TWO"/> -->
        </div>
    </div>
</template>

<script setup>
    import ShowCard from './Card/card.vue';
    import TemperatureCard from './CardHead/TemperatureCard.vue'
    import {PageStateEnum, useCurrentPageState } from '@/views/data'
    const { setCurrentPageState, getCurrentPagestate} = useCurrentPageState();
    import { onMounted } from 'vue'; 
    onMounted (()=>{
      setCurrentPageState(PageStateEnum.Amplifier);
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
    justify-content: space-evenly;

  }
</style>