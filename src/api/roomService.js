import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../constants/apiContants";

export const joinRoom = async (id) => {
  const data = {
    idRoom: Number(id),
  };
  console.log(data);
  const res = await axios.post(API_BASE_URL + "/room/joinroom", data, {
    headers: {
      "auth-token": localStorage.getItem(ACCESS_TOKEN_NAME),
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const addRoom = async () => {
  const res = await axios.post(API_BASE_URL + "/room", "", {
    headers: {
      "auth-token": localStorage.getItem(ACCESS_TOKEN_NAME),
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const getRoomInfo = async (id) => {
  const url = API_BASE_URL + "/room/" + id;
  const res = await axios.get(url, {
    headers: {
      "auth-token": localStorage.getItem(ACCESS_TOKEN_NAME),
      "Content-Type": "application/json",
    },
  });
  console.log(res);
  return res;
};

export const getListRoom = async (id) => {
  const url = API_BASE_URL + "/room/getlistroom";
  const res = await axios.get(url, {
    headers: {
      "auth-token": localStorage.getItem(ACCESS_TOKEN_NAME),
      "Content-Type": "application/json",
    },
  });
  console.log(res);
  return res;
};


export const leaveRoom = async (id) => {
  const data = {
    id: id,
  };
  const res = await axios.post(API_BASE_URL + "/room/leaveRoom", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
