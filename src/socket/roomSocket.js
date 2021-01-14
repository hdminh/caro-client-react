import {ioClient} from './index';

//data is room id
export const addRoomSock =(data) =>{
    ioClient.emit("join_room",{data});
}

//
export const joinRoomSock =(data) =>{
    ioClient.emit("join_room",{data});
}

export const newRoomPlayerSock = () =>{
    ioClient.on("new_room_player",(data) =>{
        console.log(data);
        console.log(ioClient);
        // setOponentMove(JSON.stringify(data.i));
      })
}

export const inviteRoomSock=(roomId,socketId,name) =>{
    console.log(roomId+socketId+name);
    ioClient.emit("invite_room",{roomId,socketId,name});
}

export const playNowSock=(cup) =>{
    ioClient.emit("play_now",({cup}));
}

export const createdRoomSock = (roomId,socketId) => {
    console.log(roomId+socketId +"ne");
    ioClient.emit("room_created_play_now", {roomId,socketId});
} 