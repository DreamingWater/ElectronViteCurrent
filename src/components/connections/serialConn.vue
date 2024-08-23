<template>
  <div class="serial-con">
    <select id="port" v-model="selectedPort" required class="port_select">
      <option v-for="port in portList" :value="port">{{ port }}</option>
    </select>

    <img class="refresh"  ref="refreshIcon" src="@/assets/imgs/refresh.png" alt=""   :style="{ transform: rotateStyle }" @click="click_refresh_logo" />
    <div class="show-img">
      <img :src="imageSrc" @click="click_connect_serial">
    </div>
  </div>
</template>

<script lang="ts" setup>
  // @ts-nocheck
  import UnConnectedImg from "@/assets/imgs/unconnected.png";
  import { ref, onMounted, watch, computed, unref } from 'vue';
  import { getStoreByPageLocation } from "@/store/SerialGroup";
  import { append_serial_data_parser } from "@/api/SerialParser/index"
  import { schedulerSerial } from '@/api/scheduler/ScheSerial/schedulerPipeline';

  // 获取当前在哪个页面
  import { PageLocationStateEnum, usePageLocationState } from "@/api/pageLocation";
  import { SerialGettingDataModel } from "@/types/serial";
  import { connectAndInitializeSerial } from "@/api/SerialChooser/chooserSend"
  const { setCurrentPageLocationState, getCurrentPageLocationState } = usePageLocationState();


  const portList = ref([]);  // replace with your actual port list
  const selectedPort = ref('');
  const serial_config_port = ref(''); // serial_store里面的port
  const rotationAngle = ref(0); // 初始角度为0度

  // 解构对应的 serial _store
  const current_control_page = computed(() => unref(getCurrentPageLocationState));

  // 旋转 logo 角度
  const rotateStyle = computed(() => `rotate(${rotationAngle.value}deg)`);
  // 图标
  const imageSrc = computed(() => UnConnectedImg); // 未连接的图标

  // 图标的旋转
  function rotate_logo(): void {   // 点击刷新
                                   // 旋转90°
    rotationAngle.value += 90; // 点击时增加180度
    setTimeout(() => {
      rotationAngle.value -= 90; // 一秒后恢复初始角度
    }, 1000);
  }

  // 获取当前页面的store
  function getCurrentStore() {
    return getStoreByPageLocation(current_control_page.value).store();
  }

  // 获取指定数据类型的参数
  function getTargetParameter(dataType: string) {
    const search_key: SerialGettingDataModel = { 'data_type': dataType };
    return getCurrentStore().getTargetParameter(search_key);
  }

  // 设置默认的串口端口
  const setting_serial_port = () => {
    serial_config_port.value = getTargetParameter('Port');
    if (portList.value.length > 0) {
      // 设置选中的端口为列表中的第一个元素 或者利用默认值，前提是默认值是出现时list中
      selectedPort.value = (serial_config_port.value !== '' && portList.value.includes(serial_config_port.value)) ? serial_config_port.value : portList.value[0];
    }
    // console.log('setting_serial_port', selectedPort.value);
  };

  async function click_refresh_logo(): Promise<void> {
    // 设置端口列表
    portList.value = await listAvailablePorts(); //['COM1','COM2','COM3','COM4']; // replace with your actual port list
    rotate_logo(); // 选择logo
    // 获取默认的串口值
    setting_serial_port();
  }

  onMounted(() => {
    // 页面刷新的时候搜索串口等
    setTimeout(() => {
      click_refresh_logo();
    }, 200);
  });

  watch(() => current_control_page.value,
      (newVal, oldVal) => {
        console.log(`changed circle status ${newVal}`)
        setting_serial_port();
      }
  );

  async function click_connect_serial() {
    const serial_flag = getStoreByPageLocation(current_control_page.value).flag;
    connectAndInitializeSerial(selectedPort.value,getCurrentStore(), serial_flag,current_control_page.value)
  }


</script>

<style lang="scss" scoped>

  .serial-con{
    display: flex;
    flex-direction: row;
    align-itegetCurrentStorems: center
  }
  .port_select {
    height: 25px;
    min-width: 80px;
  }
  .show-img {
    margin-left: 20px;
    img{
      width: 50px;
      height: auto;
      border-radius: 3px;
    }
  }
  .refresh {
    margin-left: 10px;
    width: 32px;
    height: 32px;
    position: relative;

  }

</style>

