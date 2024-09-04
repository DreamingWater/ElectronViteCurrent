

import { scheduler } from "../base/scheduler";
import { serialAmplifier } from "./ScheAmplifier";
import { serialSeeder } from "./ScheSeeder";
import { serialTemperature } from "./ScheTemp";

class SchedulerSerial {
    // data 为发送的数据object []
    // current_page 为当前页面
    // data_package 为数据包 [object object[data_type:'SetPower' ] interval]
    addSerialSendPackagesTask(data: any[], current_page:any, interval: number, other_instruct: 'initial' | 'internal' | null=null,executionMode: 'once' | 'interval' | 'continuous'='once') {
        scheduler.serial_data_send_task(data, current_page, interval, other_instruct,executionMode);
    }
    addShutdownTask( interval: number, dealing_store:any=null,other_instruct: 'initial' | 'internal' | null=null,executionMode: 'once' | 'interval' | 'continuous'='interval', Two_Step_Shutdown:boolean=false) {
        let store = dealing_store;
        if (store.$id === 'use-seed_purchased') {
            // 如果是 种子源 处理方法是
            // 设置的数值  希望发送的设定温度  希望发送的设定的P I D
            scheduler.cancelTask('Seed-SetPower') // 取消所有的setting任务
            // this.cancelTask('Seed-DataUpload') // 取消振荡器的上传任务

            serialSeeder.ShutdownSeedTask(interval,store,other_instruct,executionMode);
        }
       else if (store.$id === 'use-amplifier-group') {
            // 如果 是 其他设备
            // 关闭 放大器3
            scheduler.cancelTask('Amplifier-PowerCurrent-TWO') // 取消所有的setting任务
            scheduler.cancelTask('Amplifier-PowerCurrent-ONE') // 取消所有的setting任务
            scheduler.cancelTask('Amplifier-PowerCurrent-THREE') // 取消所有的setting任务
            // this.cancelTask('Amplifier-DataUpload') // 取消放大器的上传任务
            serialAmplifier.ShutdownAmplifierTask(interval,store,other_instruct,executionMode,Two_Step_Shutdown);
        }
       else if (store.$id === 'use-temperature') {

            serialTemperature.ShutdownTemperatureTask(interval,store,other_instruct,executionMode);
        }
        // 关闭  放大器2
    }

}


export const schedulerSerial = new SchedulerSerial();