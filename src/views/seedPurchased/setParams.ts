import {  SeedPurchasedSettingDataModel,SeedPurchasedGettingDataModel } from '@/types/seedPurchased';
import { ref } from 'vue';

// 显示的数值  下位机的设定温度  设定的P I D
const show_working_power:SeedPurchasedGettingDataModel = {
    data_type: 'WorkingPower',
};
const show_working_wavelength:SeedPurchasedGettingDataModel = {
    data_type: 'WorkingWavelength',
};

// 设置的数值  希望发送的设定温度  希望发送的设定的P I D
const set_power_data:SeedPurchasedSettingDataModel = {
    data_type: 'SetPower',
    value: 0,
};
const set_wavelength_data:SeedPurchasedSettingDataModel = {
    data_type: 'SetWavelength',
    value: 1540.216,
};
/////////// 设定的数值区间 end //////////////////////////

export const shown_setting_power_wavelength = [
    {
        'name': '设定功率(μw)',
        'show_data': show_working_power,
        'set_data': set_power_data,
        'min_value':0,
        'max_value':40000,
        'precision': 2,
    },
    {
        'name': '设定波长(nm)',
        'show_data': show_working_wavelength,
        'set_data':set_wavelength_data ,
        'min_value':1539.80,
        'max_value':1540.65,
        'precision': 4,
    }
]

export const packaged_setting_power_wavelength = ref([
    [show_working_power,set_power_data,5000],
    [show_working_wavelength,set_wavelength_data,0],
]); // send button 发送的数据包

export const packaged_setting_power = ref([
    [show_working_power,set_power_data,5000],
]); // send button 发送的数据包