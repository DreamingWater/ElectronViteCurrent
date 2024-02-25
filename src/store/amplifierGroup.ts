// @ts-nocheck
import { defineStore, acceptHMRUpdate } from 'pinia'
import { AmplifierGroupState, CurrentPowerValueModel, AmplifierChannelModel, DataTypeModel,
    AmplifierSettingDataModel,AmplifierGettingDataModel } from '@/types/amplifier';


export const useAmplifierGroupStore = defineStore({
  id: 'use-amplifier-group',
  state: () => ({
    Amplifier_Data: {
        Amplifier_Channel_ONE :   {
            Amplifier_SetPower : 0,
            Amplifier_Current : 10,
            Amplifier_WorkingPower:0,
        },
        Amplifier_Channel_TWO :   {
            Amplifier_SetPower : 0,
            Amplifier_Current : 20,
            Amplifier_WorkingPower:0,
        },
        Amplifier_Channel_THREE : {
            Amplifier_SetPower : 0,
            Amplifier_Current : 30,
            Amplifier_WorkingPower:0,
        },
        AmplifierTemperature:      0,
        AmplifierWorkingStatus:    0,  // 放大器的开关状态
        AmplifierOpenStatus:       0,  // 放大器的工作状态
    } as AmplifierGroupState,
  }),
    getters: {
        getTargetCurrentPowerValue: (state) => (channel_name, value_model) => {
            return state.Amplifier_Data[`Amplifier_Channel_${channel_name}`][`Amplifier_${value_model}`];
        },
        // getTargetParameter('PowerCurrent', 'ONE', 'SetPower')  or getTargetParameter('Temperature')
        getTargetParameter: (state) => (data:AmplifierGettingDataModel) => {
            if (data.data_type === 'PowerCurrent'){
                return state.Amplifier_Data[`Amplifier_Channel_${data.channel_name}`][`Amplifier_${data.value_model}`];
                // return this.getTargetCurrentPowerValue(channel_name, value_model);
            }
            return state.Amplifier_Data[`Amplifier${data.data_type}`];
        },
    },
  actions: {
      // 设置放大器的电流 此时的工作功率 或者 设定功率
        // SetAmplifierPowerCurrentValue('SetPower', 10, 0, 0, 'ONE') or SetAmplifierPowerCurrentValue('SetPower', 10, 30, 20)
        SetAmplifierPowerCurrentValue(value_model:CurrentPowerValueModel,value?:number,value_TWO?:number,value_THREE?:number,channel_name?:AmplifierChannelModel){
            if (channel_name){
                // 给定通道就只设定单个通道的值
                this.Amplifier_Data[`Amplifier_Channel_${channel_name}`][`Amplifier_${value_model}`] =  value;
                return;
            }
            // 没有给定通道就设定所有通道的值
            this.Amplifier_Data.Amplifier_Channel_ONE[`Amplifier_${value_model}`]  = value;
            this.Amplifier_Data.Amplifier_Channel_TWO[`Amplifier_${value_model}`]   = value_TWO;
            this.Amplifier_Data.Amplifier_Channel_THREE[`Amplifier_${value_model}`] = value_THREE;
            },
      // SetTargetData('PowerCurrent', 10, 0, 0, 'ONE','SetPower') or SetAmplifierData('Temperature', 20)
        SetTargetData( data: AmplifierSettingDataModel ){
            if (data.data_type === 'PowerCurrent'){
                this.SetAmplifierPowerCurrentValue(data.value_model, data.value, data.value_TWO, data.value_THREE, data.channel_name);
            } else {
                this.Amplifier_Data[`Amplifier${data.data_type}`]= data.value;
            }
        }
    },
})

