<template>
  <div class="window-title">
    <!-- 软件logo预留位置 -->
    <div style="-webkit-app-region: drag" class="logo">
<!--      <img :src="SchoolLogo" alt="School Logo" style="height: 100%;width: 350px" />-->
      <div style="display: flex; align-items: center; height: 100%;">
        <img data-v-17f21bb2="" src="/src/assets/imgs/large-scalescientificfacility.png" alt="School Logo" style="width: 300px" >
      </div>
    </div>
    <!-- 菜单栏位置 -->
    <div></div>
    <!-- 中间标题位置 -->
    <div style="-webkit-app-region: drag" class="title"></div>
    <div class="controls-container">
      <div class="windows-icon-bg" @click="Mini">
        <img src="@/assets/svg/mini.svg" class="icon-size" />
      </div>
      <div class="windows-icon-bg" @click="MixOrReduction">
        <img
          v-if="mix"
          src="@/assets/svg/reduction.svg"
          class="icon-size"
        />
        <img
          v-else
          src="@/assets/svg/mix.svg"
          class="icon-size"
        />
      </div>
      <div class="windows-icon-bg close-icon" @click="Close">
        <img src="@/assets/svg/close.svg" class="icon-size" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import {computed, ref} from "vue";
import SchoolLogo from "@/assets/imgs/large-scalescientificfacility.png";


const imageSrc = computed(() => {
  return SchoolLogo; // 大装置的logo
});

const IsUseSysTitle = ref(false);
const mix = ref(false);

const Mini = () => {
  setMinWindow();
  // window.RenderApi.minWindow();
};
const MixOrReduction = () => {
  setMaxWindow();
  // window.RenderApi.maxWindow().then((res) => {
  //   mix.value = res.status;
  // });
};
const Close = () => {
  setCloseWindow();
  // window.RenderApi.closeWindow();
};


// 用于在关闭electron时候关闭后端python
// window.RenderApi.handleCounter(
//     (event, value) => {
//       console.log('receive shutdown signal');
//       websocket_send(SendMessageType.ShutDownPython,'');
//     }
// )

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.window-title {
  width: 100%;
  height: 40px;
  line-height: 30px;
  display: flex;
  -webkit-app-region: drag;
  // position: fixed;
  align-items: center;
  top: 0;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  // z-index: 99999;
  .icon-logo {
    // margin-left: 0 !important;
    width: 2em;
    height: 2em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .title {
    align-items: center;
    margin-left: 5px;
    text-align: center;
    font-family:'Times New Roman', Times, serif;
    font-style: italic;
  }
  .logo {
    margin-left: 5px;
  }
  .controls-container {
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    text-align: center;
    position: relative;
    // z-index: 3000;
    -webkit-app-region: no-drag;
    height: 100%;
    width: 138px;
    margin-left: auto;
    .windows-icon-bg {
      display: inline-block;
      -webkit-app-region: no-drag;
      height: 100%;
      width: 33.34%;
      color: rgba(129, 129, 129, 0.6);
      .icon-size {
        width: 12px;
        height: 15px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
      }
    }
    .windows-icon-bg:hover {
      background-color: rgba(182, 182, 182, 0.2);
      color: #333;
    }
    .close-icon:hover {
      background-color: rgba(232, 17, 35, 0.9);
      color: #fff;
    }
  }
}
</style>
