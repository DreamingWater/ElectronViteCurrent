import asyncio
import time

import websockets
import threading
import json

# 全局变量
server = None

class WsServer:
    clients = set()

    async def handle_msg(self, websocket, message):
        print(f"Received message: {message}")

    async def send_msg(self, message):
        print(f"Sending message: {message}")
        for client in self.clients:
            await client.send(message)

    async def handle_client(self, websocket, path):
        print("New connection...")
        self.clients.add(websocket)
        try:
            async for message in websocket:
                await self.handle_msg(websocket, message)
        finally:
            self.clients.remove(websocket)
            print("Connection closed...")

    async def init_server(self, host, port):
        async with websockets.serve(self.handle_client, host, port):
            print(f"Serving on {host}:{port}...")

    async def run(self, host, port):
        async with websockets.serve(self.handle_client, host, port):
            print(f"Serving on {host}:{port}...")
            await asyncio.Future()  # Wait forever


class MyWsServer(WsServer):
    async def handle_msg(self, websocket, message):
        # Handle received message
        print(f"Message received: {message}")
        await asyncio.sleep(1)       # 异步等待1s
        # await self.send_msg(message)
    async def send_msg(self, message):
        # Send message to clients
        print(f"Sending message: {message}")
        await super().send_msg(message)  # Call parent class method to broadcast message

async def input_thread():
    while True:
        user_input = await asyncio.get_event_loop().run_in_executor(None, input, "Enter a value: ")
        send_data = {
            'type':2,
            'data':{
                'name':'LASER_TWO',
                'current': 100.23+int(user_input),
                'temprature':23.3+int(user_input),
            }
        }
        await server.send_msg(json.dumps(send_data))

def server_thread():
    global server
    server = MyWsServer()
    asyncio.run(server.run('localhost', 9007))

if __name__ == '__main__':
    # 创建并启动新线程
    server_thread = threading.Thread(target=server_thread)
    server_thread.start()

    # 在主线程中创建并运行事件循环
    loop = asyncio.get_event_loop()
    input_task = loop.create_task(input_thread())
    loop.run_until_complete(input_task)

    # 等待服务器线程完成
    server_thread.join()