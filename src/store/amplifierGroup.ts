// @ts-nocheck
import { defineStore, acceptHMRUpdate } from 'pinia'
import { AmplifierGroupState, CurrentPowerValueModel, AmplifierChannelModel, DataTypeModel,
    AmplifierSettingDataModel,AmplifierGettingDataModel } from '@/types/amplifier';
import {PidParameter} from "../types/amplifier";

function createAmplifierGroupStore(id: string) {
    return defineStore({
        id,
        state: () => ({
            Data: {
                Channel_ONE :   {
                    SetPower :   0,
                    Current :    0,
                    WorkingPower:0,
                },
                Channel_TWO :   {
                    SetPower :   0,
                    Current :    0,
                    WorkingPower:0,
                },
                Channel_THREE : {
                    SetPower :   0,
                    Current :    0,
                    WorkingPower:0,
                },
                Temperature:      0,
                WorkingStatus:    0,  // 放大器的开关状态
                EnableStatus:     0,  // 放大器的工作状态
                PidParameters:{
                    SetProportional: 1,
                    SetIntegral: 1,
                    SetDerivative: 0,
                } as PidParameter,
                PID_Enable : 0,
            } as AmplifierGroupState,
        }),
        getters: {
            getTargetCurrentPowerValue: (state) => (channel_name, value_model) => {
                return state.Data[`Channel_${channel_name}`][`${value_model}`];
            },
            getTargetParameter: (state) => (data:AmplifierGettingDataModel) => {
                if (data.data_type === 'PowerCurrent'){
                    return state.Data[`Channel_${data.channel_name}`][`${data.value_model}`];
                }
                if (data.data_type in state.Data.PidParameters) {
                    return state.Data.PidParameters[data.data_type];
                }
                return state.Data[`${data.data_type}`];
            },
        },
        actions: {
            setAmplifierPowerCurrentValue(value_model:CurrentPowerValueModel,value?:number,value_TWO?:number,value_THREE?:number,channel_name?:AmplifierChannelModel){
                if (channel_name){
                    this.Data[`Channel_${channel_name}`][`${value_model}`] =  value;
                    return;
                }
                this.Data.Channel_ONE[`${value_model}`]  = value;
                this.Data.Channel_TWO[`${value_model}`]   = value_TWO;
                this.Data.Channel_THREE[`${value_model}`] = value_THREE;
            },
            //        const amplifier_channel2set_power_data:AmplifierSettingDataModel = {
            //             data_type: 'PowerCurrent',
            //             value: 0,
            //             channel_name: 'TWO',
            //             value_model:'SetPower',
            //         };
            setTargetParameter( data: AmplifierSettingDataModel ){
                if (data.data_type === 'PowerCurrent'){
                    this.setAmplifierPowerCurrentValue(data.value_model, data.value, data.value_TWO, data.value_THREE, data.channel_name);
                } else if (data.data_type in this.Data.PidParameters){
                    this.Data.PidParameters[data.data_type] = data.value;
                }else
                {
                    this.Data[`${data.data_type}`]= data.value;
                }
            }
        },
    });
}

export const useAmplifierGroupStore = createAmplifierGroupStore('use-amplifier-group');