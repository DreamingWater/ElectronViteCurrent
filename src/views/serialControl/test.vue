<template>
  <div>
    <button @click="getPorts">搜索串口</button>
    <div v-for="port in ports" :key="port">
      <input type="checkbox" :value="port" v-model="selectedPort"> {{ port }}
    </div>
    <div>
      <label for="baudRate">选择波特率:</label>
      <select v-model="baudRate" id="baudRate">
        <option>9600</option>
        <option>14400</option>
        <option>19200</option>
        <option>38400</option>
        <option>57600</option>
        <option>115200</option>
      </select>
    </div>
    <button @click="connect">连接</button>
    <div>
      <label for="receivedData">接收到的数据:</label>
      <textarea id="receivedData" v-model="receivedData" readonly></textarea>
    </div>
    <div>
      <label for="sendData">发送数据:</label>
      <textarea id="sendData" v-model="sendData"></textarea>
      <button @click="sendDataFunc">发送</button>
      <button @click="disconnect">断开</button>
      <button @click="parse">parse</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { listAvailablePorts, connectToPort, sendDataToPort } from '@/preload/serialControl.ts';

const ports = ref([]);
const selectedPort = ref('');
const baudRate = ref(9600);
const receivedData = ref('');
const sendData = ref('');
let use_parser:any = null;
let use_port:any = null;

const getPorts = async () => {
  ports.value = await listAvailablePorts();
};

const connect = () => {
  ({ port: use_port, parser: use_parser } = askForSerialConnection('COM6', 115200 ,'4544'));
  console.log(use_parser);
};

const sendDataFunc = () => {
  // sendDataBySerial(use_port,sendData.value);
  // sendData.value = '';
  // const hexString = '535401000000e1e2e3e4e5e60a00010001000400e8030000ec8f4544';
  // const send_data = Buffer.concat([Buffer.from(hexString, 'hex'), Buffer.from('\n')]);
// '535401000000e1e2e3e4e5e60a00010001000400e8030000ec8f4544'
  const hexString = '535401000000e1e2e3e4e5e60a00010001000400e8030000ec8f4544';
  const send_data = Buffer.from(hexString, 'hex');
  // console.log(buffer);
  // console.log(buffer);
  // const send_data = Buffer.from([0xAA,0x55,0xD1,0x00,0x00,0x00,0x0d,0x0a]);
  // sendDataBySerial(use_port,send_data);
  use_port.write(send_data);
  console.log('send data:',send_data);
};

const disconnect = () => {
 use_port.close();
};


function add_parser(this_parser:any) {
  this_parser.on('data', data => {
    console.log('Received data from port:', data);
    receivedData.value += data;
    if (data.trim() === 'hello') {
      console.log('你好');
    } else if (data.trim() === '你好') {
      console.log('hello');
    }
  });
}

const parse = ()=>{
  add_parser(use_parser);
}
</script>