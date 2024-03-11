import {add_temperature_serial_data_parser} from "./Temperarure/dataParser";
import { PageLocationStateEnum  } from "@/api/pageLocation";
import {add_amplifier_serial_data_parser} from "./Amplifier/dataParser";
import {add_seed_purchased_serial_data_parser} from "./SeedPurchased/dataParser";

const actions = {
    [PageLocationStateEnum.Oscillator]: (serial_parser: any) => console.log('add serial oscillator parser'),
    [PageLocationStateEnum.Amplifier]: (serial_parser: any,) => add_amplifier_serial_data_parser(serial_parser),
    [PageLocationStateEnum.TemperaturePPLN]: (serial_parser: any) => add_temperature_serial_data_parser(serial_parser),
    [PageLocationStateEnum.SeedPurchased]: (serial_parser: any) => add_seed_purchased_serial_data_parser(serial_parser),
    }

export const append_serial_data_parser = (serial_parser:any, serial_function: PageLocationStateEnum)=> {
    if (actions[serial_function]) {
        actions[serial_function](serial_parser);
    } else {
        throw new Error("Invalid serial function location");
    }
}