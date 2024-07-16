import {
    getStoreByPageLocation
} from "@/store/SerialGroup";

import {ConfigManager} from "@/api/Config/configManager";
import {PageLocationStateEnum} from "@/api/pageLocation";


const config_manager = new ConfigManager();
const config = config_manager.readConfigFile()

const set_serial_store_port = (SerialStore:any)=>{
    const store_set = getStoreByPageLocation(PageLocationStateEnum[SerialStore]);
    const this_store = store_set.store()
    const setting_store_value = {
        'data_type' :'Port',
        'value': config[SerialStore]
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