import { ioClient } from './index';

//data is userid
export const joinMatchSock = (roomId,userName) => {
    ioClient.emit("join_match", {roomId,userName});
}


// i is location in 1D
export const handleClickInMatch = (i) => {
    ioClient.emit("play", { i });
}
export const drawMatchSock =() =>{
    ioClient.emit("match_draw_request");
}
export const createdMatchSock = (roomId,matchId) => {
    console.log(roomId+matchId +"ne");
    ioClient.emit("match_created", {roomId,matchId});
} 
export const endMatchSock =() => {
    ioClient.emit("force_disconnect");
}
