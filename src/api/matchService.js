import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../constants/apiContants';

//id room
export const createMatch = async(id) => {
    const data = {
      id:id
    }
    console.log(data)
    const res = await axios
      .post(API_BASE_URL + "/match",
        data, {
        headers : {
          'auth-token': localStorage.getItem(ACCESS_TOKEN_NAME),
          'Content-Type': 'application/json'
        }
      });
    return res;

  }

  export const playMatch = async (matchId, i) => {
    const data = {
      id: matchId,
      x_axis:Math.round(i/20),
      y_axis:i%20
    }
    const res = await axios
      .post(API_BASE_URL + "/match/play",
      data, {
        headers : {
          'auth-token': localStorage.getItem(ACCESS_TOKEN_NAME),
          'Content-Type': 'application/json'
        }
      });
    return res;

  }

  export const getRoomInfo = async(id) => {
    const url = API_BASE_URL + "/room/" + id;
    const res = await axios
      .get(url, {
        headers : {
          'auth-token': localStorage.getItem(ACCESS_TOKEN_NAME),
          'Content-Type': 'application/json'
        }
      });
    console.log(res)
    return res;

  }

  export const leaveRoom = async(id) => {
    const data = {
      id: id
    }
    const res = await axios
      .post(API_BASE_URL + "/room/leaveRoom",
        data, {
        headers : {
      
          'Content-Type': 'application/json'
        }
      });
    return res;

  }

