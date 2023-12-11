// @ts-nocheck
import { defineStore, acceptHMRUpdate } from 'pinia'
import { TemperatureState  } from '@/utils/config';


// 根据name来查询数据，返回index
function GetObjIndexByName(TemperatureData:TemperatureState[], name: string): number {
    for (let i = 0; i < TemperatureData.length; i++){
      if (TemperatureData[i].name === name) {
        return i;
      }
    }
    return -1;
  }



export const useTemperatureStore = defineStore({
  id: 'usetemperaturedata',
  state: () => ({
    Temperature_Data: [{
        name:   'Tec_One',
        TSV :   25,
        PID_P : 10,
        PID_I : 10,
        PID_D:  10,
        Voltage_Proportion:1, 
    },{
        name:   'Tec_Two',
        TSV :   256,
        PID_P : 150,
        PID_I : 150,
        PID_D:  150,
        Voltage_Proportion:15, 
    } ] as TemperatureState[],
  }),
  getters: {
    getTargetObject: (state) => (name:string) => {
        return state.Temperature_Data.find(obj => obj.name === name);
    },
    getTSVStatus:(state) => (name:string) => {
        const traget_obj = GetObjIndexByName(state.Temperature_Data, name);    // 搜索name对象在数组中的index
        if(traget_obj!==-1){   
            return state.Temperature_Data[traget_obj].TSV;
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
    SetTempratureValue(name: string, temprature:number) {
        const TargetIndex:number = GetObjIndexByName(this.Temperature_Data, name);
        // 数组中没有这个对象的数据
        if( TargetIndex === -1){
            console.log('温度store错误')
        }
        // 有则更新数据
        else {
            this.Temperature_Data[TargetIndex].TSV = temprature;
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
    SetObjectValue(temperature_obj:TemperatureState) {
        const TargetIndex:number = GetObjIndexByName(this.Temperature_Data, temperature_obj['name']);
        // 数组中没有这个对象的数据
        if( TargetIndex !== -1){
            // console.log('temperature store');
            console.log(temperature_obj);
          
            this.Temperature_Data[TargetIndex] = temperature_obj;
            console.log(this.Temperature_Data);
        }
    }
    },
})

