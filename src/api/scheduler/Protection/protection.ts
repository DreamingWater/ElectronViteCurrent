import {AmplifierGettingDataModel, AmplifierSettingDataModel} from "@/types/amplifier";
import {SeedPurchasedGettingDataModel, SeedPurchasedSettingDataModel} from "@/types/seedPurchased";
import {MonitorGettingDataModel} from "@/types/manager";
import Swal from 'sweetalert2';
import {ConfigManager} from "@/api/Config/configManager";
import {schedulerSerial} from "@/api/scheduler/ScheSerial/schedulerPipeline";
import { scheduler } from "@/api/scheduler/base/scheduler";
import {read_config_temperature_humidity} from "../../Config/configSetting";

export class ProtectionClass {
    private seedPurchasedStore: any;
    private amplifierGroupStore: any;
    private managerStore: any;
    private checkIntervalId: NodeJS.Timeout | null = null;
    private readonly THRESHOLD_Seed = 1000; // 你的阈值
    private readonly THRESHOLD_Amplifier = 1000; // 你的阈值 1000 mA
    private AllowCheckAmplifier = true;
    private serial_config_saving :boolean = false;

    // 温度 和 湿度监测
    private heat_temperature_threshold :number ;
    private outer_temperature_threshold :number ;

    constructor(seedStore: any, amplifierStore: any, managerStore: any) {
        this.seedPurchasedStore = seedStore;
        this.amplifierGroupStore = amplifierStore;
        this.managerStore = managerStore;

        // 读取温度和湿度的配置文件
        const { heat_temperature_threshold, outer_temperature_threshold } = read_config_temperature_humidity();
        this.heat_temperature_threshold = heat_temperature_threshold;
        this.outer_temperature_threshold = outer_temperature_threshold;
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
            } else if(this.AllowCheckAmplifier && (sampleAmplifierOneParams>this.THRESHOLD_Amplifier||sampleAmplifierTwoParams>this.THRESHOLD_Amplifier || sampleAmplifierThreeParams>this.THRESHOLD_Amplifier) ){
                // this.AllowCheckAmplifier = false;
               // console.log('Amplifier-EnableStatus')
                // console.log(scheduler.hasTask('Amplifier-EnableStatus'))
                //scheduler.hasTask('Amplifier-EnableStatus')
                if (!(scheduler.hasTask('Amplifier-channel1_shut_down') ||
                        scheduler.hasTask('Amplifier-channel2_shut_down') || scheduler.hasTask('Amplifier-channel3_shut_down')|| scheduler.hasTask('Amplifier-EnableStatus')
                ))    // 如果没有关闭任务的话，就启动关闭任务
                {
                    schedulerSerial.addShutdownTask(1,this.amplifierGroupStore,null,'interval',true)     // 这个时间的设置是为了防止在关闭的时候，还有任务在执行
                    Swal.fire({
                        title: 'Error!',
                        text: 'Open seed laser first!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        }, 2000);

    }
    checkManager() {
        const AllowedAmplifierCurrent = 800;   // 10 W 功率对应电流为多大
        const Voltage_Limit = 0.4;   // 此时对应电压，正常情况下电压值应该高于这个值
        this.checkIntervalId = setInterval(() => {


            const get_current3_data:AmplifierGettingDataModel = {
                data_type: 'PowerCurrent',
                channel_name:  'THREE',
                value_model: 'Current'
            };
            const sampleAmplifierThreeParams = this.amplifierGroupStore.getTargetParameter(get_current3_data); // 假设这是一个包含三个通道 setPower 的数组

            if (sampleAmplifierThreeParams > AllowedAmplifierCurrent) {
                //  第三级开启之后 保存串口设置
                if (!this.serial_config_saving){
                    this.serial_config_saving = true;
                    // 保存串口设置

                    const manager = new ConfigManager();
                    const result = manager.updateConfigs({
                        'SeedPurchased': manager.get_serial_store_port('SeedPurchased'),
                        'Amplifier': manager.get_serial_store_port('Amplifier'),
                        'Manager': manager.get_serial_store_port('Manager'),
                    });
                    console.log('Updated the serial config');
                }

                // 第三级 开光之后 才需要启动检测
                const show_back_power:MonitorGettingDataModel = {
                    data_type: 'BackPower'
                };
                const sampleBackPower = this.managerStore.getTargetParameter(show_back_power);//
                if(sampleBackPower < Voltage_Limit) {
                    console.log("检测到电压低于阈值");
                    // 在这里，需要关闭放大器3
                    if (!scheduler.hasTask('Amplifier-channel3_shut_down') && !scheduler.hasTask('Amplifier-EnableStatus')
                     && !scheduler.hasTask('Amplifier-channel2_shut_down'))    // 如果没有关闭任务的话，就启动关闭任务
                    {
                        schedulerSerial.addShutdownTask(1,this.amplifierGroupStore,null,'interval',true)     // 这个时间的设置是为了防止在关闭的时候，还有任务在执行
                        Swal.fire({
                            title: 'Error!',
                            text: '激光器故障，请检查！！!',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                }
            }
        }, 2000);
    }

    checkTemperature()  {
        this.checkIntervalId = setInterval(() => {
            const heat_temperature:MonitorGettingDataModel = {
                data_type: 'HeatTemperature'
            };
            const outer_temperature:MonitorGettingDataModel = {
                data_type: 'OuterTemperature'
            };
            const sample_heat_temperature = this.managerStore.getTargetParameter(heat_temperature);
            const sample_outer_temperature = this.managerStore.getTargetParameter(outer_temperature);

            // 判断放大器3的状态
            const get_current3_data:AmplifierGettingDataModel = {
                data_type: 'PowerCurrent',
                channel_name:  'THREE',
                value_model: 'Current'
            };
            const sampleAmplifierThreeParams = this.amplifierGroupStore.getTargetParameter(get_current3_data); // 假设这是一个包含三个通道 setPower 的数组
            console.log('sample_heat_temperature', sample_heat_temperature, 'sample_outer_temperature', sample_outer_temperature, 'this.heat_temperature_threshold', this.heat_temperature_threshold, 'this.outer_temperature_threshold', this.outer_temperature_threshold);
            // 只有在放大器3开启的情况下才需要检测
            if ((sample_heat_temperature > this.heat_temperature_threshold || sample_outer_temperature > this.outer_temperature_threshold) && sampleAmplifierThreeParams > 1000) {
                    // 在这里，需要关闭放大器
                    if (!scheduler.hasTask('Amplifier-channel3_shut_down') && !scheduler.hasTask('Amplifier-EnableStatus')
                        && !scheduler.hasTask('Amplifier-channel2_shut_down'))    // 如果没有关闭任务的话，就启动关闭任务
                    {
                        schedulerSerial.addShutdownTask(1,this.amplifierGroupStore,null,'interval',true)     // 这个时间的设置是为了防止在关闭的时候，还有任务在执行
                        Swal.fire({
                            title: 'Error!',
                            text: '环境温度异常，请检查！！!',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                }
        }, 4000);
    }

    stopCheck() {
        if (this.checkIntervalId) {
            clearInterval(this.checkIntervalId);
            this.checkIntervalId = null;
        }
    }
}
