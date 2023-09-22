import { defineStore, acceptHMRUpdate } from 'pinia'
import { TempratureCurrent_Set } from '@/utils/config';
import { number } from 'echarts';
import { websocket_send } from "../utils/WebsocketFunc"
import { SendMessageType } from "../utils/config"

// 根据name来查询数据，返回index
function GetObjIndexByName(TemCurData:TempratureCurrent_Set[], name: string): number {
    for (let i = 0; i < TemCurData.length; i++){
      if (TemCurData[i].name === name) {
        return i;
      }
    }
    return -1;
  }


export const useTemCurSetStore = defineStore({
  id: 'usetemcurset',
  state: () => ({
    TemCurSet: [] as TempratureCurrent_Set[],
   
  }),
  getters: {
    // 获取调节使能
    getTempratureCurrentUsing: (state) => (name:string, property: 'current' | 'temprature') => {
      const targetObj = GetObjIndexByName(state.TemCurSet, name);    // 搜索name对象在数组中的index
      if (targetObj !== -1) {
        if (property === 'current') {
          return state.TemCurSet[targetObj].current_using;    // 获取电流设置使能
          } else if (property === 'temprature') {
          return state.TemCurSet[targetObj].temprature_using;    // 获取温度设置使能
          }
      }
    },
    // 获取调节范围
    getTempratureCurrentTuneRange: (state) => (name:string, property: 'current' | 'temprature') => {
      const targetObj = GetObjIndexByName(state.TemCurSet, name);    // 搜索name对象在数组中的index
      if (targetObj !== -1) {
        if (property === 'current') {
          return state.TemCurSet[targetObj].current_tune_range;    // 获取电流tune range
          } else if (property === 'temprature') {
          return state.TemCurSet[targetObj].temprature_tune_range;    // 获取温度tune range
          }
      }
    },
    getTargetObject: (state) => (name:string) => {
            return state.TemCurSet.find(obj => obj.name === name);
        },

    getTemCurValue: (state) => (name: string, property: 'current' | 'temprature') => {
        const targetObj = GetObjIndexByName(state.TemCurSet, name);    // 搜索name对象在数组中的index
        if (targetObj !== -1) {
            if (property === 'current') {
            return state.TemCurSet[targetObj].set_current;    // 获取设定的电流
            } else if (property === 'temprature') {
            return state.TemCurSet[targetObj].set_temprature;    // 获取设定的温度
            }
        }
        return 0;
        },
  },
  actions: {
      // 是否启动实时间控制
      EnableRealtimeControl(TargetIndex:number){
        let realtime_control_state = this.TemCurSet[TargetIndex].realtime_control; // 获取原来的值
        // 更新实时控制状态
        if(this.TemCurSet[TargetIndex].temprature_using==false &&  this.TemCurSet[TargetIndex].current_using==false){
          realtime_control_state = false
        }
        else{
          realtime_control_state = true
        }
        // 如果发生变化
        if(this.TemCurSet[TargetIndex].realtime_control !== realtime_control_state){
            this.TemCurSet[TargetIndex].realtime_control = realtime_control_state // 更新
            if(realtime_control_state){
              websocket_send(SendMessageType.RealtimeControl, 'true');
            }else{
              websocket_send(SendMessageType.RealtimeControl, 'false');
            }    
        } 
      },
    // 设置是否打开温度或者电流的设置按钮
    EnableTempratureCurrentUsing(name: string,tempratureusing?:boolean,currentusing?:boolean) {
      const TargetIndex:number = GetObjIndexByName(this.TemCurSet, name);
      // 数组中没有这个对象的数据
      if( TargetIndex === -1){
        let temcursetobj: TempratureCurrent_Set;
        websocket_send(SendMessageType.RealtimeControl, 'true'); // 启动实时控制
        if (tempratureusing !== undefined) {
          temcursetobj = {
            name: name,
            temprature_using: tempratureusing,
            set_temprature:0,
            realtime_control:true,
          }
          websocket_send(SendMessageType.TemperatureChannel, 'true'); // 启动温度信道
        }
        else if(currentusing!== undefined){ 
          temcursetobj = {
            name: name,
            current_using: currentusing,
            set_current:0,
            realtime_control:true,
          }
          websocket_send(SendMessageType.CurrentChannel, 'true'); // 启动电流信道
        }
        this.TemCurSet.push(temcursetobj);     // 将数据存储到数组中
        window.console.log('将数据存储到数组中');
        
      
      }
      else
      {  // 有则更新数据
        if (tempratureusing !== undefined) {
          this.TemCurSet[TargetIndex].temprature_using = tempratureusing;
          websocket_send(SendMessageType.TemperatureChannel, tempratureusing ? 'true' : 'false');
        }
        else if(currentusing!== undefined){ 
          websocket_send(SendMessageType.CurrentChannel, currentusing ? 'true' : 'false');
          this.TemCurSet[TargetIndex].current_using = currentusing;
        }
        this.EnableRealtimeControl(TargetIndex);
      } 
      
    },

      // 设置温度或者电流的调节范围
      SetTempratureCurrentTuneRange(name: string,tempraturetune_range?:number,currentune_range?:number) {
        const TargetIndex:number = GetObjIndexByName(this.TemCurSet, name);
        // 数组中没有这个对象的数据
        if( TargetIndex === -1){
          window.console.log('An error occur in setting the tune range');
        }
        else{  // 有则更新数据
          if (tempraturetune_range !== undefined) {
            this.TemCurSet[TargetIndex].temprature_tune_range = tempraturetune_range;
          }
          else if(currentune_range!== undefined) { 
            this.TemCurSet[TargetIndex].current_tune_range = currentune_range;
          }
        } 
      },
    SetTempratureCurrentValue(name: string,temprature?:number,current?:number) {
        const TargetIndex:number = GetObjIndexByName(this.TemCurSet, name);
        window.console.log(TargetIndex);
        // 数组中没有这个对象的数据
        if( TargetIndex === -1){
            window.console.log('Enable the Using function, please...')
        }
        // 有则更新数据
        else {
            if (temprature !== undefined) {
                this.TemCurSet[TargetIndex].set_temprature = temprature;
              }
            
              if (current !== undefined) {
                this.TemCurSet[TargetIndex].set_current = current;
              }  
        }
    },



  },
})


