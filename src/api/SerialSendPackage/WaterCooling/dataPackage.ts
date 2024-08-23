
export const schedual_water_cooling_package = () => {
    let instruct:any = [];
    const send_data = Buffer.from([0xC0,0x0E,0x01,0x03,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x88,0x01]);
    instruct.push([{ data_type: 'WaterCooling-DataUpload', data: send_data }]);
    return instruct as [];
}



export const water_cooling_package_parser = (packages_data:any[])=>{
    let packaged_data_list:any[] = []
    return packaged_data_list;
}