// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


const { SerialPort } = require('serialport')
// import { SerialPort} from "serialport";
const { ipcRenderer } = require("electron");
async function listSerialPorts() {
    await SerialPort.list().then((ports, err) => {
        console.log(ports)
        console.log(err)
    })
}

function listPorts() {
    listSerialPorts();
    setTimeout(listPorts, 2000);
}

// Set a timeout that will check for new serialPorts every 2 seconds.
// This timeout reschedules itself.
setTimeout(listPorts, 2000);
window.RenderApi.maxWindow();
listSerialPorts()

function setMinWindow (){
    ipcRenderer.send("WindowMini");
}

function setMaxWindow (){
    ipcRenderer.send("WindowMax");
}

function setCloseWindow (){
    ipcRenderer.send("WindowClose");
}