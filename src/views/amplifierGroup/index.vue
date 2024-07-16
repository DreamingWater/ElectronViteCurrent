<template>
    <div class="projects-section">
        <div class="section-head">
          <Cardhead :module_name="ModuleName" name="Amplifier" ></Cardhead>
       </div>
        <div class="section-body">
<!--            <AmplifierCard :module_name="ModuleName" name="Amplifier" proto_type="ONE"/>-->
            <AmplifierCard :module_name="ModuleName" name="Amplifier" proto_type="TWO" card_name="PreAmplifier"/>
            <AmplifierCard :module_name="ModuleName" name="Amplifier" proto_type="THREE" card_name="PowerAmplifier"/>
          <template v-if="showCard" >
            <GiantSquid  @click="toggleShowCard"></GiantSquid>
          </template>
          <template v-else>
            <controlSetting :module_name="ModuleName" name="Amplifier" ></controlSetting>
          </template>

          <!-- <ShowCard CardLabel="LASER_TWO"/> -->
        </div>
    </div>
</template>

<script setup>
    import Cardhead from "./CardHead/cardhead.vue";
    import AmplifierCard from './AmplifierCard/card.vue';
    import controlSetting from './ControlCard/controlSetting.vue';
    import GiantSquid from "@/components/showContent/giantSquid.vue";
    import { PageLocationStateEnum, usePageLocationState,PageModulesNames } from '@/api/pageLocation'
    const { setCurrentPageLocationState, getCurrentPageLocationState} = usePageLocationState();
    const showCard= ref(false);     // 显示卡片还是显示pid的参数框框
    import { onMounted,ref } from 'vue';

    const ModuleName = ref(PageModulesNames.Amplifier);
    const toggleShowCard = () => {
      showCard.value = !showCard.value;
    }
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
        align-items: center;
      }
  }
  

</style>