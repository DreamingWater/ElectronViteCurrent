<template>
    
<div class="themes" :id="`${childname}-${property}-themes-select`">
    <label class="theme__color">
      <input type="radio" :name="`${childname}-${property}-color`" class="theme__input" value="shutdown" checked v-model="selectedColor"> 
      <span class="theme__icon" style="--color: hsl(0, 0%, 50%)"></span>
    </label>
    <label class="theme__color">
      <input type="radio" :name="`${childname}-${property}-color`"  class="theme__input" value="inseparable" v-model="selectedColor">
      <span class="theme__icon" style="--color: hsl(100, 79%, 46%)"></span>
    </label>
    <label class="theme__color">
      <input type="radio" :name="`${childname}-${property}-color`"  class="theme__input" value="rough" v-model="selectedColor">
      <span class="theme__icon" style="--color: hsl(200, 79%, 46%)"></span>
    </label>

</div>
</template>


<script lang='ts' setup>
      import { onMounted,ref,watch } from 'vue';
      import { useTemCurSetStore } from "@/store/TenCurSet";
      import { websocket_send } from "@/utils/WebsocketFunc";
      import { TempratureCurrent_Set, SendMessageType } from "@/utils/config";

      const selectedColor = ref('shutdown');  
      const store = useTemCurSetStore();       // store    props.property
      const props = defineProps({
        childname: { type: String, default: true },
        property:  {type:String, default:'current'},
      });
      watch(() => selectedColor.value,
            (newVal) => { // 检测到按钮变化，就设置pinia对应的set
              let tune_range = 0;
              let enable_tune = undefined;
              if(newVal == 'shutdown'){
                enable_tune = false;
                tune_range = 0;
              }
              else{
                enable_tune = true;
                if(newVal == 'inseparable')
                tune_range = 0.01;
                else if(newVal == 'rough')
                {
                  tune_range = 0.1;
                }
                else{
                  tune_range = 0;
                }
              }

              if (props.property === 'current')
              {
                  store.EnableTempratureCurrentUsing(props.childname,undefined,enable_tune); // 启动电流
                  store.SetTempratureCurrentTuneRange(props.childname,undefined,tune_range); // 设置调节范围
              }
              else if (props.property === 'temprature')
              {
                  store.EnableTempratureCurrentUsing(props.childname,enable_tune,undefined); // 启动温度
                  store.SetTempratureCurrentTuneRange(props.childname,tune_range,undefined); // 设置调节范围
              }
     
              }
          );
</script>


 <style lang="scss" scoped>

    // themes & switches
    // ==========================================================
    .theme {
      &s {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        text-align: center;
        // border-radius: 2px;
        // border: 1px solid #c38585;
      }

      &__color {

        & {
          margin-left: 0.3rem;
          cursor: pointer;
          position: relative;
        }

        &:first-of-type {
          margin-left: 0.5rem;
        }

      }

      &__input {
        opacity: 0;
        position: absolute;
        left: 50%;
 
        z-index: -1;
      }

      &__input:checked+&__icon {
        box-shadow: 0 0 0 .5rem var(--global-background), 0 0 0 .5rem hsla(0, 0%, 100%, .2);
        transform: scale(1);
      }

      &__input:focus+&__icon {
        box-shadow: 0 0 0 .5rem var(--global-background), 0 0 0 .5rem var(--color);
      }

      &__icon {
        display: flex;
        width: 1.3rem;
        height: 1.3rem;
        border-radius: 50%;
        background: var(--color);
        transform: scale(.7);
        transition: .2s;
      }

    }
  
</style>