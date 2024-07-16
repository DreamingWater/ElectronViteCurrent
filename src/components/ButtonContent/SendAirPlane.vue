<template>

  <div class="button-container">
    <button class="button  btn-6" :id="`${name}-${proto_type}-button-send`" :disabled="cur_module_working_status" @click="handleSendClick">
      <i class="icon-send material-icons" :id="`${name}-${proto_type}-button-send-icon`" >send</i>
      <!-- <i class="icon-check material-icons">check</i> -->
      <span class="button-text" :id="`${name}-${proto_type}-button-send-text`">SEND</span>
    </button>
  </div>
</template>


<script lang='ts' setup>
    // @ts-nocheck
    import {onMounted, watch, ref, computed, unref,inject} from 'vue';
    import {getStoreByPageLocation} from "@/store/SerialGroup";
    import {PageLocationStateEnum, usePageLocationState} from "@/api/pageLocation";
    import { serial_data_package_factory, cut_data_package_list } from "@/api/SerialSendPackage/index";
    import {SerialGettingDataModel} from "@/types/serial";

    const props = defineProps({
      module_name: { type: null, required: true },
      name: { type: String, default: 'None-name' },
      data_package: { type: Array,required:true },
      data_store: { type: null , required: true},
      proto_type: { type: null, default: 'None-type' },
    });
    const scheduler = inject('$scheduler');
    const module_enable_working:SerialGettingDataModel = { 'data_type' : 'EnableStatus'};
    const cur_module_working_status = computed(() => {
      const store = props.data_store;
      const value = store.getTargetParameter(module_enable_working);
      // return !Boolean(value);
      return false;
    });


    const button_effect_function = ()=>{
      // 按钮特效
      const send_button_text_name = props.name + '-' + props.proto_type+ '-button-send-text';
      const buttonText = document.getElementById(send_button_text_name);
      // send button icon
      const send_button_icon_name = props.name + '-' + props.proto_type+ '-button-send-icon';
      const sendIcon = document.getElementById(send_button_icon_name);
      const  clicked_hideSendText = ()=> {
        // send-button-text
        buttonText.style.transform = ``;
        sendIcon.style.transform = ``;
      }
      setTimeout(() => {
        buttonText.style.transform = `translateY(80px)`;
        sendIcon.style.transition = `800ms ease 200ms`;
        sendIcon.style.transform = `scale(2) translateX(120px)`;
        sendIcon.addEventListener("webkitTransitionEnd", clicked_hideSendText);
      }, 500);
    }
    function handleSendClick() {
      // 按钮效果实现
      button_effect_function();
      // 按钮其它事件处理
      deal_packaged_data();

    }
    const deal_packaged_data= () => {
      // 处理数据
      const data_package_list:[][] = cut_data_package_list(props.data_package,props.data_store);
      console.log('data_package_list',data_package_list);
      for(const [index, data_package] of data_package_list.entries()){
        if (data_package[0]['data_type'] == "WorkingWavelength")
        { // 连续发送,解决种子波长调节过程，奇奇怪怪的问题，就是调不了，能发送，但是接收可能不到。
          scheduler.addSerialSendPackagesTask(data_package,  PageLocationStateEnum[props.module_name],3,null,'continuous');
        }else {
          scheduler.addSerialSendPackagesTask(data_package,  PageLocationStateEnum[props.module_name],3,null,'interval');
        }
      }
    }

</script>


<style lang='scss' scoped>

.button-container {
  height: 100%;
  padding-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button {
  background-color: #4E3CC8;
  padding: 2px 32px;
  border-radius: 32px;
  color: #fff;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 170px;
  outline: none;
  border: none;
  box-shadow: 0px 2px 6px #4E3CC8;
  position: relative;

  i {
    font-size: 1.8rem;
  }

  .icon-send {
    margin-right: 10px;
    transition: 400ms ease;
  }
  .button-text {
    margin-left: 10px;
  }

}

.notransition {
  -webkit-transition: none;
  -moz-transition: none;
  -o-transition: none;
  transition: none;
}


@keyframes ellipsis {
  to {
    width: 20px;
  }
}

@-webkit-keyframes ellipsis {
  to {
    width: 20px;
  }
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}

// button cover style

.btn-6 {
  background: rgb(247,150,192);
  background: radial-gradient(circle, rgba(247,150,192,1) 0%, rgba(118,174,241,1) 100%);


  & span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  &:before,
  &:after {
    position: absolute;
    content: "";
    height: 0%;
    width: 1px;
    box-shadow:
        -1px -1px 20px 0px rgba(255,255,255,1),
        -4px -4px 5px 0px rgba(255,255,255,1),
        7px 7px 20px 0px rgba(0,0,0,.4),
        4px 4px 5px 0px rgba(0,0,0,.3);
  }
  &:before {
    right: 0;
    top: 0;
    transition: all 500ms ease;
  }
  &:after {
    left: 0;
    bottom: 0;
    transition: all 500ms ease;
  }
  &:hover{
    background: transparent;
    color: #e28f4a;           // 鼠标覆盖时候的显示颜色
    box-shadow:#4E3CC8;
  }
  &:hover:before {
    transition: all 500ms ease;
    height: 100%;
  }
  &:hover:after {
    transition: all 500ms ease;
    height: 100%;
  }
  & span:before,
  & span:after {
    position: absolute;
    content: "";
    box-shadow:
        -1px -1px 20px 0px rgb(235, 183, 183),
        -4px -4px 5px 0px rgb(165, 44, 44),
        7px 7px 20px 0px rgba(0,0,0,.4),
        4px 4px 5px 0px rgba(0,0,0,.3);
  }
  & span:before {
    left: 0;
    top: 0;
    width: 0%;
    height: .5px;
    transition: all 500ms ease;
  }
  & span:after {
    right: 0;
    bottom: 0;
    width: 0%;
    height: .5px;
    transition: all 500ms ease;
  }
  & span:hover:before {
    width: 100%;
  }
  & span:hover:after {
    width: 100%;
  }
}

</style>