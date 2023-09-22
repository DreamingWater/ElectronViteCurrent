
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
    </div>
</template>


<!-- <template> 
  <Back />
</template>  -->
<script setup lang="ts">
    // import Back from "@/components/section/back.vue"
    // import Back from "@/components/section/testbutton.vue"
    import Back from "@/components/animation/ShowFoldLine.vue"
    import HeaderSection from "@/components/section/HeaderSection.vue";
    import SiderSection from "@/components/section/SiderSection.vue";
    import LeftSection from "@/components/section/LeftSection.vue";
    import MainContent from "@/components/section/MainContent.vue";
    import TitleBar from "@/components/section/TitleBar.vue";
    import FooterSection from "@/components/section/FooterSection.vue";
    // import TitleBar from "@/components/HelloWorld.vue";
    // websocket
    import { websockt_start } from '@/utils/WebsocketFunc'
    websockt_start();
    
</script>

<style lang="css" scoped>
@charset "UTF-8";
@import url("https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap");



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