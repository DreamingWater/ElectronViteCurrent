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
      import {ref, onMounted, watch, computed, unref, inject} from 'vue';
      import { getStoreByPageLocation, useSerialOscillatorStore} from "@/store/SerialGroup";
      import { append_serial_data_parser } from "@/api/SerialParser/index"
      import { TimerTask} from "@/api/schedulerTask";

      // 获取当前在哪个页面
      import {PageLocationStateEnum, usePageLocationState} from "@/api/pageLocation";
      import {SerialGettingDataModel, SerialSettingDataModel} from "@/types/serial";
      import {serial_data_package_factory} from "@/api/SerialSendPackage";
      const { setCurrentPageLocationState, getCurrentPageLocationState } = usePageLocationState();
      const scheduler = inject('$scheduler');

      const portList= ref([]);  // replace with your actual port list
      const selectedPort = ref('');
      const rotationAngle = ref(0); // 初始角度为0度
      let use_port:any = null;
      let use_parser:any = null;

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
      function add_parser(this_parser:any) {
        this_parser.on('data', data => {
          console.log('Received data from port:', data);
        });
      }
      function click_connect_serial(){

        const current_control_page = computed(() => unref(getCurrentPageLocationState));
      // 解构对应的 store
        const store_result = getStoreByPageLocation(current_control_page.value);
        const store = store_result.store();
        // 获取波特率信息
        const search_key:SerialGettingDataModel = {
          'data_type':'BaudRate',
        } ;

        const baudRate = store.getTargetParameter(search_key);

        // 初始化任务
        // let initial_data1 = serial_data_package_factory([], current_control_page.value, 'initial');
        // console.log(initial_data1);
        //
        // for(const [index, data] of initial_data1.entries()){
        //   console.log('模拟串口发送：',data.toString('hex'));
        // }

        console.log('baudRate',baudRate)
        // 获取当前页面的串口配置
        if (!selectedPort.value ) {
          alert('Please select the ports');
          return;
        }

        ({ port: use_port, parser: use_parser } = askForSerialConnection(selectedPort.value, baudRate,store_result.flag));
        if(use_port ){
          // 跟新配置到pinia,连接成功
          append_serial_data_parser(use_parser,current_control_page.value);
          // 启动定时任务
          scheduler.addSerialSendPackagesTask([],  current_control_page.value,1,'internal','continuous');

          // let task_data = serial_data_package_factory([], current_control_page.value, 'internal');
          // let task = null;
          // if(task_data.length>0){
          //   task = new TimerTask(store, task_data)
          //   // 温度页面单次任务，其它页面循环定时任务
          //   task.createTask(1000,false);
          // }
          // 保存对象
          store.changeSerialConnectState(use_port,use_parser,true,null);

          // 初始化任务
          // let initial_data = serial_data_package_factory([], current_control_page.value, 'initial');
          // // 逐个发送数据
          // setTimeout(()=>{
          //   store.sendSerialData(initial_data);
          // },1000);
          scheduler.addSerialSendPackagesTask([],  current_control_page.value,2,'initial','continuous');
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

