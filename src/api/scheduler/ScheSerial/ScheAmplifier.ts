import { PageLocationStateEnum, usePageLocationState} from "@/api/pageLocation";
import { getStoreByPageLocation } from "@/store/SerialGroup";
import { serial_data_package_factory } from "@/api/SerialSendPackage/index";
import { cut_data_package_list } from "@/api/SerialSendPackage/packageListCutting";
import { AmplifierGettingDataModel, AmplifierSettingDataModel } from "../../../types/amplifier";
import { scheduler } from "../base/scheduler";

class SerialAmplifier {
    // change_step 为设置的步长
    set_amplifier_one_channel_data(store:any=null,other_instruct: 'initial' | 'internal' | null=null,channel:'TWO'|'THREE'|'ONE'='TWO', set_power=0,change_step=3000) {
        const amplifier_channel2set_power_data:AmplifierSettingDataModel = {
            data_type: 'PowerCurrent',
            value: set_power,
            channel_name: channel,
            value_model:'SetPower',
        };
        const amplifier_channel2show_workingpower_data:AmplifierGettingDataModel = {
            data_type: 'PowerCurrent',
            channel_name:  channel,
            value_model: 'WorkingPower'
        };

        const amplifier_channel2_packaged_data = [
            [amplifier_channel2show_workingpower_data,amplifier_channel2set_power_data,change_step]
        ];
        store.setTargetParameter(amplifier_channel2set_power_data);

        const amplifier_channel2_packaged_setting_power_data = cut_data_package_list(amplifier_channel2_packaged_data,store);
        console.log('packaged_setting_power_data',amplifier_channel2_packaged_setting_power_data)
        const amplifier_channel2packaged_data = serial_data_package_factory(amplifier_channel2_packaged_setting_power_data[0], PageLocationStateEnum.Amplifier, other_instruct);
        return amplifier_channel2packaged_data;
    }

    SetAmplifierThreeTask( set_power:any, interval: number, store:any=null,other_instruct: 'initial' | 'internal' | null=null,executionMode: 'once' | 'interval' | 'continuous'='interval')
    {
        const set_channel_three_data = this.set_amplifier_one_channel_data(store,other_instruct,'THREE',set_power);
        const amplifier_store_result = getStoreByPageLocation(PageLocationStateEnum.Amplifier);
        const this_amplifier_store_result = amplifier_store_result.store();
        let shut_channel_name = `${set_channel_three_data[set_channel_three_data.length-1]['data_type']}`;
        scheduler.addTask(shut_channel_name, this_amplifier_store_result.sendSerialData, set_channel_three_data, interval,executionMode);

    }

    ShutdownAmplifierTask( interval: number, store:any=null,other_instruct: 'initial' | 'internal' | null=null,executionMode: 'once' | 'interval' | 'continuous'='interval', Two_Step_Shutdown:boolean=false)
    {

        const shut_channel_three_data = this.set_amplifier_one_channel_data(store,other_instruct,'THREE',0,10000);   // 变化步长为20 W
        const shut_channel_two_data = this.set_amplifier_one_channel_data(store,other_instruct,'TWO',0,5000);                     // 变化步长为 5 W
        const shut_channel_one_data = this.set_amplifier_one_channel_data(store,other_instruct,'ONE',0,4000);                     // 变化步长为 5 W

        // shutdown the amplifier module
        function shut_down_module(store:any=null,other_instruct: 'initial' | 'internal' | null=null) {
            const module_enable_status:AmplifierSettingDataModel = {
                data_type: 'EnableStatus',
                value:0,
            }
            store.setTargetParameter(module_enable_status);
            const module_shut_data = serial_data_package_factory([module_enable_status], PageLocationStateEnum.Amplifier, other_instruct);

            return module_shut_data;
        }
        const amplifier_module_shut_data = shut_down_module(store,other_instruct);
        console.log('shut amplifier code is ', amplifier_module_shut_data)

        const amplifier_store_result = getStoreByPageLocation(PageLocationStateEnum.Amplifier);
        const this_amplifier_store_result = amplifier_store_result.store();

        if (!Two_Step_Shutdown) {

            let amplifier_module_packaged_data = [...shut_channel_three_data, ...shut_channel_two_data,...shut_channel_one_data, ...amplifier_module_shut_data];
            let amplifier_channel2this_data_package_name = `${amplifier_module_packaged_data[amplifier_module_packaged_data.length-1]['data_type']}`;   // 命名为shutdown
            scheduler.addTask(amplifier_channel2this_data_package_name, this_amplifier_store_result.sendSerialData, amplifier_module_packaged_data, interval,executionMode);
            console.log('shut amplifier two step shutdown')

        }else {

            let amplifier_module_channel3_packaged_data = [ ...shut_channel_three_data, ...amplifier_module_shut_data];
            scheduler.addTask('Amplifier-channel3_shut_down', this_amplifier_store_result.sendSerialData, amplifier_module_channel3_packaged_data, interval,executionMode);
            scheduler.addTask('Amplifier-channel2_shut_down', this_amplifier_store_result.sendSerialData, shut_channel_two_data, interval,executionMode);
            // scheduler.addTask('Amplifier-PowerCurrent-TWO', this_amplifier_store_result.sendSerialData, shut_channel_two_data, interval,executionMode);
            scheduler.addTask('Amplifier-channel1_shut_down', this_amplifier_store_result.sendSerialData, shut_channel_one_data, interval,executionMode);
            console.log('shut amplifier one step shutdown')
        }
    }
}

export const serialAmplifier = new SerialAmplifier();
