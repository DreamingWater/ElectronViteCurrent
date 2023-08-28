<template>

    <div class="button-container">
      <button class="button  btn-6" :id="`${childname}-button-send`" >
        <i class="icon-send material-icons" :id="`${childname}-button-send-icon`" >send</i>
        <!-- <i class="icon-check material-icons">check</i> -->
        <span class="button-text" :id="`${childname}-button-send-text`">SEND</span>
      </button>
    </div>
    </template>
    
    
    <script lang='ts' setup>
        import { onMounted } from 'vue';
        import { useTemCurSetStore } from "@/store/TenCurSet";
        import { websocket_send } from "@/utils/WebsocketFunc";
        import { TempratureCurrent_Set, SendMessageType } from "@/utils/config";


        const store = useTemCurSetStore();       // store
            const props = defineProps({
              childname: { type: String, default: true },
            });

        onMounted(()=>{
          const sendbutton_name = props.childname + '-button-send';
            const sendButton = document.getElementById(sendbutton_name);
            sendButton.addEventListener('click', handleClick);
            function handleClick() {
              // 发送温度和电流的数据
              send_temprature_current_data();           
              window.console.log('handclick from '+props.childname);
              // send-button-text
            const sendbutton_text_name = props.childname + '-button-send-text';
            const buttonText = document.getElementById(sendbutton_text_name);
              // send button icon
            const sendbutton_icon_name = props.childname + '-button-send-icon';
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
                const sendbutton_text_name = props.childname + '-button-send-text';
                const buttonText = document.getElementById(sendbutton_text_name);
              // send button icon
                const sendbutton_icon_name = props.childname + '-button-send-icon';
                const sendIcon = document.getElementById(sendbutton_icon_name);
                buttonText.style.transform = ``;
                sendIcon.style.transform = ``;
            }
        }) 

        // 发送 温度和电流数据出去
      const send_temprature_current_data = () => {
        const this_current = store.getTemCurValue(props.childname, 'current');
        const this_temprature = store.getTemCurValue(props.childname, 'temprature');
        const send_data_obj:TempratureCurrent_Set = {
          name:props.childname,
          set_current:this_current, 
          set_temprature:this_temprature
        }
        websocket_send(SendMessageType.Order,send_data_obj); // websocket 发送数据接口
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