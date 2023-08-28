
// Mine
import {dialog, ipcRenderer,BrowserWindow,contextBridge}  from 'electron'



const close = () => {
  ipcRenderer.invoke('on-close-event')
}

contextBridge.exposeInMainWorld('myApi', {
  close

})