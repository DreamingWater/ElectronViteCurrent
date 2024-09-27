import {PageLocationStateEnum, usePageLocationState} from "@/api/pageLocation";
import {getStoreByPageLocation} from "@/store/SerialGroup";
import { serial_data_package_factory } from "@/api/SerialSendPackage/index";
import { scheduler } from "../base/scheduler";
import {OscillatorSettingDataModel,OscillatorGettingDataModel} from "../../../types/oscillator";
import {cut_data_package_list} from "@/api/SerialSendPackage/packageListCutting";
import { useOscillatorGroupStore} from "@/store/oscillatorGroup";


class SerialOscillator {

    HeartReplyTask( interval: number,other_instruct: 'initial' | 'internal' | null=null,executionMode: 'once' | 'interval' | 'continuous'='interval'){
        const store_result = getStoreByPageLocation(PageLocationStateEnum.Oscillator);
        const serial_store = store_result.store();

        const heart_package = [{
            data_type: 'HeartReply',
            value:1,
        }]
        const packaged_heart_data = serial_data_package_factory(heart_package, PageLocationStateEnum.Oscillator, other_instruct);
        let heart_package_name = `${packaged_heart_data[packaged_heart_data.length-1]['data_type']}`;
        // console.log('packaged_heart_data',packaged_heart_data.toString('hex'));
        scheduler.addTask(heart_package_name, serial_store.sendSerialData, packaged_heart_data, interval,executionMode);
    }

    SetCurTempValueTask(interval: number,other_instruct: 'initial' | 'internal' | null=null,executionMode: 'once' | 'interval' | 'continuous'='interval',TargetString:'Temperature' | 'Current'='Current'){
        const working_data:OscillatorSettingDataModel = {
            data_type: `Working${TargetString}`,
            value: 0,
        };
        const set_data:OscillatorSettingDataModel = {
            data_type: `Set${TargetString}`,
            value: 0,
        };
        const packaged_data = [
            [working_data,set_data,5000], // send button 发送的数据包
        ]; // send button 发送的数据包
        let valid_data;
        // 是否需要cut一下
        if (Array.isArray(packaged_data[0])) {
            const oscillator_store = useOscillatorGroupStore();
            valid_data = cut_data_package_list(packaged_data, oscillator_store);
        } else {
            valid_data = packaged_data;
        }
        scheduler.serial_data_send_task(valid_data, PageLocationStateEnum.Oscillator, interval, other_instruct,executionMode);
    };
    SetTemperatureTask(interval: number,other_instruct: 'initial' | 'internal' | null=null,executionMode: 'once' | 'interval' | 'continuous'='interval'){
        this.SetCurTempValueTask(interval,other_instruct,executionMode,'Temperature');
    };
    SetCurrentTask(interval: number,other_instruct: 'initial' | 'internal' | null=null,executionMode: 'once' | 'interval' | 'continuous'='interval'){
        this.SetCurTempValueTask(interval,other_instruct,executionMode,'Current');
    }

}


export const serialOscillator = new SerialOscillator();



