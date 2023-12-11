<template>
    <div class="container" :id="`${childname}-${property}-wrapper`">
        <div class="name">
            <div class="circles" id="circles">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="warning">
                <span>TSV</span>
            </div>
            <!-- <span> TSV </span> -->
        </div>
        </div>
        <div class="value">
            12.4
        </div>

    </div>
  </template>



<script lang="ts" setup> 
    import { ref } from 'vue'
    const props = defineProps({
        childname: { type: String, default: 'Tec-One' },
        property: { type: String, default: 'TSV' },
    });

</script>

<style lang="scss" scoped>

$spin-time: 5.5s;
$circle-size: 34px;
$circle-stroke: 2px;
$displacement: 0%;







.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  border: 1px solid #000;
  padding: 16px;
  border-radius:5px;
}

.svg {
  margin-bottom: 16px;
}

.show-area {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.name {
    display:flex;
    
    .circles {
        height: $circle-size;
        width: $circle-size;
        // position: absolute;
        margin: 0 auto;
        top: 50%;
        left: 50%;
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
        left: 50%;
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