<template>
    <div class="projects-section">
        <div class="section-head">
          <TemperatureHead ></TemperatureHead>
<!--            <TemperatureCard :data_store="amplifier_store" :/>-->
<!--            <div>fdsfdf</div>-->
<!--            <EnableOff/>-->


<!--            <RingVariationCard childname="Amplifier" property="amplifier" value="20"></RingVariationCard>-->
        </div>
        <div class="project-boxes jsGridView">
            <ShowCard :CardLabel="ModuleName" name="ONE"/>
            <ShowCard :CardLabel="ModuleName" name="TWO"/>
            <ShowCard :CardLabel="ModuleName" name="THREE"/>
            <!-- <ShowCard CardLabel="LASER_TWO"/> -->
        </div>
    </div>
</template>

<script setup>
    import ShowCard from './Card/card.vue';
    import TemperatureHead from './CardHead/TemperatureCard.vue'
    import { PageLocationStateEnum, usePageLocationState,PageModulesNames } from '@/api/pageLocation'
    const { setCurrentPageLocationState, getCurrentPageLocationState} = usePageLocationState();
    import { onMounted,ref } from 'vue';

    const ModuleName = ref(PageModulesNames.Amplifier);

    onMounted (()=>{
      setCurrentPageLocationState(PageLocationStateEnum.Amplifier); // set current page location as amplifier
    })
</script>
<style lang="css" scoped>

.projects-section {
  width: 100%;
  height: 100%;

  .section-head{
    justify-content: space-around;
    display: flex;
    align-items: center;
  }
}
  
  .project-boxes  {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;

  }
</style>