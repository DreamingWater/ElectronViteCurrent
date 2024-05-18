<template>
    <div class="projects-section">
        <div class="section-head">
          <Cardhead :module_name="ModuleName" name="Amplifier" ></Cardhead>
       </div>
        <div class="section-body">
<!--            <AmplifierCard :module_name="ModuleName" name="Amplifier" proto_type="ONE"/>-->
            <AmplifierCard :module_name="ModuleName" name="Amplifier" proto_type="TWO" card_name="PreAmplifier"/>
            <AmplifierCard :module_name="ModuleName" name="Amplifier" proto_type="THREE" card_name="PowerAmplifier"/>
            <!-- <ShowCard CardLabel="LASER_TWO"/> -->
        </div>
    </div>
</template>

<script setup>
    import Cardhead from "./CardHead/cardhead.vue";
    import AmplifierCard from './AmplifierCard/card.vue';
    import { PageLocationStateEnum, usePageLocationState,PageModulesNames } from '@/api/pageLocation'
    const { setCurrentPageLocationState, getCurrentPageLocationState} = usePageLocationState();
    import { onMounted,ref } from 'vue';

    const ModuleName = ref(PageModulesNames.Amplifier);

    onMounted (()=>{
      setCurrentPageLocationState(PageLocationStateEnum.Amplifier); // set current page location as amplifier
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
        justify-content: space-around;
      }
  }
  

</style>