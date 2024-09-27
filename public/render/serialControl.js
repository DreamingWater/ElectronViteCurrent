
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

// let port; // 将port设置为全局变量

async function listAvailablePorts() {
    let ports = await SerialPort.list();
    let portPaths = ports.map(port => port.path);
    return portPaths;
}

// @ts-ignore
// function askForSerialConnection(portPath, baudRate,hexData=false) {
//     console.log('Connecting to port', portPath, 'at baud rate', baudRate);
//     try {
//         let port = new SerialPort({ path: portPath, baudRate: baudRate }); // 使用全局变量port
//         // Switches the port into "flowing mode"
//         // port.on('data', function (data) {
//         //     console.log('Data:', data)
//         // })
//         let parser = null;
//         if(hexData === false){
//             parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));
//         }else{
//             parser = port.pipe(new ReadlineParser({delimiter:Buffer.from([0x55,0xAA]) ,includeDelimiter:true,encoding: "hex"}));
//         }
//         return {port ,parser};
//     }catch (e)  {
//         console.log('Failed to connect to port', portPath);
//         return null;
//     }
// }

function askForSerialConnection(portPath, baudRate, hexData = 'str') {
    console.log('Connecting to port', portPath, 'at baudRate', baudRate);

    let port = new SerialPort({ path: portPath, baudRate: baudRate });

    // Listen for error event
    port.on('error', function(err) {
        console.log('Error occurred: ', err.message);
        port.close(function(err) {
            if (err) {
                console.log('Failed to close port: ', err.message);
            } else {
                console.log('Port closed successfully after error');
            }
        });
    });

    let parser = null;
    if (hexData === 'str') {
        parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));
    } else if(hexData === '55AA') {
        parser = port.pipe(new ReadlineParser({ delimiter: Buffer.from([0x55, 0xAA]), includeDelimiter: true, encoding: "hex" }));
    } else if(hexData === '01C0') {
        parser = port.pipe(new ReadlineParser({ delimiter: Buffer.from([0x01, 0xC0]), includeDelimiter: true, encoding: "hex" }));
    }else if(hexData === '4544') {
        console.log('oscillator enabled');
        parser = port.pipe(new ReadlineParser({ delimiter: Buffer.from([0x45, 0x44]), includeDelimiter: true, encoding: "hex" }));
    }

    return { port, parser };
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


