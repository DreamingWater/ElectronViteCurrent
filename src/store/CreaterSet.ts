// @ts-nocheck
import { defineStore, acceptHMRUpdate } from 'pinia'



// 温度控制部分
  export interface OscillatorState {
    name:   string;
    SettingCurrent :   number;
    PID_P : number;
    PID_I : number;
    PID_D:  number;
} 


// 根据name来查询数据，返回index
function GetObjIndexByName(Data:OscillatorDataState[], name: string): number {
    for (let i = 0; i < Data.length; i++){
      if (Data[i].name === name) {
        return i;
      }
    }
    return -1;
  }



export const useOscillatorStore = defineStore({
  id: 'useoscillatorsetting',
  state: () => ({
    Oscillator_Data: [{
        name:   'Creater',
        SettingCurrent :   0,
        PID_P : 1,
        PID_I : 2,
        PID_D:  0,
    }] as OscillatorState[],

  }),
  getters: {
    getTargetObject: (state) => (name:string) => {
        return state.Oscillator_Data.find(obj => obj.name === name);
    },
    getCurrentStatus:(state) => (name:string) => {
        const traget_obj = GetObjIndexByName(state.Oscillator_Data, name);    // 搜索name对象在数组中的index
        if(traget_obj!==-1){   
            return state.Oscillator_Data[traget_obj].SettingCurrent;
        }
    },
    getPID_PStatus: (state) => (name:string) => {
        const traget_obj = GetObjIndexByName(state.Oscillator_Data, name);    // 搜索name对象在数组中的index
        if(traget_obj!==-1){   
            return state.Oscillator_Data[traget_obj].PID_P;
        }
        },
    getPID_IStatus: (state) => (name:string) => {
        const traget_obj = GetObjIndexByName(state.Oscillator_Data, name);    // 搜索name对象在数组中的index
        if(traget_obj!==-1){   
            return state.Oscillator_Data[traget_obj].PID_I;
        }
        },
    getPID_DStatus: (state) => (name:string) => {
        const traget_obj = GetObjIndexByName(state.Oscillator_Data, name);    // 搜索name对象在数组中的index
        if(traget_obj!==-1){   
            return state.Oscillator_Data[traget_obj].PID_D;
        }
        },
    },

    
  actions: {
    SetCurrentValue(name: string, updated_value:number) {
        const TargetIndex:number = GetObjIndexByName(this.Oscillator_Data, name);
        // 数组中没有这个对象的数据
        if( TargetIndex === -1){
            console.log('振荡器store错误')
        }
        // 有则更新数据
        else {
            this.Oscillator_Data[TargetIndex].SettingCurrent = updated_value;
            }
        },
    
    SetPID_PValue(name: string, PID_P:number) {
        const TargetIndex:number = GetObjIndexByName(this.Oscillator_Data, name);
        // 数组中没有这个对象的数据
        if( TargetIndex !== -1){
            this.Oscillator_Data[TargetIndex].PID_P = PID_P;
        }
        },
    SetPID_IValue(name: string, PID_I:number) {
        const TargetIndex:number = GetObjIndexByName(this.Oscillator_Data, name);
        // 数组中没有这个对象的数据
        if( TargetIndex !== -1){
            this.Oscillator_Data[TargetIndex].PID_I = PID_I;
        }
    },
    SetPID_DValue(name: string, PID_D:number) {
        const TargetIndex:number = GetObjIndexByName(this.Oscillator_Data, name);
        // 数组中没有这个对象的数据
        if( TargetIndex !== -1){
            this.Oscillator_Data[TargetIndex].PID_D = PID_D;
        }
    }
    },
})

