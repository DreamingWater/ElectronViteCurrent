<template>
  <!-- <div class="personal-bests-container">
      <div class="container" :id="`${childname}-${property}-wrapper`">

          </div>
          <div class="value">
              {{ props.value }}
          </div>

      </div>
  </div> -->
  <div class="personal-bests-container">

    <div class="best-item box-one">
      <p class="title">{{ props.property }}</p>
      <div class="value_show">
        <!-- <p class="title">{{ props.property }}</p> -->
        <div class="value">  {{ value }}</div>
      </div>
      <div class="name">
        <div class="circles" id="circles">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="warning">
            <span></span>
          </div>
        </div>
        <!-- <span> TSV </span> -->
      </div>
      <!-- <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/05dfc444-9ed3-44cc-96af-a9cf195f5820" alt="" /> -->
    </div>
  </div>
</template>



<script lang="ts" setup>
import { number } from 'echarts';
import { ref } from 'vue'
const props = defineProps({
  childname: { type: String, default: 'Tec-One' },
  property: { type: String,  default: 'TSV' },
  value:    { type:Number,   default:0  },
});
const show_value = ref(0); // 显示的数值
</script>

<style lang="scss" scoped>

$spin-time: 5.5s;
$circle-size: 55px;
$circle-stroke: 4px;
$displacement: 0%;
.personal-bests-container {
  // display: grid;
  // grid-template-columns: repeat(2, 1fr);
  // grid-template-rows: repeat(2, 150px);
  // gap: 10px;
  // margin-top: 10px;
  min-width: 200px
}
.title{
  font-size: 18px;
  position: relative;
  left: -15px;
  top: -28px;
  color: #DB4437;
  font-style: italic;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.value_show{
  display: flex;

  .value{
    font-size: 20px;
  }
}
.best-item {
  display: flex;
  gap: 20px;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 3px;
}

.box-one {
  flex-direction: row;
  align-items: center;
  justify-content: center;
  grid-area: 1 / 1 / 2 / 3;
  background-color: rgba(185, 159, 237, 0.6);
  padding: 15px;
  font-size: 1rem;
  font-weight: 700;
}


.name {
  position: relative;
  left: 20%;
  top:18px;

  .circles {
    height: $circle-size;
    width: $circle-size;
    display: flex;
    margin-top:10px;
    // top: 50%;
    // left: 100%;
    transform: translate3D(-50%, -50%, 0);
  }

  .circle {
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    border: $circle-stroke solid transparent;
    border-radius: 115% 140% 145% 110%/125% 140% 110% 125%;
    mix-blend-mode: screen;
    &:nth-child(1) {
      border-color: #DB4437;
      transform-origin: 50%-$displacement 50%;
      animation: spin1 $spin-time linear infinite;
    }
    &:nth-child(2) {
      border-color: #F4B400;
      transform-origin: 50% 50%+$displacement;
      animation: spin2 $spin-time linear infinite;
    }
    &:nth-child(3) {
      border-color: #4285F4;
      transform-origin: 50%+$displacement 50%;
      animation: spin3 $spin-time linear infinite;
    }
    &:nth-child(4) {
      border-color: #0F9D58;
      transform-origin: 50% 50%-$displacement;
      animation: spin4 $spin-time linear infinite;
    }
  }

  @keyframes spin1 {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin2 {
    0% {
      transform: rotate(72deg);
    }
    100% {
      transform: rotate(-288deg);
    }
  }

  @keyframes spin3 {
    0% {
      transform: rotate(-144deg);
    }
    100% {
      transform: rotate(216deg);
    }
  }

  @keyframes spin4 {
    0% {
      transform: rotate(216deg);
    }
    100% {
      transform: rotate(-144deg);
    }
  }

  .warning {
    color: rgb(236, 56, 56);
    font-family: sans-serif;
    text-align: center;
    display: inline-block;
    padding: 50%;
    width: 80%;
    top: 50%;
    left: 5%;
    position: absolute;
    transform: translate3D(-50%, -50%, 0);
  }

  // @supports (mix-blend-mode: screen) {
  //     .warning{
  //         display: none;
  //     }
  // }


}

.value {
  font-size: 24px;
}
</style>