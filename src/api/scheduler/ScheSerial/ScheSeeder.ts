import { PageLocationStateEnum, usePageLocationState} from "@/api/pageLocation";
import { getStoreByPageLocation} from "@/store/SerialGroup";
import { serial_data_package_factory } from "@/api/SerialSendPackage/index";
import { cut_data_package_list } from "@/api/SerialSendPackage/packageListCutting";
import { SeedPurchasedGettingDataModel, SeedPurchasedSettingDataModel} from "../../../types/seedPurchased";
import { scheduler } from "../base/scheduler";

class SerialSeeder {
    ShutdownSeedTask( interval: number, store:any=null,other_instruct: 'initial' | 'internal' | null=null,executionMode: 'once' | 'interval' | 'continuous'='interval')
    {
        const set_power_data:SeedPurchasedSettingDataModel = {
            data_type: 'SetPower',
            value: 0,
        };

        const show_working_power:SeedPurchasedGettingDataModel = {
            data_type: 'WorkingPower',
        };
        const packaged_setting_power = [
            [show_working_power,set_power_data,5000], // send button 发送的数据包
        ]; // send button 发送的数据包
        store.setTargetParameter(set_power_data);
        const packaged_setting_power_data = cut_data_package_list(packaged_setting_power,store);
        console.log('packaged_setting_power_data',packaged_setting_power_data)
        const packaged_power_setting_data = serial_data_package_factory(packaged_setting_power_data[0], PageLocationStateEnum.SeedPurchased, other_instruct);

        const enable_status:SeedPurchasedSettingDataModel = {
            data_type: 'EnableStatus',
            value:0,
        }
        store.setTargetParameter(enable_status);
        const packaged_shut_data = serial_data_package_factory([enable_status], PageLocationStateEnum.SeedPurchased, other_instruct);
        const packaged_data = [...packaged_power_setting_data, ...packaged_shut_data];
        let this_data_package_name = `${packaged_data[packaged_data.length-1]['data_type']}`;   // 命名为shutdown
        const store_result = getStoreByPageLocation(PageLocationStateEnum.SeedPurchased);
        const serial_store = store_result.store();
        console.log('packaged_data',packaged_data);
        scheduler.addTask(this_data_package_name, serial_store.sendSerialData, packaged_data, interval,executionMode);
    }
}


export const serialSeeder = new SerialSeeder();



