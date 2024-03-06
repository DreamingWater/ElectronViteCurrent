class TransportData {
    length: Buffer;
    data: Buffer;
    constructor() {
        this.length = Buffer.alloc(0);
        this.data = Buffer.alloc(0);
    }
    combined_data(): Buffer {
        return Buffer.concat([this.length, this.data]);
    }
    deal_data(): void {
        this.length = Buffer.alloc(1);
        this.length.writeUInt8(this.data.length, 0);
    }
}

export class CommunicationProtocolClass {
    data_package: TransportData;
    ctrl_code: Buffer;
    constructor() {
        this.data_package = new TransportData();
        this.ctrl_code = Buffer.alloc(0);
    }
    crc_check(data: Buffer): Buffer {
        let sum = 0;
        for (let byte of data) {
            sum += byte;
        }
        let sum_bytes = Buffer.alloc(2);
        sum_bytes.writeUInt16LE(sum, 0);
        return sum_bytes;
    }
    combine_data(): Buffer {
        let frame_head = Buffer.from([0xAA, 0x55]);
        this.data_package.deal_data();
        let data_package = this.data_package.combined_data();
        let frame_crc_value = this.crc_check(this.data_package.data);
        let combined_data = Buffer.concat([frame_head, this.ctrl_code, data_package, frame_crc_value]);
        return combined_data;
    }
}


export const generate_package_buffer = (ctrl_code:Buffer,data:Buffer )=>{
    let protocol = new CommunicationProtocolClass();
    protocol.ctrl_code = ctrl_code;
    protocol.data_package.data = data; // 储存数据
    let result:Buffer = protocol.combine_data();
    return result
}

