// @ts-nocheck
import { defineStore, acceptHMRUpdate } from 'pinia'


// 温度显示部分
export interface TemperatureShowValue {
    name:   string ;
    TPV ?:  number;
    TPV_list?: [];
    TPV_List_length?:number;
    TSV?: number;
    PID_P ?: number;
    PID_I ?: number;
    PID_D ?:  number;
    Voltage_Proportion?:number;
} 


// export interface TsvTpvListType {
//     name: string;
//     index :  number;
//     List_length: number;
// }
// export interface TsvTpvList {
//     name: string;
//     List_TPV :  ?[];
//     List_length: number;
// }

// 根据name来查询数据，返回index
function GetObjIndexByName(TemperatureData:TemperatureShowValue, name: string): number {
    for (let i = 0; i < TemperatureData.length; i++){
      if (TemperatureData[i].name === name) {
        return i;
      }
    }
    return -1;
  }



export const useTemperatureDataStore = defineStore({
  id: 'usetemperaturedata',
  state: () => ({
    Temperature_Data: [{
        name:   'Tec_One',
        TPV :   10.00,
        TPV_list:[12,13,14,12,13,15,16,12,13,14,12],
        TPV_List_length:11,
        TSV :   25.00,
        PID_P : 10,
        PID_I : 10,
        PID_D:  10,
        Voltage_Proportion:1, 
    }] as TemperatureShowValue[],
    MaxDataCacheLength:20,
  }),
  getters: {
    getTargetObject: (state) => (name:string) => {
        return state.Temperature_Data.find(obj => obj.name === name);
    },
    getTPVStatus:(state) => (name:string) => {
        const traget_obj = GetObjIndexByName(state.Temperature_Data, name);    // 搜索name对象在数组中的index
        if(traget_obj!==-1){   
            return state.Temperature_Data[traget_obj].TPV;
        }
    },
    getTPVList:(state) => (name:string) => {
        const traget_obj = GetObjIndexByName(state.Temperature_Data, name);
        console.log('get tpv list')    // 搜索name对象在数组中的index
        if(traget_obj!==-1){   
            return state.Temperature_Data[traget_obj].TPV_list;
        }
    },
    getPID_PStatus: (state) => (name:string) => {
        const traget_obj = GetObjIndexByName(state.Temperature_Data, name);    // 搜索name对象在数组中的index
        if(traget_obj!==-1){   
            return state.Temperature_Data[traget_obj].PID_P;
        }
        },
    getPID_IStatus: (state) => (name:string) => {
        const traget_obj = GetObjIndexByName(state.Temperature_Data, name);    // 搜索name对象在数组中的index
        if(traget_obj!==-1){   
            return state.Temperature_Data[traget_obj].PID_I;
        }
        },
    getPID_DStatus: (state) => (name:string) => {
        const traget_obj = GetObjIndexByName(state.Temperature_Data, name);    // 搜索name对象在数组中的index
        if(traget_obj!==-1){   
            return state.Temperature_Data[traget_obj].PID_D;
        }
        },
    getVoltageStatus: (state) => (name:string) => {
        const traget_obj = GetObjIndexByName(state.Temperature_Data, name);    // 搜索name对象在数组中的index
        if(traget_obj!==-1){   
            return state.Temperature_Data[traget_obj].Voltage_Proportion;
        }
        },
    },

    
  actions: {
    SetTPVValue(name: string, temprature:number) {
        const TargetIndex:number = GetObjIndexByName(this.Temperature_Data, name);
        // 数组中没有这个对象的数据
        if( TargetIndex !== -1){
            this.Temperature_Data[TargetIndex].TPV = temprature;
        }
        },
    SetTPVList(name: string, temprature:number) {
        const TargetIndex:number = GetObjIndexByName(this.Temperature_Data, name);
        this.Temperature_Data[TargetIndex].TPV_list.push(temprature);
        this.Temperature_Data[TargetIndex].TPV_List_length += 1;
        if (this.Temperature_Data[TargetIndex].TPV_List_length>=this.MaxDataCacheLength)
            {
                this.Temperature_Data[TargetIndex].TPV_list.shift()
                this.Temperature_Data[TargetIndex].TPV_List_length -= 1;
            }
        },
    
    SetPID_PValue(name: string, PID_p:number) {
        const TargetIndex:number = GetObjIndexByName(this.Temperature_Data, name);
        // 数组中没有这个对象的数据
        if( TargetIndex !== -1){
            this.Temperature_Data[TargetIndex].PID_P = PID_P;
        }
        },
    SetPID_IValue(name: string, PID_i:number) {
        const TargetIndex:number = GetObjIndexByName(this.Temperature_Data, name);
        // 数组中没有这个对象的数据
        if( TargetIndex !== -1){
            this.Temperature_Data[TargetIndex].PID_I = PID_I;
        }
    },
    SetPID_DValue(name: string, PID_d:number) {
        const TargetIndex:number = GetObjIndexByName(this.Temperature_Data, name);
        // 数组中没有这个对象的数据
        if( TargetIndex !== -1){
            this.Temperature_Data[TargetIndex].PID_D = PID_D;
        }
    },
    SetVoltageValue(name: string, voltage:number) {
        const TargetIndex:number = GetObjIndexByName(this.Temperature_Data, name);
        // 数组中没有这个对象的数据
        if( TargetIndex !== -1){
            this.Temperature_Data[TargetIndex].Voltage_Proportion = voltage;
        }
    },
    },
})

