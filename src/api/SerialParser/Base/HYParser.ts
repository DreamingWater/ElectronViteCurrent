import * as stream from "node:stream";


function calc_checksum_str(str_data: string): string {
    function crc_check(data: Buffer): Buffer {
        let sum = 0;
        for (let byte of data) {
            sum += byte;
        }
        let sum_bytes = Buffer.alloc(2);
        sum_bytes.writeUInt16LE(sum, 0);
        return sum_bytes;
    }
    let data = Buffer.from(str_data, 'hex');
    let check_data = crc_check(data);
    return check_data.toString('hex');
}

export function HYParseFrameData(data_str: string): {valid_frame:boolean, function_code: string, function_index:string, data: string,valid_data_num:number } | null {
    const function_code = data_str.slice(4, 6);

    const dataLength = parseInt(data_str.slice(6, 8), 16);

    if (data_str.length < 8 + dataLength * 2 + 4) {
        return null;
    }

    const data = data_str.slice(8, 8 + dataLength * 2);
    // const checksum = data_str.slice(8 + dataLength * 2, 8 + dataLength * 2 + 4);
    // TODO: Verify checksum
    const check_data = data_str.slice(8 + dataLength * 2, 8 + dataLength * 2 + 4);
    const calculated_check_data = calc_checksum_str(data);
    // console.log('check_data', check_data, 'calculated_check_data', calculated_check_data);

    let valid_frame = true;      // check_data === calculated_check_data;
    let valid_data_num = 8 + dataLength * 2 + 4;
    const function_index:string = "";
    return {valid_frame, function_code, function_index, data ,valid_data_num};
    // 55aac804b004eb009ff1
    }

