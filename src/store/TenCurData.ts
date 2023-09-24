// @ts-nocheck
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
    MaxDataCacheLength:200,
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

    getCacheArray:(state) => (name:string, property: 'current' | 'temprature') => {
        const traget_obj = GetObjIndexByName(state.TemCurData, name);    // 搜索name对象在数组中的index
        if(traget_obj!==-1){   
            if (property === 'current') {
                return state.TemCurData[traget_obj].current_array;  //电流缓存数据长度
            } 
            else if (property === 'temprature') {
                return state.TemCurData[traget_obj].temprature_array;     //温度缓存数据
            }
            
        }
    },
    getTargetArrayLength: (state) => (name:string, property: 'current' | 'temprature') => {
        const traget_obj = GetObjIndexByName(state.TemCurData, name);    // 搜索name对象在数组中的index
        if(traget_obj!==-1){   
            if (property === 'current') {
                return state.TemCurData[traget_obj].current_data_number;  //电流缓存数据长度
            } 
            else if (property === 'temprature') {
                return state.TemCurData[traget_obj].temprature_data_number;     //温度缓存数据长度
            }
           
        }
    },
  },
  actions: {
    SetTempratureCurrentValue(name: string,latest_temprature:number,latest_current:number) {
        const TargetIndex:number = GetObjIndexByName(this.TemCurData, name);
        // 数组中没有这个对象的数据
        if( TargetIndex === -1){
            let temcurobj:TempratureCurrent_Cache;
            if(latest_temprature !== undefined){
                temcurobj = {
                    name: name,
                    temprature_array: [latest_temprature],
                    latest_temprature: latest_temprature,
                    temprature_data_number:1,
                    current_array:[],
                    current_data_number:0,
                }
            }
            else if(latest_current!== undefined){
                temcurobj = {
                    name: name,
                    temprature_array: [],
                    current_array: [latest_current],
                    latest_current: latest_current,
                    current_data_number:1,
                    temprature_data_number:0,
                }
            }
            this.TemCurData.push(temcurobj);     // 将数据存储到数组中
        }
        // 有则更新数据
        else {
            if(latest_temprature !== undefined){
                const data_length = this.TemCurData[TargetIndex].temprature_data_number;
                if(data_length >= this.MaxDataCacheLength){
                    this.TemCurData[TargetIndex].temprature_array.shift()
                }
                this.TemCurData[TargetIndex].latest_temprature=latest_temprature;
                this.TemCurData[TargetIndex].temprature_array.push(latest_temprature);
                this.TemCurData[TargetIndex].temprature_data_number = data_length + 1;
            }
            else if(latest_current!== undefined){
                // 限制数据为MaxDataCacheLength长度
                const data_length = this.TemCurData[TargetIndex].current_data_number;
                if(data_length >= this.MaxDataCacheLength){
                    this.TemCurData[TargetIndex].current_array.shift()
                }
                // update the data cache
                this.TemCurData[TargetIndex].latest_current=latest_current;
                this.TemCurData[TargetIndex].current_array.push(latest_current);
                this.TemCurData[TargetIndex].current_data_number = data_length + 1;
                }
            }
        }
    },
})

