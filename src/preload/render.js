// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.



// import { SerialPort} from "serialport";
const { ipcRenderer } = require("electron");



function setMinWindow (){
    ipcRenderer.send("WindowMini");
}

function setMaxWindow (){
    ipcRenderer.send("WindowMax");
}

function setCloseWindow (){
    ipcRenderer.send("WindowClose");
}