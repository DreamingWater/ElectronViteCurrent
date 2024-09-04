<script setup lang="ts">
import {computed, ref, unref} from 'vue';
import {PageLocationStateEnum, usePageLocationState} from "@/api/pageLocation";
import {getStoreByPageLocation} from "@/store/SerialGroup";
import {SerialGettingDataModel} from "@/types/serial";
const { setCurrentPageLocationState, getCurrentPageLocationState } = usePageLocationState();

const isLoading = ref(true);

function startLoading() {
  isLoading.value = true;
}

function stopLoading() {
  isLoading.value = false;
}


// 解构对应的 serial _store
const current_control_page = computed(() => unref(getCurrentPageLocationState));

const get_working_status = computed(() => {
  const store_result = getStoreByPageLocation(current_control_page.value);
  const serial_store = store_result.store();
  const get_Open_status:SerialGettingDataModel = {
    'data_type' :'WorkingStatus'
  }
  return serial_store.getTargetParameter(get_Open_status)!==1; // === 1 暂停，否者启动loader
});
</script>

<template>
  <div class="watercooling">
    <div class="loader" :class="{ paused: get_working_status }">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<style scoped lang="css">

.watercooling {
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);

}

.loader {
  width: 16em;
  height: 8em;
  position: relative;
  overflow: hidden;
}

.loader::before,
.loader::after {
  content: '';
  position: absolute;
  bottom: 0;
}

.loader::before {
  width: inherit;
  height: 0.2em;
  background-color: hsl(0, 4%, 31%);
}

.loader::after {
  box-sizing: border-box;
  width: 50%;
  height: inherit;
  border: 0.2em solid hsl(0, 4%, 31%);
  border-radius: 50%;
  left: 25%;
}

.loader span {
  position: absolute;
  width: 5%;
  height: 10%;
  background-color: #292121;
  border-radius: 50%;
  bottom: 0.2em;
  left: -5%;
  animation: 2s linear infinite;
  transform-origin: 50% -3em;
  animation-name: run, rotating;
}

.loader span:nth-child(2) {animation-delay: 0.075s;}
.loader span:nth-child(3) {animation-delay: 0.15s;}

@keyframes run {
  0% {left: -5%;}
  10%, 60% {left: calc((100% - 5%) / 2);}
  70%, 100% {left: 100%;}
}

@keyframes rotating {
  0%, 10% {transform: rotate(0deg);}
  60%, 100% {transform: rotate(-1turn);}
}

.loader.paused span {
  animation-play-state: paused;
}
</style>