import {add_amplifier_serial_data_parser} from "../Amplifier/dataParser";
import {add_temperature_serial_data_parser} from "../Temperarure/dataParser";
import {add_seed_purchased_serial_data_parser} from "../SeedPurchased/dataParser";
import {PageLocationStateEnum} from "@/api/pageLocation";

class StringParser {
    private str: string;

    constructor() {
        this.str = '';
    }

    appendData(data: string) {
        this.str += data;
        if(this.str.length>300){  // 限制缓存区大小
            this.str =  '';
        }
    }

    parseFrame(): { ctrlCode: string, data: string } | null {
        while (this.str.length > 4) {
            // Find the frame head
            if (this.str.slice(0, 4).toLowerCase() !== '55aa') {
                this.str = this.str.slice(2);
                continue;
            }

            const ctrlCode = this.str.slice(4, 6);
            const dataLength = parseInt(this.str.slice(6, 8), 16);

            if (this.str.length < 8 + dataLength * 2 + 4) {
                return null;
            }

            const data = this.str.slice(8, 8 + dataLength * 2);
            // const checksum = this.str.slice(8 + dataLength * 2, 8 + dataLength * 2 + 4);
            // TODO: Verify checksum

            this.str = this.str.slice(8 + dataLength * 2 + 4);

            return { ctrlCode, data };
        }

        return null;
    }
    append_data_parser(data:string){
        this.appendData(data);
        let result = this.parseFrame()
        console.log(result);
        if(result){
            return result
        }

    }
}

export const seed_purchased_parser = new StringParser();
export const amplifier_parser = new StringParser();
export const monitor_parser = new StringParser();


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
}

export const data_package_separate = (received_data:string, parser_function: PageLocationStateEnum)=> {
    if (actions[parser_function]) {
        return actions[parser_function](received_data);
    } else {
        throw new Error("Invalid serial function location");
    }
}

