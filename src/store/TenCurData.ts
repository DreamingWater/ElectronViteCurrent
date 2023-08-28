import { defineStore, acceptHMRUpdate } from 'pinia'
import { TempratureCurrent_Cache } from '@/utils/config';


// 根据name来查询数据，返回index
function GetObjIndexByName(TemCurData:TempratureCurrent_Cache[], name: string): number {
    for (let i = 0; i < TemCurData.length; i++){
      if (TemCurData[i].name === name) {
        return i;
      }
    }
    return -1;
  }


export const useTemCurStore = defineStore({
  id: 'usetemcurdata',
  state: () => ({
    TemCurData: [] as TempratureCurrent_Cache[],
  }),
  getters: {

    getTargetObject: (state) => (name:string) => {
            return state.TemCurData.find(obj => obj.name === name);
        },

    getLatestCurrent:(state) => (name:string) => {
        const traget_obj = GetObjIndexByName(state.TemCurData, name);    // 搜索name对象在数组中的index
        if(traget_obj!==-1){   
            return state.TemCurData[traget_obj].latest_current;
        }
    },
    getLatestTemprature:(state) => (name:string) => {
        const traget_obj = GetObjIndexByName(state.TemCurData, name);    // 搜索name对象在数组中的index
        if(traget_obj!==-1){   
            return state.TemCurData[traget_obj].latest_temprature;
        }
    },
    getCurrentArray:(state) => (name:string) => {
        const traget_obj = GetObjIndexByName(state.TemCurData, name);    // 搜索name对象在数组中的index
        if(traget_obj!==-1){   
            return state.TemCurData[traget_obj].current_array;
        }
    },
    getTempratureArray:(state) => (name:string) => {
        const traget_obj = GetObjIndexByName(state.TemCurData, name);    // 搜索name对象在数组中的index
        if(traget_obj!==-1){   
            return state.TemCurData[traget_obj].temprature_array;
        }
    },
    getTargetArrayLength: (state) => (name:string) => {
        const traget_obj = GetObjIndexByName(state.TemCurData, name);    // 搜索name对象在数组中的index
        if(traget_obj!==-1){   
            return state.TemCurData[traget_obj].data_number;
        }
    },
  },
  actions: {
    SetTempratureValue(name: string,latest_temprature:number,latest_current:number) {
        const TargetIndex:number = GetObjIndexByName(this.TemCurData, name);
        // 数组中没有这个对象的数据
        if( TargetIndex === -1){
            const temcurobj:TempratureCurrent_Cache = {
                name: name,
                temprature_array: [latest_temprature],
                current_array:[latest_current],
                latest_temprature: latest_temprature,
                latest_current: latest_current,
                data_number:1,
            }
            this.TemCurData.push(temcurobj);     // 将数据存储到数组中
        }
        // 有则更新数据
        else {
            this.TemCurData[TargetIndex].latest_current=latest_current;
            this.TemCurData[TargetIndex].latest_temprature=latest_temprature;
            this.TemCurData[TargetIndex].current_array.push(latest_current);
            this.TemCurData[TargetIndex].temprature_array.push(latest_temprature);
            this.TemCurData[TargetIndex].data_number = this.TemCurData[TargetIndex].data_number+1;
            
        }
    },
    SetCurrentValue(name: string,latest_current:number) {
        // this.testData = data;
    }
  },
})

