import { useWaterCoolingStore } from "../../../store/waterCooling";

const setWorkingStatus = (store: any, value: number) => {
    const set_working_status = {
        data_type: 'WorkingStatus',
        value: value
    }
    store.setTargetParameter(set_working_status);
}

const deal_water_cooling_status = (dataHex: Buffer, store: any) => {
    const target1 = [0xc0, 0x0e, 0x01, 0x03];
    const target2 = [0x0e, 0x01, 0x03];

    if (dataHex.slice(0, target1.length).every((value, index) => value === target1[index])) {
        setWorkingStatus(store, parseInt(dataHex[4].toString(), 16));
    } else if (dataHex.slice(0, target2.length).every((value, index) => value === target2[index])) {
        setWorkingStatus(store, parseInt(dataHex[3].toString(), 16));
    }
}
export function add_water_cooling_serial_data_parser(water_cooling_serial_parser: any) {
    water_cooling_serial_parser.on('data', (data) => {
        console.log('Received data from port:', data);
        if (data) {
            const store = useWaterCoolingStore();
            deal_water_cooling_status(data, store);
        }
    });
}