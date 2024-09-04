export function RX_crc_check(data: Buffer): Buffer {
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