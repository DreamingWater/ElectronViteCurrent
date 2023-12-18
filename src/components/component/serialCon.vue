<template>
    <div class="serial-con">
        <select id="port" v-model="selectedPort" required class="port_select">
            <option v-for="port in portList" :value="port">{{ port }}</option>
        </select>

        <img class="refresh"  ref="refreshIcon" src="@/assets/imgs/refresh.png" alt=""   :style="{ transform: rotateStyle }" @click="refreshIcon" />
        <div class="show-img">
            <img :src="imageSrc" @click="click_serial">
        </div>
    </div>
</template>
  
<script lang="ts" setup>
// @ts-nocheck
    import { useSerialStore } from "@/store/Serial";
    import UnConnectedImg from "@/assets/imgs/unconnected.png";
    import { ref, onMounted, watch,computed } from 'vue';
    import { websockt_start } from "../../utils/WebsocketFunc";

    const store = useSerialStore(); // store

    const portList= ref([]); // replace with your actual port list
    const selectedPort = ref('');
    const rotationAngle = ref(0); // 初始角度为0度
    
    watch(() => store.getSerialValidList(),
        (newVal, oldVal) => {
            window.console.log('changed value');
            window.console.log(newVal);
      
                setValidPorts();
                setDefaultPort();
          }
      );
    onMounted(() => {
        setTimeout(() => {
            refreshIcon();
        }, 200);
    });
    const rotateStyle = computed(() => {
        return `rotate(${rotationAngle.value}deg)`;
    });
    const imageSrc = computed(() => {

            return UnConnectedImg; // 未连接的图标
    });



    function refreshIcon(): void {   // 点击刷新
        websockt_start();      // 连接串口
        store.SearchValidSerialPorts();
        // 旋转90°
        rotationAngle.value += 90; // 点击时增加180度

        setTimeout(() => {
            rotationAngle.value -= 90; // 一秒后恢复初始角度
        }, 1000);
    }

    function setDefaultPort(): void {
    // 设置默认端口值
    const serial_list = store.getSerialValidList();
    // 检查列表是否为空
    if (serial_list.length > 0) {
        // 设置选中的端口为列表中的第一个元素
        selectedPort.value = serial_list[0];
    }
    }

    function setValidPorts(): void {
    // 设置端口列表
    portList.value = store.getSerialValidList();
    window.console.log(portList.value);
    }

    function click_serial(){
    // Validate the form
    if (!selectedPort.value ) {
        alert('Please select the ports');
        return;
    }
    // 跟新配置到pinia
    store.SetSerialConfig({'port': selectedPort.value,'baudrate':9600});
    // 发送串口连接信号
    store.AskForConnectSerial();
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

