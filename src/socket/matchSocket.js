import {ioClient} from './index';

//data is userid
export const joinMatchSock =(data) =>{
    ioClient.emit("join_match",{data});
}
