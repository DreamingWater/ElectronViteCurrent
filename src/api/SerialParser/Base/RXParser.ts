import {TRUE} from "sass";


function string_crc_Check(data_string: string): string {
    let crc = 0;
    for (let i = 0; i < data_string.length; i += 2) {
        const byte = parseInt(data_string.slice(i, i + 2), 16);
        for (let j = 0; j < 8; j++) {
            if ((crc & 0x8000) !== 0) {
                crc = (crc << 1) & 0xFFFF;
                crc ^= 0x1021;
            } else {
                crc = (crc << 1) & 0xFFFF;
            }

            if ((byte & (0x80 >> j)) !== 0) {
                crc ^= 0x1021;
            }
        }
    }
    crc &= 0xFFFF;
    const crcBytes = Buffer.alloc(2);
    crcBytes.writeUInt16LE(crc, 0);
    return crcBytes.toString('hex');
}

//  535401000000e1e2e3e4e5e606000200b0010000e7844544
export function RXParseFrameData(data_str: string): { valid_frame:boolean,function_code: string, data: string ,valid_data_num:number} | null {
    let protocol_version = data_str.slice(4, 8);
    let control_code = data_str.slice(8, 12);
    let mac_address = data_str.slice(12, 24);
    let function_data_length = parseInt(data_str.slice(24, 28), 16);
    let function_code = data_str.slice(28, 32);
    let function_index = data_str.slice(32, 36);
    let data_length = parseInt(data_str.slice(36, 40), 16);
    let data = data_str.slice(40, 40 + data_length * 2);
    let crc = data_str.slice(40 + data_length * 2, 44 + data_length * 2);
    let frame_tail = data_str.slice(44 + data_length * 2, 48 + data_length * 2);
    // check crc value
    let valid_frame = true ;//crc === string_crc_Check(data_str.slice(0, 40 + data_length * 2)) && frame_tail === '4546';
    let valid_data_num = 48 + data_length * 2; // 有效数据的位数
    return {valid_frame, function_code, data,valid_data_num}
}


