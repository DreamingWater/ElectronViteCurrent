<template>

    <div class="serial_box">
        
    <h2>Serial Port Settings</h2>
    <div class="content">
        <form @submit.prevent="applySettings">
    <div class="item">
        <label for="port">Port:</label>
        <select id="port" v-model="selectedPort" required>
            <option v-for="port in portList" :value="port">{{ port }}</option>
        </select>

            <img class="refresh"  ref="refreshIcon" src="../assets/imgs/refresh.png" alt=""   :style="{ transform: rotateStyle }" @click="refreshIcon" />
      
    </div>
    <div class="item">
        <label for="baudrate">Baudrate:</label>
        <select id="baudrate" v-model="selectedBaudrate" required>
            <option v-for="baudrate in baudrateList" :value="baudrate">{{ baudrate }}</option>
        </select>
    </div>
    <button type="submit">Connect</button>
</form>
        <div class="right-img">
            <img :src="imageSrc" >
        </div>
    </div>
      
    </div>

</template>
  
<script lang="ts" setup>
// @ts-nocheck
    import { useSerialStore } from "@/store/Serial";
    import ConnectedImg from "../assets/imgs/connected.png";
    import UnConnectedImg from "../assets/imgs/unconnected.png";
    import { ref, onMounted, watch,computed } from 'vue';

    const store = useSerialStore(); // store

    let portList: string[] = []; // replace with your actual port list
    let baudrateList: number[] = [9600, 19200, 38400, 57600, 115200]; // replace with your desired baudrate options
    let selectedBaudrate: number = 115200;
    let selectedPort: string = '';
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
        console.log(store.getSerialOpenOrNot());
        if (store.getSerialOpenOrNot()) {
            return ConnectedImg; // 替换为实际的图标路径
        } else {
            return UnConnectedImg; // 未连接的图标
    }
    });

    function applySettings(): void {
    // Validate the form
    if (!selectedPort || !selectedBaudrate) {
        alert('Please fill in all the fields');
        return;
    }
    // 跟新配置到pinia
    store.SetSerialConfig({'port': selectedPort,'baudrate':115200});
    // 发送串口连接信号
    store.AskForConnectSerial();
    }

    function refreshIcon(): void {
        
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
        selectedPort = serial_list[0];
    }
    }

    function setValidPorts(): void {
    // 设置端口列表
    portList = store.getSerialValidList();
    window.console.log(portList);
    }


</script>
<style lang="scss" scoped>
.serial_box {
    width: 85%;
    height: auto;
    /*border: 1px solid #000000;*/
    margin: 15% auto 0;
    text-align: center;
    background: #96977c90;
    padding: 20px 50px;
    border-radius: 5px;


    h2 {
        color: #fa3640;
        font-family: 'Peralta', cursive;
        font-style: italic;
        font-size: 30px;
    }

    .content{
        display: flex;
        width: 100%;
        form  {

        display: flex;
        flex-direction: column;
        align-items: center;
        .item{
        margin-top: 15px;

        label {
            font-size: medium;
            color: #111010;
            font-size: 18px;
        }

        select {
            margin-left: 20px;
            border: 0;
            width: 150px;
            font-size: 18px;
            border-bottom: 2px solid #443a3a;
            padding: 5px 10px;
            background: #ffffff00;
            color: #764e4e;
        }
    }

    }
    .right-img{
        max-width: 150px;
        height: auto;
        margin-right: 10px;
        margin-left: 10px;
    }
    button {
        margin-top: 15px;
        width: 180px;
        height: 30px;
        font-size: 20px;
        font-weight: 800;
        font-family: 'Roboto', sans-serif;
        color: #ffffff;
        border: 0;
        background-image: linear-gradient(to right, #db3125 0%, #578bc3 100%);
        border-radius: 15px;
    }
    }

  
}


</style>


<style lang="css" scoped>
    /* 刷新按钮 */

    .refresh {
        width: 32px;
        height: 32px;
        position: relative;
        top: 10px;



    }

</style>