<script setup lang="ts">

import { ref,onMounted } from 'vue';
  const set_value = ()=>{
    console.log('set_value');
  }

onMounted(()=>{
// 获取可用的串口列表
// 获取可用的串口列表
  async function getSerialPorts() {
    const ports = await navigator.serial.getPorts();
    console.log(ports);
    return ports;
  }
// 打开指定的串口连接
  async function openSerialConnection(port) {
    // 设置波特率、数据位等参数
    port.baudRate = 9600;
    port.dataBits = '8';
    port.parity = 'none';
    port.stopBits = '1';

    // 创建读取器对象并将其附加到串口上
    const reader = port.readable.getReader();
    const encoder = new TextEncoder();
    const messageToSend = encoder.encode("Hello from JS!");
    await port.writable.write(messageToSend);
    while (true) {
      try {
        const result = await reader.read();
        if (!result.done) {
          // 处理从串口收到的数据
          console.log('Received data from serial port:', new TextDecoder().decode(result.value));
        } else {
          break;
        }
      } catch (error) {
        console.error(`Error reading or writing to the serial port: ${error}`);
        break;
      }
    }
  }

// 主函数
  async function main() {
    const ports = await getSerialPorts();

    for (const port of ports) {
      console.log(`Found serial port: ${port.deviceId}, manufacturer: ${port.manufacturer}`);

      // 选择第一个串口进行测试
      if (ports.indexOf(port) === 0) {
        openSerialConnection(port);
        break;
      }
    }
  }

  main();

// getSerialPorts();
})
  // 请求用户选择一个串口


</script>

<template>
  <div>hello world</div>
  <button   style="height: 80px;color: white"></button>
</template>

<style scoped lang="scss">

</style>