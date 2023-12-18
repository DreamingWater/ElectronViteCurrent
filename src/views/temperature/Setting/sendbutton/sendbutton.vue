<template>

  <div class="button-container">
    <button class="button  btn-6" :id="`${childname}-${property}-button-send`" :disabled="isDisabled">
      <i class="icon-send material-icons" :id="`${childname}-${property}-button-send-icon`" >send</i>
      <!-- <i class="icon-check material-icons">check</i> -->
      <span class="button-text" :id="`${childname}-${property}-button-send-text`">SEND</span>
    </button>
  </div>
  </template>
  
  
  <script lang='ts' setup>
  // @ts-nocheck
      import { onMounted,watch,ref } from 'vue';
      import { websocket_send } from "@/utils/WebsocketFunc";
      import { TemperatureState, SendMessageType } from "@/utils/config";
      import { useTemperatureStore } from "@/store/Temperature";
      import { useTemperatureDataStore } from "@/store/TemperatureData";
      const store = useTemperatureStore();       // store
      const ControlType = ['TSV' , 'PID_P',  'PID_I', 'PID_D', 'Voltage_Proportion']
      const TenmperatueValue = {
              name:   'Tec_One',
              TSV :   25,
              PID_P : 10,
              PID_I : 10,
              PID_D:  10,
              Voltage_Proportion:1, 
          } as TemperatureState;



      const props = defineProps({
        childname: { type: String, default: 'Tec-One' },
        property:{type: String, default: 'temperature'}
      });
      let isDisabled = ref(false); // 是否失能按钮部分
      onMounted(()=>{
        // 更新 温度本地存储的缓存
        update_localstorage();

        const sendbutton_name = props.childname + '-' + props.property+ '-button-send';
          const sendButton = document.getElementById(sendbutton_name);
          if(sendButton === null){
            return;
          }
          sendButton.addEventListener('click', handleClick);
          function handleClick() {
          //   window.console.log('hand click');
            // if(isDisabled == true){
            //   return;
            // }
            // 发送温度和电流的数据
            send_temprature_controller_data();   
            // console.log(TenmperatueValue);        
          //   window.console.log('handclick from '+props.childname);
            // send-button-text
          const sendbutton_text_name = props.childname + '-' + props.property+ '-button-send-text';
          const buttonText = document.getElementById(sendbutton_text_name);
            // send button icon
          const sendbutton_icon_name = props.childname + '-' + props.property+ '-button-send-icon';
          const sendIcon = document.getElementById(sendbutton_icon_name);

          setTimeout(() => {
              buttonText.style.transform = `translateY(80px)`;
              sendIcon.style.transition = `800ms ease 200ms`;
              sendIcon.style.transform = `scale(2) translateX(120px)`;
              sendIcon.addEventListener("webkitTransitionEnd", showSentText);   
          }, 500);
          }
  
          function showSentText() {
              // send-button-text
              const sendbutton_text_name = props.childname + '-' + props.property+ '-button-send-text';
              const buttonText = document.getElementById(sendbutton_text_name);
            // send button icon
              const sendbutton_icon_name = props.childname + '-' + props.property+ '-button-send-icon';
              const sendIcon = document.getElementById(sendbutton_icon_name);
              buttonText.style.transform = ``;
              sendIcon.style.transform = ``;
          }
      }) 
      // 函数功能是判断数据是否相等，相等就忽略，不相等就更新到store，同时将数据发送
      // f 读取数据  f_run 设置数据   this_value 此次更新的数据   Send_Type Send里面的type
      const judge_data_changed = ((f:any, f_run:any, this_value,Send_Type)=>{
        const setting_value = f(props.childname);
        if (setting_value == this_value){
          return
        }
        f_run(props.childname,this_value);
        websocket_send(Send_Type, this_value?this_value:0);
      }) 
      // 发送 温度控制的数据
      const send_temprature_controller_data = () => {
        // 读取本地存储
        read_localstorage();
        judge_data_changed(store.getTSVStatus, store.SetTempratureValue,TenmperatueValue.TSV,SendMessageType.Temperature_TEC_Setting);
        judge_data_changed(store.getPID_PStatus, store.SetPID_PValue,TenmperatueValue.PID_P,SendMessageType.Temperature_TEC_Pid_P);
        judge_data_changed(store.getPID_IStatus, store.SetPID_IValue,TenmperatueValue.PID_I,SendMessageType.Temperature_TEC_Pid_I);
        judge_data_changed(store.getPID_DStatus, store.SetPID_DValue,TenmperatueValue.PID_D,SendMessageType.Temperature_TEC_Pid_D);
       
        const data_store = useTemperatureDataStore()
        data_store.SetTPVList(props.childname, 14 + Math.random() )
        // 保存到storage
        // store.SetTempratureValue(props.childname, TenmperatueValue.TSV);
        // store.SetPID_PValue(props.childname, TenmperatueValue.PID_P);
        // store.SetPID_IValue(props.childname, TenmperatueValue.PID_I);
        // store.SetPID_DValue(props.childname, TenmperatueValue.PID_D);
        // store.SetVoltageValue(props.childname, TenmperatueValue.Voltage_Proportion);


    }
    // 更新 缓存
    const update_localstorage = () => {
      // 读取缓存
      const tsv_value = localStorage.getItem(`${props.childname}-${ControlType[0]}`)
      if (tsv_value === null){
        // 设置初始缓冲数据
        for(var i = 0, len = ControlType.length; i < len; i++) {
          localStorage.setItem(`${props.childname}-${ControlType[0]}`, TenmperatueValue[ControlType[i]]);
      }
      }   
    }
    // 读取缓存的数据
    const read_localstorage = () => {
      for(var i = 0, len = ControlType.length; i < len; i++) {
        const temp_value = localStorage.getItem(`${props.childname}-${ControlType[i]}`) || '0';
        TenmperatueValue[ControlType[i]] = temp_value;
      }
    }

    // watch(() => store.getTargetObject(props.childname),
    //   (newVal, oldVal) => {
    //     console.log('target store changed!!')
    //     TenmperatueValue = newVal;
    //   }
    // );

    // const send_temprature_current_data = () => {
     
    //   const value = localStorage.getItem(props.childname)
    //   var this_lable = 0;
    //   // websocket_send(this_lable, this_data);Amplifier_ONE        
    //   if(props.childname.indexOf('ONE')!== -1){
    //       this_lable = SendMessageType.Amplifier_ONE;
    
    

    //   }
    //   else if(props.childname.indexOf('TWO')!== -1){
    //       this_lable = SendMessageType.Amplifier_TWO;
        
    //   }       
    //   else if(props.childname.indexOf('THREE')!== -1){
    //       this_lable = SendMessageType.Amplifier_THREE;
        
    //   }    
    //   var set_value = localStorage.getItem(props.childname) // 获取设定值
    //   // console.log(set_value?set_value:0);
    //   websocket_send(this_lable, set_value?set_value:0);
    // }
  
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
    padding: 2px 20px;
    border-radius: 20px;
    color: #fff;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 160px;
    outline: none;
    border: none;
    box-shadow: 0px 2px 6px #4E3CC8;
    position: relative;
  
    i {
      font-size: 1.4rem;
    }
    
    .icon-send {
      margin-right: 10px;
      transition: 400ms ease;
    }
    .button-text {
      margin-left: 6px;
      margin-top: 5px;
      margin-bottom: 2px;
      padding: 15px auto;
      font-size: 20px;
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
      width: 24px;    
    }
  }
  
  @-webkit-keyframes ellipsis {
    to {
      width: 24px;    
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