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
            <ShowCard CardLabel="Amplifier_ONE"/>
            <ShowCard CardLabel="Amplifier_TWO"/>
            <ShowCard CardLabel="Amplifier_THREE"/>
            <!-- <ShowCard CardLabel="LASER_TWO"/> -->
        </div>
    </div>
</template>

<script setup>
    import ShowCard from './Card/card.vue';
    import TemperatureHead from './CardHead/TemperatureCard.vue'
    // import TemperatureShow from "";
    import EnableOff from "@/components/ButtonContent/EnableOff.vue";
    import TemperatureCard from "@/components/showContent/TemperatureCard.vue";
    import RingVariationCard from "@/components/showContent/RingVariationCard.vue";
    import { PageLocationStateEnum, usePageLocationState } from '@/api/pageLocation'
    const { setCurrentPageLocationState, getCurrentPageLocationState} = usePageLocationState();
    import { onMounted } from 'vue';

    import { useAmplifierGroupStore } from "@/store/amplifierGroup";
    // import {  AmplifierSettingDataModel,AmplifierGettingDataModel } from '@/types/amplifier';


    const amplifier_store = useAmplifierGroupStore();       // store


    onMounted (()=>{
      setCurrentPageLocationState(PageLocationStateEnum.Amplifier);
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