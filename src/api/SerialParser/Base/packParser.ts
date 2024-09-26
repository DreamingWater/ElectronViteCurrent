import {add_amplifier_serial_data_parser} from "../Amplifier/dataParser";
import {add_temperature_serial_data_parser} from "../Temperarure/dataParser";
import {add_seed_purchased_serial_data_parser} from "../SeedPurchased/dataParser";
import {PageLocationStateEnum} from "@/api/pageLocation";
import {RXParseFrameData} from "./RXParser";
import { HYParseFrameData } from "./HYParser";

class StringParser {
    private str: string;
    private delimiter: any;
    constructor(delimiter:any) {
        this.str = '';
        this.delimiter = delimiter;
    }

    appendData(data: string) {
        this.str += data;
        if(this.str.length>500){  // 限制缓存区大小
            this.str =  '';
        }
    }

    parseFrame(): { function_code: string, data: string } | null {
        let result;
        // Find the frame head
        const delimiterIndex = this.str.toLowerCase().indexOf(this.delimiter);
        if (delimiterIndex !== 0) { // 在字符串中寻找帧头
            if (delimiterIndex === -1) {
                return null;
            } else {
                this.str = this.str.slice(delimiterIndex); // 丢弃前面的字符
            }
        }
       // console.log('this.str is this',this.str);
        // 执行到这里就说明 已经 find the delimiter
        if (this.delimiter === '55aa') {
            result = HYParseFrameData(this.str);
        } else if (this.delimiter === '5354') {
            result = RXParseFrameData(this.str);
        }
        if (result) {
            const { valid_frame, function_code, data,valid_data_num } = result;
            // console.log('valid_frame',valid_frame);
            if (valid_frame) {     // monitor 的校验位是固定死的
                this.str = this.str.slice(valid_data_num); // 丢弃一个数据范围
                return { function_code, data };
            }else {

            }
        }
        this.str = this.str.slice(2); // 丢弃一个数据范围
        return null;
    }
    append_data_parser(data:string){
        this.appendData(data);
        let result = this.parseFrame()
        // console.log(result);
        if(result){
            return result
        }

    }
}

export const seed_purchased_parser = new StringParser('55aa');
export const amplifier_parser = new StringParser('55aa');
export const monitor_parser = new StringParser('55aa');
export const oscillator_parser = new StringParser('5354'); // 帧头


const actions = {
    [PageLocationStateEnum.Oscillator]: (received_data: string) => {
        return received_data
    },
    [PageLocationStateEnum.Amplifier]: (received_data: string) => {
        return seed_purchased_parser.append_data_parser(received_data)
    },
    [PageLocationStateEnum.TemperaturePPLN]: (received_data: string) => {
        return received_data
    },
    [PageLocationStateEnum.SeedPurchased]: (received_data: string) => {
        return amplifier_parser.append_data_parser(received_data)
    },
    [PageLocationStateEnum.WaterCooling]: (received_data: string) => {
        return received_data
    },
}

export const data_package_separate = (received_data:string, parser_function: PageLocationStateEnum)=> {
    if (actions[parser_function]) {
        return actions[parser_function](received_data);
    } else {
        throw new Error("Invalid serial function location");
    }
}

