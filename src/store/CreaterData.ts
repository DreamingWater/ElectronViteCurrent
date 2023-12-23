// @ts-nocheck
import { defineStore, acceptHMRUpdate } from 'pinia'


// 温度显示部分
export interface OscillatorDataState {
    name:   string ;
    Resistance?:  number;
    Voltage?:number;
    Voltage_list?:[];
    Voltage_list_length:number;
} 


function GetObjIndexByName(Data:OscillatorDataState[], name: string): number {
    for (let i = 0; i < Data.length; i++){
      if (Data[i].name === name) {
        return i;
      }
    }
    return -1;
  }



export const useOscillatorDataStore = defineStore({
  id: 'useoscillatordata',
  state: () => ({
    Oscillator_Data: [{
        name:   'Creater',
        Resistance: 10000,
        Voltage:0, 
        Voltage_list:[12,13,14,12,13,15,16,12,13,14,12], 
        Voltage_list_length:11,
    }] as OscillatorDataState[],
    MaxDataCacheLength:60,
  }),
  getters: {
    getTargetObject: (state) => (name:string) => {
        return state.Oscillator_Data.find(obj => obj.name === name);
    },
    getVoltageStatus:(state) => (name:string) => {
        const traget_obj = GetObjIndexByName(state.Oscillator_Data, name);    // 搜索name对象在数组中的index
        if(traget_obj!==-1){   
            return state.Oscillator_Data[traget_obj].Voltage;
        }
    },
    getVoltageList:(state) => (name:string) => {
        const traget_obj = GetObjIndexByName(state.Oscillator_Data, name);
        if(traget_obj!==-1){   
            return state.Oscillator_Data[traget_obj].Voltage_list;
        }
    },
    getResistanceStatus: (state) => (name:string) => {
        const traget_obj = GetObjIndexByName(state.Oscillator_Data, name);    // 搜索name对象在数组中的index
        if(traget_obj!==-1){   
            return state.Oscillator_Data[traget_obj].Resistance;
        }
        },
    },

    
  actions: {
    SetVoltageValue(name: string, updated_value:number) {
        const TargetIndex:number = GetObjIndexByName(this.Oscillator_Data, name);
        // 数组中没有这个对象的数据
        if( TargetIndex !== -1){
            this.Oscillator_Data[TargetIndex].Voltage = updated_value;
        }
        },
    SetVoltageList(name: string, temprature:number) {
        const TargetIndex:number = GetObjIndexByName(this.Oscillator_Data, name);
        this.Oscillator_Data[TargetIndex].Voltage_list.push(temprature);
        this.Oscillator_Data[TargetIndex].Voltage_list_length += 1;
        if (this.Oscillator_Data[TargetIndex].Voltage_list_length>=this.MaxDataCacheLength)
            {
                this.Oscillator_Data[TargetIndex].Voltage_list.shift()
                this.Oscillator_Data[TargetIndex].Voltage_list_length -= 1;
            }
        },
    
    SetResistanceValue(name: string, resistence:number) {
        const TargetIndex:number = GetObjIndexByName(this.Oscillator_Data, name);
        // 数组中没有这个对象的数据
        if( TargetIndex !== -1){
            this.Oscillator_Data[TargetIndex].Resistance = resistence;
        }
        },
    SetResistanceVoltageValue(name: string, resistance:number, voltage:number) {
        const TargetIndex:number = GetObjIndexByName(this.Oscillator_Data, name);
        // 数组中没有这个对象的数据
        if( TargetIndex !== -1){
            this.Oscillator_Data[TargetIndex].Voltage = voltage;
            this.Oscillator_Data[TargetIndex].Resistance = resistance;
        }
        },
    },
})

