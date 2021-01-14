import { InsertChartOutlinedTwoTone } from '@material-ui/icons';
import { ioClient } from './index';

// i is location in 1D
// export const handleClickInMatch = (i) => {
//     ioClient.emit("play", { i });
// }
// export const drawMatchSock =() =>{
//     ioClient.emit("match_draw_request");
// }
// export const createdMatchSock = (roomId,matchId) => {
//     console.log(roomId+matchId +"ne");
//     ioClient.emit("match_created", {roomId,matchId});
// } 
export const offLineSock =() => {
    ioClient.emit("off_line");
}

export const getUserOnlineSock=() =>{
    ioClient.emit("get_user_online");
}

