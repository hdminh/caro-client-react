import { ioClient } from './index';

export const joinChatSock = (roomId) => {
    ioClient.emit("join_chat", roomId);
}
