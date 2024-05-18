// @ts-nocheck
import { ipcRenderer,contextBridge } from 'electron'
import { websocket_send } from '@/utils/WebsocketFunc'
import { SendMessageType } from '@/utils/config'
ipcRenderer.on('shutdown_background', (_event, ...args) => {
  websocket_send(SendMessageType.ShutDownPython,'')
  console.log('[Receive Main-process message]:', ...args)
})



// Mine
// import {ipcRenderer,contextBridge}  from 'electron'
