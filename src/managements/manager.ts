import { scheduler } from '@/api/schedulerPipeline';
import {AmplifierGettingDataModel, AmplifierSettingDataModel} from "../types/amplifier";
import {SeedPurchasedGettingDataModel, SeedPurchasedSettingDataModel} from "../types/seedPurchased";
import {MonitorGettingDataModel} from "../types/manager";
import {PageLocationStateEnum} from "../api/pageLocation";

export class Manager {
    private seedPurchasedStore: any;
    private amplifierGroupStore: any;
    private managerStore: any;
    private checkIntervalId: NodeJS.Timeout | null = null;
    private readonly THRESHOLD_Seed = 1000; // 你的阈值
    private readonly THRESHOLD_Amplifier = 1000; // 你的阈值 1000 mA
    private AllowCheckAmplifier = true;

    constructor(seedStore: any, amplifierStore: any, managerStore: any) {
        this.seedPurchasedStore = seedStore;
        this.amplifierGroupStore = amplifierStore;
        this.managerStore = managerStore;
    }

    checkAmplifierPower() {
        this.checkIntervalId = setInterval(() => {
            const show_working_power:SeedPurchasedGettingDataModel = {
                data_type: 'SamplePower',
            };
            const sampleSeedPower = this.seedPurchasedStore.getTargetParameter(show_working_power);
            const get_current1_data:AmplifierGettingDataModel = {
                data_type: 'PowerCurrent',
                channel_name:  'ONE',
                value_model: 'Current'
            };
            const get_current2_data:AmplifierGettingDataModel = {
                data_type: 'PowerCurrent',
                channel_name:  'TWO',
                value_model: 'Current'
            };
            const get_current3_data:AmplifierGettingDataModel = {
                data_type: 'PowerCurrent',
                channel_name:  'THREE',
                value_model: 'Current'
            };
            const sampleAmplifierOneParams = this.amplifierGroupStore.getTargetParameter(get_current1_data); // 假设这是一个包含三个通道 setPower 的数组
            const sampleAmplifierTwoParams = this.amplifierGroupStore.getTargetParameter(get_current2_data);// 假设这是一个包含三个通道 setPower 的数组
            const sampleAmplifierThreeParams = this.amplifierGroupStore.getTargetParameter(get_current3_data); // 假设这是一个包含三个通道 setPower 的数组

            if (sampleSeedPower > this.THRESHOLD_Seed) {
                       // 如果 samplePower 低于阈值，不允许设置 setPower
                // 在这里，你可以添加阻止设置 setPower 的代码
            } else if(this.AllowCheckAmplifier && (sampleAmplifierTwoParams>this.THRESHOLD_Amplifier || sampleAmplifierThreeParams>this.THRESHOLD_Amplifier) ){
                // this.AllowCheckAmplifier = false;
               if (!scheduler.hasTask('Amplifier_channel2_shut_down') || !scheduler.hasTask('Amplifier_channel3_shut_down') ||
                   !scheduler.hasTask('Amplifier-EnableStatus'))    // 如果没有关闭任务的话，就启动关闭任务
               {
                   console.log('manager shutdown amplifier task')
                   scheduler.ShutdownAmplifierTask(1,this.amplifierGroupStore,null,'interval',true)     // 这个时间的设置是为了防止在关闭的时候，还有任务在执行
               }
            }
        }, 2000);

    }
    checkManager() {
        const AllowedAmplifierCurrent = 1000;   // 10 W 功率对应电流为多大
        const Voltage_Limit = 0.3;   // 此时对应电压，正常情况下电压值应该高于这个值
        this.checkIntervalId = setInterval(() => {


            const get_current3_data:AmplifierGettingDataModel = {
                data_type: 'PowerCurrent',
                channel_name:  'THREE',
                value_model: 'Current'
            };
            const sampleAmplifierThreeParams = this.amplifierGroupStore.getTargetParameter(get_current3_data); // 假设这是一个包含三个通道 setPower 的数组

            if (sampleAmplifierThreeParams > AllowedAmplifierCurrent) {
                // 第三级 开光之后 才需要启动检测
                const show_back_power:MonitorGettingDataModel = {
                    data_type: 'BackPower'
                };
                const sampleBackPower = this.managerStore.getTargetParameter(show_back_power);
                if(sampleBackPower < Voltage_Limit) {
                    // 在这里，需要关闭放大器3
                    if (!scheduler.hasTask('Amplifier_channel3_shut_down') ||
                        !scheduler.hasTask('Amplifier-EnableStatus'))    // 如果没有关闭任务的话，就启动关闭任务
                    {
                        console.log('光纤是不是断开咯！！!')
                        scheduler.ShutdownAmplifierTask(1,this.amplifierGroupStore,null,'interval',true)     // 这个时间的设置是为了防止在关闭的时候，还有任务在执行
                    }
                }
            }
        }, 2000);
    }


    stopCheck() {
        if (this.checkIntervalId) {
            clearInterval(this.checkIntervalId);
            this.checkIntervalId = null;
        }
    }
}
