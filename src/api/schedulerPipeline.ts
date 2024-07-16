import {PageLocationStateEnum, usePageLocationState} from "@/api/pageLocation";
import {getStoreByPageLocation} from "@/store/SerialGroup";
import { serial_data_package_factory, cut_data_package_list } from "@/api/SerialSendPackage/index";
import {SeedPurchasedGettingDataModel, SeedPurchasedSettingDataModel} from "../types/seedPurchased";
import {ref} from "vue";
import {AmplifierGettingDataModel, AmplifierSettingDataModel} from "../types/amplifier";
import {TemperatureSettingDataModel} from "../types/temperature";

class SchedulerPipeline {
    private queue: Array<{ name: string, execFunction: (args: object) => any, args: object[], runStatus: { value: number }, interval: number, timeoutId?: NodeJS.Timeout, currentIndex?: number, executionMode: string }> = [];
// shut_interval的意思是先发送各个数据，最后发送shutdown，并等待响应
    addTask(name: string, execFunction: (args: object) => any, args: object[], interval: number, executionMode: 'once' | 'interval' | 'continuous'|'shut_interval') {
        // If a task with the same name already exists in the queue, cancel it
        if (this.queue.some(task => task.name === name)) {
            this.cancelTask(name);
        }

        // Add the new task to the queue
        this.queue.push({ name, execFunction, args, runStatus: { value: 0 }, interval, currentIndex: 0, executionMode });
        this.processTask(this.queue[this.queue.length - 1]);
    }

    cancelTask(name: string) {
        // If the task with the given name exists, clear its timeout
        this.queue.forEach(task => {
            if (task.name === name && task.timeoutId) {
                clearTimeout(task.timeoutId);
                task.timeoutId = undefined;
            }
        });

        // Remove the task from the queue
        this.queue = this.queue.filter(task => task.name !== name);
    }
    hasTask(name: string): boolean {
        return this.queue.some(task => task.name === name);
    }
    private processTask(task: { name: string, execFunction: (args: object) => any, args: object[], runStatus: { value: number }, interval: number, timeoutId?: NodeJS.Timeout, currentIndex: number, executionMode: string }) {
        const result = task.execFunction(task.args[task.currentIndex]);
        task.runStatus.value = 1;

        // If the task function returns a value, use it as the new args
        if (result !== undefined) {
            task.args[task.currentIndex] = result;
        }

        // If the task needs to loop, set a timeout
        if (task.interval > 0 && task.executionMode !== 'once') {
            task.timeoutId = setTimeout(() => {
                // shut down  如果设置的数据填充结束，就发送shutdown 命令，并等待响应
                if (task.executionMode === 'shut_interval' && task.currentIndex === task.args.length - 1) {
                    this.processTask(task);
                }
                else {
                    // Move to the next index, or reset to 0 if we've reached the end of the array
                    task.currentIndex = (task.currentIndex + 1) % task.args.length;

                    // If we've looped through all args, cancel the task
                    if (task.currentIndex === 0 && task.args.length >= 1 && task.executionMode === 'interval') {
                        this.cancelTask(task.name);
                    } else {
                        this.processTask(task);
                    }
                }

            }, task.interval * 1000);
        }
    }

    // data 为发送的数据object []
    // current_page 为当前页面
    // data_package 为数据包 [object object[data_type:'SetPower' ] interval]
    addSerialSendPackagesTask(data: any[], current_page:any, interval: number, other_instruct: 'initial' | 'internal' | null=null,executionMode: 'once' | 'interval' | 'continuous'='once') {
        const packaged_data = serial_data_package_factory(data, current_page, other_instruct);
        const store_result = getStoreByPageLocation(current_page);
        const store = store_result.store();

        if (Array.isArray(packaged_data[0])) {
            // packaged_data 是二维数组
            for (const data_package of packaged_data) {
                let this_data_package_name = `${data_package[0]['data_type']}`;
                console.log('this_data_package_for_send', data_package);
                this.addTask(this_data_package_name, store.sendSerialData, data_package, interval,executionMode);
            }
        } else if(packaged_data.length === 0) {
            console.log('packaged_data is empty');
        }
        else {
            // packaged_data 是一维数组
            let this_data_package_name = `${packaged_data[0]['data_type']}`;
            console.log('this_data_package_for_send', packaged_data);
            this.addTask(this_data_package_name, store.sendSerialData, packaged_data, interval,executionMode);
        }
    }
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
        this.addTask(this_data_package_name, serial_store.sendSerialData, packaged_data, interval,executionMode);
    }

    set_amplifier_one_channel_data(store:any=null,other_instruct: 'initial' | 'internal' | null=null,channel:'TWO'|'THREE'='TWO', set_power=0) {
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
            [amplifier_channel2show_workingpower_data,amplifier_channel2set_power_data,3000]
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
        this.addTask(shut_channel_name, this_amplifier_store_result.sendSerialData, set_channel_three_data, interval,executionMode);

    }

    ShutdownAmplifierTask( interval: number, store:any=null,other_instruct: 'initial' | 'internal' | null=null,executionMode: 'once' | 'interval' | 'continuous'='interval', Two_Step_Shutdown:boolean=false)
    {

        const shut_channel_three_data = this.set_amplifier_one_channel_data(store,other_instruct,'THREE',0);
        const shut_channel_two_data = this.set_amplifier_one_channel_data(store,other_instruct,'TWO',0);

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

            let amplifier_module_packaged_data = [...shut_channel_three_data, ...shut_channel_two_data, ...amplifier_module_shut_data];
            let amplifier_channel2this_data_package_name = `${amplifier_module_packaged_data[amplifier_module_packaged_data.length-1]['data_type']}`;   // 命名为shutdown
            this.addTask(amplifier_channel2this_data_package_name, this_amplifier_store_result.sendSerialData, amplifier_module_packaged_data, interval,executionMode);


        }else {
            let amplifier_module_channel2_packaged_data = shut_channel_three_data;
            let amplifier_module_channel3_packaged_data = [ ...shut_channel_two_data, ...amplifier_module_shut_data];
            this.addTask('Amplifier_channel3_shut_down', this_amplifier_store_result.sendSerialData, amplifier_module_channel3_packaged_data, interval,executionMode);
            this.addTask('Amplifier_channel2_shut_down', this_amplifier_store_result.sendSerialData, amplifier_module_channel2_packaged_data, interval,executionMode);
        }
    }
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
        this.addTask(temperature__package_name, this_temperature_store_result.sendSerialData, temperature_packaged_shut_data, interval,executionMode);
    }
    addShutdownTask( interval: number, dealing_store:any=null,other_instruct: 'initial' | 'internal' | null=null,executionMode: 'once' | 'interval' | 'continuous'='interval') {
        let store = dealing_store;
        if (store.$id === 'use-seed_purchased') {
            // 如果是 种子源 处理方法是
            // 设置的数值  希望发送的设定温度  希望发送的设定的P I D
            this.cancelTask('Seed-SetPower') // 取消所有的setting任务
            // this.cancelTask('Seed-DataUpload') // 取消振荡器的上传任务

            this.ShutdownSeedTask(interval,store,other_instruct,executionMode);
        }
       else if (store.$id === 'use-amplifier-group') {
            // 如果 是 其他设备
            // 关闭 放大器3
            this.cancelTask('Amplifier-PowerCurrent-TWO') // 取消所有的setting任务
            this.cancelTask('Amplifier-PowerCurrent-THREE') // 取消所有的setting任务
            // this.cancelTask('Amplifier-DataUpload') // 取消放大器的上传任务
            this.ShutdownAmplifierTask(interval,store,other_instruct,executionMode);
        }
       else if (store.$id === 'use-temperature') {

            this.ShutdownTemperatureTask(interval,store,other_instruct,executionMode);
        }

        // 关闭  放大器2
    }


}


export const scheduler = new SchedulerPipeline();