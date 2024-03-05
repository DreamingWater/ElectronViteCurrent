import {add_temperature_serial_data_parser} from "./Temperarure/dataParser";
import { PageLocationStateEnum  } from "@/api/pageLocation";


const actions = {
    [PageLocationStateEnum.Oscillator]: () => console.log('add serial oscillator parser'),
    [PageLocationStateEnum.Amplifier]: () => console.log('add serial amplifier parser'),
    [PageLocationStateEnum.TemperaturePPLN]: (serial_parser: any) => {
        console.log(serial_parser);
        add_temperature_serial_data_parser(serial_parser)
        console.log('add serial TemperaturePPLN parser')
        },
    }

export const append_serial_data_parser = (serial_parser:any, serial_function: PageLocationStateEnum)=> {
    if (actions[serial_function]) {
        actions[serial_function](serial_parser);
    } else {
        throw new Error("Invalid serial function location");
    }
}