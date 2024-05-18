
<template>
    <div class="app-container">
      <TitleBar></TitleBar>
      <HeaderSection />
      <div class="app-content">
            <SiderSection />
            <LeftSection />
            <div class="main-content-section">
              <!-- <MainContent /> -->
              <router-view/>
            </div>
      </div>
      <FooterSection />
    </div>
</template>


<!-- <template> 
  <Back />
</template>  -->
<script setup lang="ts">
// @ts-nocheck
// import {ref, onMounted} from 'vue';
    // const add_script = (script_src:string)=>{
    //   let script = document.createElement('script');
    //   script.type = 'text/javascript';
    //   script.src = script_src;
    //   document.body.appendChild(script);
    // }

    import HeaderSection from "@/views/sections/header/index.vue";
    import SiderSection from "@/views/sections/sidersection/index.vue";
    import LeftSection from "@/views/sections/leftsection/index.vue";
    import TitleBar from "@/views/sections/title/index.vue";
    import FooterSection from "@/views/sections/footer/index.vue";

    import { useAmplifierGroupStore } from "@/store/amplifierGroup";
    import { useSeedPurchasedStore} from "@/store/seedPurchased";
    import { Manager } from "@/managements/manager";

    const amplifier_store = useAmplifierGroupStore();       // store
    const seed_store = useSeedPurchasedStore();       // store

    const manager = new Manager(seed_store,amplifier_store);
    manager.checkAmplifierPower();
// onMounted(()=>{
    //   add_script('/src/preload/serialControl.ts')
    //   add_script('/src/preload/render.js')
    // })
</script>

<style lang="css" scoped>
@charset "UTF-8";

:root {
  --app-container: #f5f5f5;
}
button, a {
  cursor: pointer;
}

.app-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--app-container);
  transition: 0.2s;
  max-width: 1800px;
}
.app-container  {
  font-family: "DM Sans", sans-serif;
}
.app-content {
  display: flex;
  height: 100%;
  overflow: hidden;
  padding: 16px 24px 24px 0;
}

.main-content-section {
  flex: 2;
  /* background-color: var(--projects-section); */
  border-radius: 32px;
  padding: 32px 32px 0 32px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}



</style>