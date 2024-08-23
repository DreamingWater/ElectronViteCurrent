import {add_temperature_serial_data_parser} from "./Temperarure/dataParser";
import { PageLocationStateEnum  } from "@/api/pageLocation";
import {add_amplifier_serial_data_parser} from "./Amplifier/dataParser";
import {add_seed_purchased_serial_data_parser} from "./SeedPurchased/dataParser";
import { add_monitor_serial_data_parser } from './Monitor/dataParser'
import {add_water_cooling_serial_data_parser} from "./WaterCooling/dataParser";

const actions = {
    [PageLocationStateEnum.Oscillator]: (serial_parser: any) => console.log('add serial oscillator parser'),
    [PageLocationStateEnum.Amplifier]: (serial_parser: any,) => add_amplifier_serial_data_parser(serial_parser),
    [PageLocationStateEnum.TemperaturePPLN]: (serial_parser: any) => add_temperature_serial_data_parser(serial_parser),
    [PageLocationStateEnum.SeedPurchased]: (serial_parser: any) => add_seed_purchased_serial_data_parser(serial_parser),
    [PageLocationStateEnum.Manager]: (serial_parser: any) => add_monitor_serial_data_parser(serial_parser),
    [PageLocationStateEnum.WaterCooling]: (serial_parser: any) => add_water_cooling_serial_data_parser(serial_parser),
    }

export const append_serial_data_parser = (serial_parser:any, serial_function: PageLocationStateEnum)=> {
    if (actions[serial_function]) {
        actions[serial_function](serial_parser);
    } else {
        throw new Error("Invalid serial function location");
    }
}