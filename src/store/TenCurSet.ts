import { defineStore, acceptHMRUpdate } from 'pinia'
import { TempratureCurrent_Set } from '@/utils/config';


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
    SetTempratureCurrentValue(name: string,temprature?:number,current?:number) {
        const TargetIndex:number = GetObjIndexByName(this.TemCurSet, name);
        window.console.log(TargetIndex);
        // 数组中没有这个对象的数据
        if( TargetIndex === -1){
            const temcursetobj: TempratureCurrent_Set = {
                name: name,
                set_temprature: temprature,
                set_current: current,
            }
            this.TemCurSet.push(temcursetobj);     // 将数据存储到数组中
            window.console.log('将数据存储到数组中');
        }
        // 有则更新数据
        else {
  
            if (temprature !== undefined) {
                window.console.log('temprature');
                window.console.log(temprature);
                this.TemCurSet[TargetIndex].set_temprature = temprature;
              }
            
              if (current !== undefined) {
                window.console.log('current');
                window.console.log(current);
                this.TemCurSet[TargetIndex].set_current = current;
              }  
        }
    },
  },
})


