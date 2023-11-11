// @ts-nocheck
import { defineStore, acceptHMRUpdate } from 'pinia'
import { AmplifierState } from '@/utils/config';



export const useAmplifierStore = defineStore({
  id: 'useamplifiercurrentdata',
  state: () => ({
    Amplifier_Data: {
        Amplifier_ONE : 0,
        Amplifier_TWO : 0,
        Amplifier_THREE : 0,
        AmplifierTemperature:0,
    } as AmplifierState,
  }),
  getters: {
    getTargetCurrent: (state) => (name:string) => {
        if(name.indexOf('ONE')!== -1){
           return state.Amplifier_Data.Amplifier_ONE
 
        }
        else if(name.indexOf('TWO')!== -1){
            return state.Amplifier_Data.Amplifier_TWO
          
        }       
        else if(name.indexOf('THREE')!== -1){
            return state.Amplifier_Data.Amplifier_THREE
        }    
    },
    getTargetTemperature: (state) => () => {
        return state.Amplifier_Data.AmplifierTemperature
        },
    
    },

    
  
  actions: {
        SetAmplifierCurrent(value_one:number,value_two:number,value_three:number){
            this.Amplifier_Data.Amplifier_ONE=value_one ;
            this.Amplifier_Data.Amplifier_TWO=value_two;
            this.Amplifier_Data.Amplifier_THREE=value_three;
        },
        SetAmplifierTemperature(value:number){
            this.Amplifier_Data.AmplifierTemperature=value;
        },
    },
})

