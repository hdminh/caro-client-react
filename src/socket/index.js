import io from 'socket.io-client';
export const ioClient = io.connect("http://127.0.0.1:8088");
