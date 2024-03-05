<template>
        <div class="g-container">
        <div class="g-number">
          <span class="value">{{ show_current_value }}</span>
          <span class="unit">mA</span>
        </div>
        <div class="g-contrast">
          <div class="g-circle">
          </div>
          <ul class="g-bubbles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
</template>


<script  setup>
    import { onMounted,ref,watch } from 'vue';
    import { useTemCurStore } from "@/store/TenCurData";
    const store = useTemCurStore();       // store

    const show_current_value = ref(0); // 用于显示的current
      // 父子接口
    const props = defineProps({
      childname: {type:String, default:'Laser_One'}
    });


    // onMounted (()=>{
    // const this_canvas_name = props.childname + '-temprature-container';
    // window.console.log(this_canvas_name);})


    watch(() => store.getLatestCurrent(props.name),
        (newVal, oldVal) => {
          show_current_value.value = newVal;   //更新值
          }
      );

</script>

    
<style lang="scss" scoped>
    $height: 150px;
    $width: 120px;
    $circle-radius: 90px;
    $circle-radius_before: 80px;
        .g-container {
          position: relative;
          width: $width;;
          height: $height;
          margin: auto;
        }
        .g-number {
          position: absolute;
          width: 100%;
          top: 27%;
          text-align: center;
          font-size: 24px;
          z-index: 10;
          color: #fff;
          .value{
            font-size: large;
            color: rgb(238, 232, 232);
          }
          .unit{
            font-size: small;
          }
    
        }
        .g-contrast {
          filter: contrast(10) hue-rotate(0);
          width: 100%;
          height: 100%;
        //   background-color: #ffa;
          overflow: hidden;
          animation: hueRotate 10s infinite linear;
          .g-circle {
          position: relative;
          width: 100%;
          height:$height;
          box-sizing: border-box;
          filter: blur(8px);
    
          &::after {
            content: "";
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(0);
            width: $circle-radius;
            height: $circle-radius;
            background-color: #00ff6f;
            border-radius: 42% 38% 62% 49% / 45%;
            animation: rotate 10s infinite linear;
          }
    
          &::before {
            content: "";
            position: absolute;
            width: $circle-radius_before;
            height: $circle-radius_before;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            background-color: #000;
            z-index: 10;
          }
         }
        }
    
    
    
    .g-bubbles {
      position: absolute;
      left: 50%;
      bottom: 0;
      width: 5px;
      height: 5px;
      transform: translate(-50%, 0);
      border-radius: 100px 100px 0 0;
      background-color: #00ff6f;
      filter: blur(5px);
    }

    li {
      position: absolute;
      border-radius: 50%;
      background: #00ff6f;
    }

    @for $i from 0 through 15 {
      li:nth-child(#{$i}) {
        $width: 2+random(10)+px;
        left: 15 + random(50) + px;
        top: 50%;
        transform: translate(-50%, -50%);
        width: $width;
        height: $width;
        animation:animateMoveToTop;;
      }
    }

    @keyframes rotate {
      50% {
        border-radius: 45% / 42% 38% 58% 49%;
      }

      100% {
        transform: translate(-50%, -50%) rotate(720deg);
      }
    }

    @keyframes moveToTop {
      90% {
        opacity: 1;
      }

      100% {
        opacity: .1;
        transform: translate(-50%, -180px);
      }
    }

    @keyframes hueRotate {
      100% {
        filter: contrast(15) hue-rotate(360deg);
      }
    }

    @mixin animateMoveToTop {
      $randomDuration: random(6) + 3;
      $randomDelay: random(5000) / 1000;

      animation: moveToTop #{$randomDuration}s ease-in-out -#{$randomDelay}s infinite;
    }
</style>