class TransportData {
    length: Buffer;
    data: Buffer;
    constructor(package_data?: Buffer) {
        this.data = package_data || Buffer.alloc(0);
        this.length = Buffer.alloc(2);
        this.length.writeUInt16LE(this.data.length, 0);
    }
    combined_data(): Buffer {
        return Buffer.concat([this.length, this.data]);
    }
}

class TransportFunction  {
    function_data_length: Buffer;
    function_code: Buffer;
    function_index: Buffer;
    package_data: TransportData;
    constructor(valid_data: Buffer) {
        this.function_data_length = Buffer.alloc(2);
        this.function_code = Buffer.alloc(2);
        this.function_index = Buffer.alloc(2);
        this.package_data = new TransportData(valid_data);
    }
    combined_data(): Buffer {
        this.deal_data()
        return Buffer.concat([this.function_data_length,
        this.function_code,
        this.function_index,
        this.package_data.combined_data()]);
    }
    deal_data(): void {
        this.function_data_length = Buffer.alloc(2);
        let packed_data = this.package_data.combined_data();
        // console.log('packed_data used is',packed_data.toString('hex'));
        this.function_data_length.writeUInt16LE(packed_data.length+4, 0); // function 包长度
        // Increment function_index
        let index = this.function_index.readUInt16LE(0);
        this.function_index.writeUInt16LE(index + 1, 0);
    }
}

export class RXProtocolClass {
    frame_head: Buffer;
    protocol_version: Buffer;
    package_valid_data: Buffer;
    mac_address: Buffer;
    function_code: Buffer;
    function_code_sequence: Buffer;
    frame_tail: Buffer;

    constructor(valid_data: Buffer) {
        this.frame_head = Buffer.from([0x53, 0x54]);   // 帧数 头
        this.protocol_version =  Buffer.from([0x01, 0x00]);   // 协议版本
        this.package_valid_data = valid_data;  // 数据包
        this.mac_address = Buffer.from([0xE1,0xE2,0xE3,0xE4,0xE5,0xE6]);   // MAC 地址
        this.function_code = Buffer.alloc(2);  // 功能码2Byte
        this.function_code_sequence = Buffer.alloc(2);  // 功能码序号2Byte
        this.frame_tail = Buffer.from([0x45, 0x44]);  // 帧尾
    }
    crc_check(data: Buffer): Buffer {
        let crc = 0;
        for (const byte of data) {
            for (let i = 0; i < 8; i++) {
                if ((crc & 0x8000) !== 0) {
                    crc = (crc << 1) & 0xFFFF;
                    crc ^= 0x1021;
                } else {
                    crc = (crc << 1) & 0xFFFF;
                }

                if ((byte & (0x80 >> i)) !== 0) {
                    crc ^= 0x1021;
                }
            }
        }
        crc &= 0xFFFF;
        const crcBytes = Buffer.alloc(2);
        crcBytes.writeUInt16LE(crc, 0);
        return crcBytes;
    }
    combine_data(control_code:Buffer, function_code:Buffer): Buffer {
        let function_data_package = new TransportFunction(this.package_valid_data );
        function_data_package.function_code = function_code;
        let packaged_function_data = function_data_package.combined_data();
        // console.log('packaged_function_data',packaged_function_data.toString('hex'));
        let data_for_crc_before = Buffer.concat([
            this.frame_head,
            this.protocol_version,
            control_code,
            this.mac_address,
            packaged_function_data,
        ]);
        let frame_crc_value = this.crc_check(data_for_crc_before);
        // 控制码 2Byte
        //功能包          功能包长度2Byte  功能码2Byte    功能码序号2Byte
        // 数据长度2Byte   数据nByte
        return  Buffer.concat([data_for_crc_before,frame_crc_value,this.frame_tail]);
    }
}

export const RX_generate_package_buffer = (control_code:Buffer,function_code:Buffer,data:Buffer )=>{
    let protocol = new RXProtocolClass(data);
    let result:Buffer = protocol.combine_data(control_code,function_code);
    return result
}