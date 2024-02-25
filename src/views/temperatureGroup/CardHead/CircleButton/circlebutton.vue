<template>
    <!-- <div class="mycomponents"> -->
        <div class="best-item box-one">
            <div class="circle">
            <span class="circle__btn">
                <div class="pause" name="pause">
                    <div class="circle-content">
                    <svg class="icon" style="width: 3em;height: 3em;vertical-align: middle;fill: rgb(170, 170, 248);overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4838"><path d="M352 768c-17.664 0-32-14.304-32-32L320 288c0-17.664 14.336-32 32-32s32 14.336 32 32l0 448C384 753.696 369.664 768 352 768z" fill="rgb(170, 170, 248)" p-id="4839"></path><path d="M672 768c-17.696 0-32-14.304-32-32L640 288c0-17.664 14.304-32 32-32s32 14.336 32 32l0 448C704 753.696 689.696 768 672 768z" fill="rgb(170, 170, 248)" p-id="4840"></path></svg>
        
                                </div>
                                </div>
                <div class="play" name="play">
                <div class="circle-content">
                    <svg class="icon" style="width: 3em;height: 3em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11075"><path d="M512 0c282.794667 0 512 229.205333 512 512s-229.205333 512-512 512S0 794.794667 0 512 229.205333 0 512 0z m311.082667 823.082667A438.016 438.016 0 0 0 951.978667 512c0-59.392-11.562667-116.992-34.56-171.306667a437.717333 437.717333 0 0 0-94.293334-139.904c-40.533333-40.405333-87.509333-72.106667-139.946666-94.293333A437.461333 437.461333 0 0 0 512 72.021333c-59.392 0-116.992 11.562667-171.306667 34.56a437.717333 437.717333 0 0 0-139.904 94.293334c-40.405333 40.533333-72.106667 87.509333-94.293333 139.946666A437.461333 437.461333 0 0 0 72.021333 512c0 59.392 11.562667 116.992 34.56 171.306667a437.717333 437.717333 0 0 0 94.293334 139.904c40.533333 40.405333 87.509333 72.106667 139.946666 94.293333 54.186667 22.912 111.786667 34.474667 171.178667 34.474667 59.392 0 116.992-11.562667 171.178667-34.56a437.717333 437.717333 0 0 0 139.946666-94.293334z m-120.405334-341.077334a36.053333 36.053333 0 0 1 0 59.989334l-256 170.666666A36.053333 36.053333 0 0 1 390.613333 682.666667V341.333333a36.053333 36.053333 0 0 1 56.064-29.994666l256 170.666666z m-239.957333-73.301333v206.592L617.685333 512l-154.965333-103.296z" fill="rgb(170, 170, 248)" p-id="11076"></path></svg>
                </div>
            </div>
            </span>
            <span class="circle__back-1"></span>
            <span class="circle__back-2"></span>
            </div>
        </div>

  <!-- </div> -->
  </template>
  
  
  <script lang="ts" setup>
      // @ts-nocheck
      import { onMounted,ref } from 'vue';
      import { useAmplifierStore } from "@/store/Amplifier";
      import { websocket_send } from "@/utils/WebsocketFunc";
      const store = useAmplifierStore();       // store
      import { useSerialStore } from "@/store/Serial";
      import { TempratureCurrent_Set, SendMessageType } from "@/utils/config";
      const Start_status = ref(false)      // 开关状态
      const serail_store = useSerialStore();
  
      const change_circle_status = () => {
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
      onMounted(()=>{
          console.log('onmountd');
          change_circle_status();
          wave_effect();
      })  
      const wave_effect= () =>{
  
          const play = document.querySelector('.play');
              const pause = document.querySelector('.pause');
              const playBtn = document.querySelector('.circle__btn');
              const wave1 = document.querySelector('.circle__back-1');
              const wave2 = document.querySelector('.circle__back-2');
          /*  play button  */
          playBtn.addEventListener('click', function(e) {
              if(serail_store.getSerialOpenOrNot()!==false){
                  e.preventDefault();
                  change_circle_status();
                  Start_status.value = ! Start_status.value; //取反
                  websocket_send(SendMessageType.Temperature_TEC_OPEN_STATUS, Start_status.value===true?'1':'0');
              }
           })
         
      }
      
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
    

    .best-item {
            display: flex;
            gap: 20px;
            width: 30%;
            height: 100%;
            border-radius: 15px;
            box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 3px;

        }
        .box-one {
            padding:5px auto;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        grid-area: 1 / 1 / 2 / 3;
        background-color: rgba(210, 195, 240, 0.6);
    }

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