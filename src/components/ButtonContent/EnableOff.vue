<template>
  <!-- <div class="mycomponents"> -->
  <div class="circle" @click="click_sender_circle_" >
    <span class="circle__btn">
      <div class="pause">
          <div class="circle-content">
          <svg xmlns="http://www.w3.org/2000/svg" style="width: 3em;height: 3em;vertical-align: middle;fill:  rgb(0, 0, 0);overflow: hidden;"  viewBox="0 0 24 24"><path fill="currentColor" d="M14 19h4V5h-4M6 19h4V5H6z"/></svg>
      </div>
      </div>
      <div class="play" >
        <div class="circle-content">
<!--             <svg class="icon" style="width: 3em;height: 3em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11075"><path d="M512 0c282.794667 0 512 229.205333 512 512s-229.205333 512-512 512S0 794.794667 0 512 229.205333 0 512 0z m311.082667 823.082667A438.016 438.016 0 0 0 951.978667 512c0-59.392-11.562667-116.992-34.56-171.306667a437.717333 437.717333 0 0 0-94.293334-139.904c-40.533333-40.405333-87.509333-72.106667-139.946666-94.293333A437.461333 437.461333 0 0 0 512 72.021333c-59.392 0-116.992 11.562667-171.306667 34.56a437.717333 437.717333 0 0 0-139.904 94.293334c-40.405333 40.533333-72.106667 87.509333-94.293333 139.946666A437.461333 437.461333 0 0 0 72.021333 512c0 59.392 11.562667 116.992 34.56 171.306667a437.717333 437.717333 0 0 0 94.293334 139.904c40.533333 40.405333 87.509333 72.106667 139.946666 94.293333 54.186667 22.912 111.786667 34.474667 171.178667 34.474667 59.392 0 116.992-11.562667 171.178667-34.56a437.717333 437.717333 0 0 0 139.946666-94.293334z m-120.405334-341.077334a36.053333 36.053333 0 0 1 0 59.989334l-256 170.666666A36.053333 36.053333 0 0 1 390.613333 682.666667V341.333333a36.053333 36.053333 0 0 1 56.064-29.994666l256 170.666666z m-239.957333-73.301333v206.592L617.685333 512l-154.965333-103.296z" fill="rgb(170, 170, 248)" p-id="11076"></path></svg>-->
                <svg xmlns="http://www.w3.org/2000/svg" style="width: 3em;height: 3em;vertical-align: middle;fill:  rgb(0, 0, 0);overflow: hidden;"  viewBox="0 0 24 24"><path fill="currentColor" d="m10 16.5l6-4.5l-6-4.5M22 12c0-5.54-4.46-10-10-10c-1.17 0-2.3.19-3.38.56l.7 1.94c.85-.34 1.74-.53 2.68-.53c4.41 0 8.03 3.62 8.03 8.03c0 4.41-3.62 8.03-8.03 8.03c-4.41 0-8.03-3.62-8.03-8.03c0-.94.19-1.88.53-2.72l-1.94-.66C2.19 9.7 2 10.83 2 12c0 5.54 4.46 10 10 10s10-4.46 10-10M5.47 3.97c.85 0 1.53.71 1.53 1.5C7 6.32 6.32 7 5.47 7c-.79 0-1.5-.68-1.5-1.53c0-.79.71-1.5 1.5-1.5"/></svg>

<!--             <svg class="icon" style="width: 3em;height: 3em;vertical-align: middle;fill:  rgb(170, 170, 248);overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11075"> <path fill="currentColor" d="M8.5 8.64L13.77 12L8.5 15.36zM6.5 5v14l11-7"/></svg>-->
        </div>
      </div>
    </span>
    <span class="circle__back-1"></span>
    <span class="circle__back-2"></span>
  </div>
  <!-- </div> -->
</template>


<script lang="ts" setup>
    // @ts-nocheck
    import {onMounted, ref, watch, computed, inject} from 'vue';
    // import { append_serial_data_parser } from '@/api/SerialSendPackage/index'
    import { getStoreByPageLocation, useSerialOscillatorStore} from "@/store/SerialGroup";
    import {PageLocationStateEnum} from "@/api/pageLocation";
    import {serial_data_package_factory} from "@/api/SerialSendPackage";
    import {SerialGettingDataModel} from "@/types/serial";



    const props = defineProps({
      module_name: { type: null, required: true },
      name: { type: String, default: true },
      data_package: { type: Array,required:true },
      data_store: { type: null , required: true},
      store_key:  { type: null,  required:true},
    });
    const scheduler = inject('$scheduler');

    const current_page_location = PageLocationStateEnum[props.module_name];

    const enable_open_status = computed(() => {
      const store_result = getStoreByPageLocation(current_page_location);
      const serial_store = store_result.store();
      const get_Open_status:SerialGettingDataModel = {
        'data_type' :'IsOpen'
      }
      return !serial_store.getTargetParameter(get_Open_status);
    });

    const enable_status = ref(props.data_store.getTargetParameter(props.store_key));  // 启动开关
    let task = null;                // 定时任务

    const change_circle_animation = () => {
      /*  play button */
      const play = document.querySelector('.play');
      const pause = document.querySelector('.pause');
      const playBtn = document.querySelector('.circle__btn');
      const wave1 = document.querySelector('.circle__back-1');
      const wave2 = document.querySelector('.circle__back-2');
      pause.classList.toggle('visibility');
      play.classList.toggle('visibility');
      playBtn.classList.toggle('shadow');
      wave1.classList.toggle('paused');
      wave2.classList.toggle('paused');
    };


    watch(() => props.data_store.getTargetParameter(props.store_key),
        (newVal, oldVal) => {
          change_circle_animation();
          enable_status.value = newVal;
          console.log(`changed circle status ${newVal}`)
        }
    );
    const click_sender_circle_ = ()=>{
      if (enable_open_status.value){
        console.log('enable_open_status',enable_open_status.value);
        // return;
      }
      enable_status.value = enable_status.value === 1 ? 0 : 1;
      const send_value_package = JSON.parse(JSON.stringify(props.data_package));  // 除开关之外的包数据
      const enable_data_package = props.store_key;    // 开关的包数据
      enable_data_package.value = enable_status.value // 修改开关状态
      send_value_package?.push(enable_data_package)   // 将开关启动的数据传递进去
      console.log('send_value_package',send_value_package);
      if (enable_status.value === 1){
        scheduler.addSerialSendPackagesTask(send_value_package, current_page_location,0,null,'once');
      }else {
        console.log('shut down the module task from the close button!!!!!!')
        scheduler.addShutdownTask(2,props.data_store,null,'interval');
      }

      // 设置 enable_off 按钮
      // props.data_store.setTargetParameter(enable_data_package)

      // 如果 是关闭的话，就停止定时任务
    }

    onMounted(()=>{
      if(!enable_status.value){
        change_circle_animation();         //  默认状态是关闭
      }
    })

</script>


<style scoped lang="scss">
  $primary-light: #8abdff;
  $primary: #6d5dfc;
  $primary-dark: #5b0eeb;
  $white: #FFFFFF;
  $greyLight-1: #E4EBF5;
  $greyLight-2: #c8d0e7;
  $greyLight-3: #bec8e4;
  $greyDark: #9baacf;

  $circle-width: 6rem;
  $circle-height: 6rem;

  $circle-btn-width: 4rem;
  $circle-btn-height: 4rem;
  $circle-btn-font-size: 3rem;


  /* PLAY BUTTON */
  .circle {
    grid-column: 2/3;
    grid-row: 4/6;
    width: $circle-width;
    height: $circle-height;
    justify-self: center;
    border-radius: 1rem;
    display: grid;
    grid-template-rows: 1fr;
    justify-items: center;
    align-items: center;
  }

  .circle__btn {
    grid-row: 1/2;
    grid-column: 1/2;
    width: $circle-btn-width;
    height: $circle-btn-height;
    display: flex;
    margin: 0.3rem;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: $circle-btn-font-size;
    color: $primary;
    z-index: 300;
    background: $greyLight-1;
    box-shadow: 0.3rem 0.3rem 0.6rem $greyLight-2, -0.2rem -0.2rem 0.5rem $white;
    cursor: pointer;
    position: relative;

    &.shadow {
      box-shadow: inset 0.2rem 0.2rem 0.5rem $greyLight-2, inset -0.2rem -0.2rem 0.5rem $white;
    }

    .play {
      position: absolute;
      opacity: 0;
      transition: all 0.2s linear;

      &.visibility {
        opacity: 1;
      }
    }

    .pause {
      position: absolute;
      transition: all 0.2s linear;

      &.visibility {
        opacity: 0;
      }
    }
  }

  .circle__back-1, .circle__back-2 {
    grid-row: 1/2;
    grid-column: 1/2;
    width: $circle-btn-width;
    height: $circle-btn-height;
    border-radius: 50%;
    filter: blur(1px);
    z-index: 100;
  }

  .circle__back-1 {
    box-shadow: 0.4rem 0.4rem 0.8rem $greyLight-2, -0.4rem -0.4rem 0.8rem $white;
    background: linear-gradient(to bottom right, $greyLight-2 0%, $white 100%);
    animation: waves 4s linear infinite;

    &.paused {
      animation-play-state: paused;
    }
  }

  .circle__back-2 {
    box-shadow: 0.4rem 0.4rem 0.8rem $greyLight-2, -0.4rem -0.4rem 0.8rem $white;
    animation: waves 4s linear 2s infinite;

    &.paused {
      animation-play-state: paused;
    }
  }

  @keyframes waves {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  .circle-content{
    font-size: 16px;
    color: red;
  }
</style>