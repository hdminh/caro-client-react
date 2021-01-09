import {ioClient} from './index';

//data is userid
export const joinMatchSock =(data) =>{
    ioClient.emit("join_match","12");
}

// i is location in 1D
export const handleClickInMatch=(i) =>{
    ioClient.emit("play",{i});
  }