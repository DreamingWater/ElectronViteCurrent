import { scheduler } from '@/api/schedulerPipeline';
import {AmplifierGettingDataModel} from "../types/amplifier";
export class Manager {
    private seedPurchasedStore: any;
    private amplifierGroupStore: any;
    private checkIntervalId: NodeJS.Timeout | null = null;
    private readonly THRESHOLD_Seed = 10; // 你的阈值
    private readonly THRESHOLD_Amplifier = 3; // 你的阈值
    private AllowCheckAmplifier = true;

    constructor(seedStore: any, amplifierStore: any) {
        this.seedPurchasedStore = seedStore;
        this.amplifierGroupStore = amplifierStore;
    }

    checkAmplifierPower() {
        this.checkIntervalId = setInterval(() => {
            const sampleSeedPower = this.seedPurchasedStore.SamplePower;
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
                   scheduler.ShutdownAmplifierTask(2,this.amplifierGroupStore,null,'interval',true)     // 这个时间的设置是为了防止在关闭的时候，还有任务在执行
               }
            }
        }, 3000);
    }

    stopCheck() {
        if (this.checkIntervalId) {
            clearInterval(this.checkIntervalId);
            this.checkIntervalId = null;
        }
    }
}
