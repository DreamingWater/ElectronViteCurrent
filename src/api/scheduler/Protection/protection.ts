// ts-nocheck
import {AmplifierGettingDataModel, AmplifierSettingDataModel} from "@/types/amplifier";
import {SeedPurchasedGettingDataModel, SeedPurchasedSettingDataModel} from "@/types/seedPurchased";
import {MonitorGettingDataModel} from "@/types/manager";
import Swal from 'sweetalert2';
import {schedulerSerial} from "@/api/scheduler/ScheSerial/schedulerPipeline";
import { scheduler } from "@/api/scheduler/base/scheduler";
import {read_config_temperature_humidity, update_serial_auto_connect} from "../../Config/configSetting";
import get_control_config_based_version from "@/api/Versions/VersionControl";

const getAmplifierCurrent = (store: any, channel: string) => {
    const data: AmplifierGettingDataModel = {
        data_type: 'PowerCurrent',
        channel_name: channel,
        value_model: 'Current'
    };
    return store.getTargetParameter(data);
};
const getAmplifierTotalCurrent= (store: any) => {
    const sampleAmplifierOneParams = getAmplifierCurrent(store, 'ONE');
    const sampleAmplifierTwoParams = getAmplifierCurrent(store, 'TWO');
    const sampleAmplifierThreeParams = getAmplifierCurrent(store, 'THREE');
    return sampleAmplifierOneParams + sampleAmplifierTwoParams + sampleAmplifierThreeParams;
}
const getAmplifierEnableOrder = (store: any) => {
    const target_config_object = get_control_config_based_version(localStorage.getItem('control_device_sms'));
    const AmplifierStructure = target_config_object ? target_config_object.Amplifier : null;
    let amplifierCurrentList:any = [];

    ['ONE', 'TWO', 'THREE'].forEach(channel => {
        if (AmplifierStructure && AmplifierStructure[channel]) {
            amplifierCurrentList.push(getAmplifierCurrent(store, channel));
        }
    });
    const checkAmplifierCurrentList = (amplifierCurrentList: number[]) => {
        for (let i = 0; i < amplifierCurrentList.length - 1; i++) {
            if (amplifierCurrentList[i] < 1000) {
                const sumRemaining = amplifierCurrentList.slice(i + 1).reduce((acc, val) => acc + val, 0);
                if (sumRemaining > 1000) {
                    return false; // 启动顺序错误
                }
            }
        }
        return true; // 启动顺序正确
    };
    return checkAmplifierCurrentList(amplifierCurrentList);
}

const getSeedPower = (store: any) => {
    const data: SeedPurchasedGettingDataModel = {
        data_type: 'SamplePower',
    };
    return store.getTargetParameter(data);
};

const shutdownAmplifier = (store: any) => {
    if (!scheduler.hasTask('Amplifier-channel1_shut_down') &&
        !scheduler.hasTask('Amplifier-channel2_shut_down') &&
        !scheduler.hasTask('Amplifier-channel3_shut_down') &&
        !scheduler.hasTask('Amplifier-EnableStatus')) {
        schedulerSerial.addShutdownTask(1, store, null, 'interval', true);
    }
};

const showError = (title: string, text: string) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'error',
        confirmButtonText: 'OK'
    });
};

export class ProtectionClass {
    private seedPurchasedStore: any;
    private amplifierGroupStore: any;
    private managerStore: any;
    private checkIntervalId: NodeJS.Timeout | null = null;
    private readonly THRESHOLD_Seed = 1000;
    private readonly THRESHOLD_Amplifier = 1000;
    private AllowCheckAmplifier = true;
    private serial_config_saving: boolean = false;
    private heat_temperature_threshold: number;
    private outer_temperature_threshold: number;

    constructor(seedStore: any, amplifierStore: any, managerStore: any) {
        this.seedPurchasedStore = seedStore;
        this.amplifierGroupStore = amplifierStore;
        this.managerStore = managerStore;

        const { heat_temperature_threshold, outer_temperature_threshold } = read_config_temperature_humidity();
        this.heat_temperature_threshold = heat_temperature_threshold;
        this.outer_temperature_threshold = outer_temperature_threshold;
    }

    checkAmplifierEnableOrder() {
        this.checkIntervalId = setInterval(() => {
            const sampleSeedPower = getSeedPower(this.seedPurchasedStore);
            const sampleAmplifierCurrent = getAmplifierTotalCurrent(this.amplifierGroupStore);

            if (sampleSeedPower > this.THRESHOLD_Seed) {
                if (getAmplifierEnableOrder(this.amplifierGroupStore)) {
                    shutdownAmplifier(this.amplifierGroupStore);
                    showError('Error!', 'Open pre-amplifier first!');
                }
            } else if (this.AllowCheckAmplifier && (sampleAmplifierCurrent > this.THRESHOLD_Amplifier)) {
                shutdownAmplifier(this.amplifierGroupStore);
                showError('Error!', 'Open seed laser first!');
            }
        }, 2000);
    }
    checkAmplifierWorking() {
        const AllowedAmplifierCurrent = 800;
        this.checkIntervalId = setInterval(() => {
            const sampleAmplifierCurrent = getAmplifierTotalCurrent(this.amplifierGroupStore);
            if(sampleAmplifierCurrent>AllowedAmplifierCurrent)
            {
                if (!this.serial_config_saving) {
                    this.serial_config_saving = true;
                    update_serial_auto_connect();
                    console.log('Updated the serial config file:');
                }
                if(!(this.checkManager() && this.checkTemperature())) // true 表示正常工作,但是由于！取反，这段为不正常的判断
                {
                    shutdownAmplifier(this.amplifierGroupStore);
                }
            }
        },1000);
    }

    checkManager() {
        const Voltage_Limit = 0.4;
        const show_back_power: MonitorGettingDataModel = {
            data_type: 'BackPower'
        };
        const sampleBackPower = this.managerStore.getTargetParameter(show_back_power);
        if (sampleBackPower < Voltage_Limit) {
            shutdownAmplifier(this.amplifierGroupStore);
            showError('Error!', '激光器故障，请检查！！!');
            return false;
        }
        return true
    }


    checkTemperature() {
        const heat_temperature: MonitorGettingDataModel = {
            data_type: 'HeatTemperature'
        };
        const outer_temperature: MonitorGettingDataModel = {
            data_type: 'OuterTemperature'
        };
        const sample_heat_temperature = this.managerStore.getTargetParameter(heat_temperature);
        const sample_outer_temperature = this.managerStore.getTargetParameter(outer_temperature);

        if ((sample_heat_temperature > this.heat_temperature_threshold || sample_outer_temperature > this.outer_temperature_threshold)) {
            shutdownAmplifier(this.amplifierGroupStore);
            showError('Error!', '环境温度异常，请检查！！!');
            return false;
        }
        return true
    }
}