
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

// let port; // 将port设置为全局变量

async function listAvailablePorts() {
    let ports = await SerialPort.list();
    let portPaths = ports.map(port => port.path);
    return portPaths;
}

// @ts-ignore
function askForSerialConnection(portPath, baudRate,hexData=false) {
    console.log('Connecting to port', portPath, 'at baud rate', baudRate);
    try {
        let port = new SerialPort({ path: portPath, baudRate: baudRate }); // 使用全局变量port
        // Switches the port into "flowing mode"
        // port.on('data', function (data) {
        //     console.log('Data:', data)
        // })
        let parser = null;
        if(hexData === false){
            parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));
        }else{
            parser = port.pipe(new ReadlineParser({includeDelimiter:true,encoding: "hex"}));
        }
        return {port ,parser};
    }catch (e)  {
        console.log('Failed to connect to port', portPath);
        return null;
    }
}

function sendDataBySerial(port, dataToSend) {
    if (port) {
        try {
            const send_data = dataToSend+'\r\n';
            port.write(send_data);
        }catch (e) {
            console.log(e);
        }
    } else {
        console.log('No port is connected.');
    }
}

function closePort(port) {
    if (port) {
        try {
            port.close();
        }catch (e) {
            console.log(e);
        }
    }
    return null;
}


