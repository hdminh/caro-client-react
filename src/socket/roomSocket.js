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