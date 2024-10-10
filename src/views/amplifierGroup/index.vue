<template>
    <div class="projects-section">
        <div class="section-head">
          <Cardhead :module_name="ModuleName" name="Amplifier" ></Cardhead>
       </div>
        <div class="section-body">
            <AmplifierCard :module_name="ModuleName" name="Amplifier" proto_type="ONE" card_name="PreAmplifier"  :max_value="AmplifierConfig.ONE" v-if="channel_one" />
            <AmplifierCard :module_name="ModuleName" name="Amplifier" proto_type="TWO" card_name="Amplifier1rt" :max_value="AmplifierConfig.TWO" v-if="channel_two"/>
            <!--            <AmplifierCard :module_name="ModuleName" name="Amplifier" proto_type="THREE" card_name="Amplifier2nd"/>-->
            <AmplifierCard :module_name="ModuleName" name="Amplifier" proto_type="THREE" card_name="PowerAmplifier"  :max_value="AmplifierConfig.THREE" v-if="channel_three" />

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
    const showCard= ref(true);     // 显示卡片还是显示pid的参数框框
    import { onMounted,ref ,computed} from 'vue';
    import get_control_config_based_version from "@/api/Versions/VersionControl";

    const ModuleName = ref(PageModulesNames.Amplifier);
    const AmplifierConfig = ref(null);
    const channel_one = computed(()=>AmplifierConfig.value?.ONE);
    const channel_two = computed(()=>AmplifierConfig.value?.TWO);
    const channel_three = computed(()=>AmplifierConfig.value?.THREE);
    const toggleShowCard = () => {
      showCard.value = !showCard.value;
    }
    onMounted (()=>{
      setCurrentPageLocationState(PageLocationStateEnum.Amplifier); // set current page location as amplifier
      // 获取控制目标的sms，然后配置放大器页面
      const target_config_object = get_control_config_based_version(localStorage.getItem('control_device_sms'));
      console.log(target_config_object);
      if(target_config_object){
        AmplifierConfig.value = target_config_object.Amplifier;
        //console.log('AmplifierConfig',AmplifierConfig.value);
      }
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