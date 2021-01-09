import {ioClient} from './index';

//data is userid
export const joinMatchSock =(roomId) =>{
    ioClient.emit("join_match",roomId);
}

// i is location in 1D
export const handleClickInMatch=(i) =>{
    ioClient.emit("play",{i});
  }