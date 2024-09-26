import { getStoreByPageLocation } from "@/store/SerialGroup";
import {ConfigManager} from "@/api/Config/configManager";
import {PageLocationStateEnum} from "@/api/pageLocation";


const config_manager = new ConfigManager();
const config_file_data = config_manager.readConfigFile()

const set_serial_store_port = (SerialStore:any)=>{
    const store_set = getStoreByPageLocation(PageLocationStateEnum[SerialStore]);
    const this_store = store_set.store()
    const setting_store_value = {
        'data_type' :'Port',
        'value': config_file_data[SerialStore]
    }
    return this_store.setTargetParameter(setting_store_value) || ''
}

export const update_serial_config = ()=>{
    set_serial_store_port('SeedPurchased');
    set_serial_store_port('Amplifier');
    set_serial_store_port('TemperaturePPLN');
    set_serial_store_port('Manager');
    set_serial_store_port('Oscillator');
}

export const update_serial_auto_connect = ()=>{
    set_serial_store_port('SeedPurchased');
    set_serial_store_port('Amplifier');
    set_serial_store_port('Manager');
}

export const read_config_temperature_humidity = () => {
    const heat_temperature_threshold = config_file_data['HeatTemperature'] ?? 24.5; // 默认值 20 度
    const outer_temperature_threshold = config_file_data['OuterTemperature'] ?? 30; // 默认值 26 度
    return { heat_temperature_threshold, outer_temperature_threshold };
}
