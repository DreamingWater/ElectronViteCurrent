
import {PageLocationStateEnum, usePageLocationState} from "@/api/pageLocation";
import {getStoreByPageLocation} from "@/store/SerialGroup";
import { serial_data_package_factory } from "@/api/SerialSendPackage/index";
import {TemperatureSettingDataModel} from "../../../types/temperature";

import { scheduler } from "../base/scheduler";

class SerialTemperature {
    ShutdownTemperatureTask( interval: number, store:any=null,other_instruct: 'initial' | 'internal' | null=null,executionMode: 'once' | 'interval' | 'continuous'='interval'){
        const temperature_store_result = getStoreByPageLocation(PageLocationStateEnum.TemperaturePPLN);
        const this_temperature_store_result = temperature_store_result.store();

        const temperature_enable_status:TemperatureSettingDataModel = {
            data_type: 'EnableStatus',
            value:0,
        }
        store.setTargetParameter(temperature_enable_status);
        const temperature_packaged_shut_data = serial_data_package_factory([temperature_enable_status], PageLocationStateEnum.TemperaturePPLN, other_instruct);
        console.log('temperature_packaged_shut_data',temperature_packaged_shut_data);
        let temperature__package_name = `${temperature_packaged_shut_data[temperature_packaged_shut_data.length-1]['data_type']}`;
        scheduler.addTask(temperature__package_name, this_temperature_store_result.sendSerialData, temperature_packaged_shut_data, interval,executionMode);
    }
}


export const serialTemperature = new SerialTemperature();
