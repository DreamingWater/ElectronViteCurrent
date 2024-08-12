import {AmplifierGettingDataModel} from "@/types/amplifier";
import {scheduler} from "@/api/schedulerPipeline";
import { amplifier_pid_controller } from "@/managements/controller";
import { schedulerTask } from "./scheduler";
import {AmplifierSettingDataModel} from "../../types/amplifier";


function Control_amplifier_power_stability(set_power:number, store:any){
    const output_Limitation = 200; // 200 mW

    const get_current3_data:AmplifierGettingDataModel = {
        data_type: 'PowerCurrent',
        channel_name:  'THREE',
        value_model: 'Current'
    };
    const get_proportional_data:AmplifierGettingDataModel = {
        data_type: 'SetProportional'
    };
    const get_integral_data:AmplifierGettingDataModel = {
        data_type: 'SetIntegral'
    };
    const get_derivative_data:AmplifierGettingDataModel = {
        data_type: 'SetDerivative'
    };
    const sampleAmplifierThreeParams = store.getTargetParameter(get_current3_data); // 假设这是一个包含通道3 setPower 的数组
    const current_to_power = sampleAmplifierThreeParams/12 *50 ;      // 根据电流计算出此时的功率数值
    if (Math.abs(current_to_power - set_power) >= output_Limitation) {               // 如果当前功率与设定功率的差值大于200mW
        return true;    // 退出
    }
    const proportional_data = store.getTargetParameter(get_proportional_data);
    const integral_data     = store.getTargetParameter(get_integral_data);
    const derivative_data   = store.getTargetParameter(get_derivative_data);

    amplifier_pid_controller.set_pid_parameters(proportional_data,integral_data,derivative_data);

    const output_power = amplifier_pid_controller.control_calculate(set_power,current_to_power,output_Limitation);
    const result_valid_or_not = amplifier_pid_controller.check_exceeding_Limit();
    if (!result_valid_or_not){ // 如果没有超出限制
        scheduler.SetAmplifierThreeTask(output_power,1, store,null,'once') ;
        return false;
    }else {
        return true;   // 退出
    }


}




export function add_control_task(taskName: string, set_power:number, store:any){
    // Check if a task with the same name already exists
    if (schedulerTask.hasTask(taskName)) {
        // If it does, cancel the existing task
        stop_control_task(taskName,store);
    }

    let timerId: NodeJS.Timeout | null = null;
    amplifier_pid_controller.clean_traditional_data();
    timerId = setInterval(()=>{
        const result_value = Control_amplifier_power_stability(set_power, store);
        if(result_value){
            stop_control_task(taskName,store);
        }
    },1000);
    // Add the new task to the scheduler
    schedulerTask.addTask(taskName, timerId);
}

export function stop_control_task(taskName: string,store:any){
    schedulerTask.cancelTaskByName(taskName); // 退出任务
    // 将状态更新到store
    const set_pid_enable_control_data:AmplifierSettingDataModel = {
        data_type: 'PID_Enable',
        value :  0 ,
    };
    store.setTargetParameter(set_pid_enable_control_data);
}