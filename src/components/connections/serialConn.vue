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
      import { ref, onMounted, watch,computed,unref } from 'vue';
      import { getStoreByPageLocation, useSerialOscillatorStore} from "@/store/SerialGroup";


      // 获取当前在哪个页面
      import { usePageLocationState } from "@/api/pageLocation";
      import {SerialGettingDataModel, SerialSettingDataModel} from "@/types/serial";
      const { setCurrentPageLocationState, getCurrentPageLocationState } = usePageLocationState();

      const portList= ref([]);  // replace with your actual port list
      const selectedPort = ref('');
      const rotationAngle = ref(0); // 初始角度为0度

      // 旋转 logo 角度
      const rotateStyle = computed(() => {
        return `rotate(${rotationAngle.value}deg)`;
      });
      // 图标
      const imageSrc = computed(() => {
        return UnConnectedImg; // 未连接的图标
      });

      // 图标的旋转
      function rotate_logo(): void {   // 点击刷新
        // 旋转90°
        rotationAngle.value += 90; // 点击时增加180度
        setTimeout(() => {
          rotationAngle.value -= 90; // 一秒后恢复初始角度
        }, 1000);
      }

     async function click_refresh_logo(): void{
        // 设置端口列表
        portList.value = await listAvailablePorts();//['COM1','COM2','COM3','COM4']; // replace with your actual port list
        if (portList.value.length > 0) {
          // 设置选中的端口为列表中的第一个元素
          selectedPort.value = portList.value[0];
        }
        rotate_logo();
      }

      onMounted(() => {
        // 页面刷新的时候搜索串口等
        setTimeout(() => {
          click_refresh_logo();
        }, 200);
      });

      function click_connect_serial(){
        let use_port:any = null;
        let use_parser:any = null;
        const current_control_page = computed(() => unref(getCurrentPageLocationState));
      // 解构对应的 store
        const store = getStoreByPageLocation(current_control_page.value)();
        // 获取波特率信息
        const search_key:SerialGettingDataModel = {
          'data_type':'BaudRate',
        } ;
        const setting_key:SerialSettingDataModel = {
          'data_type':'BaudRate',
          'value':9600,
        } ;

        if (typeof store.setTargetParameter === 'function') {
          store.setTargetParameter(setting_key);
        } else {
          console.error('setTargetParameter method does not exist on the store instance');
        }

        const baudRate:number = store.getTargetParameter(search_key);
        // 获取当前页面的串口配置
        if (!selectedPort.value ) {
          alert('Please select the ports');
          return;
        }
        ({ port: use_port, parser: use_parser } = askForSerialConnection(selectedPort.value, baudRate.value));
        console.log('use_port:',use_port)
        if(use_port){
          // 跟新配置到pinia,连接成功
          store.changeSerialConnectState(use_port,use_parser,true);
          add_serial_data_parser(use_parser);
        }
      }


</script>


<style lang="scss" scoped>

  .serial-con{
    display: flex;
    flex-direction: row;
    align-items: center
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

