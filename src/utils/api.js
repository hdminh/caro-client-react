import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../constants/apiContants';

export const login = async (username, password) => {
    const url = API_BASE_URL + '/auth/login';
    const data = {
        username: username,
        password: password
    }
    const res = await axios.post(url, data, { 
        headers : {
            'Content-Type': 'application/json'
        }
    });
  return res;
};

export const checkRegister = async (username, password, confirmpassword) => {
  const url = API_BASE_URL + '/auth/checkregister';
  const data = {
    username: username,
    password: password,
    confirmpassword: confirmpassword
}
console.log(data)
    const res = await axios.post(url, data, {   
        headers : {
            'Content-Type': 'application/json'
        }
    });
  return res;
}

export const signup = async (data) => {
    const url = API_BASE_URL + '/auth/register';
    const res = await axios.post(url, data, { 
        headers : {
            'Content-Type': 'application/json'
        }
    });
  return res;
};

export const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
}

export const loginGoogle = async (googleToken) => {
  const data = {
    googleToken: googleToken
  }
  console.log(data)
    return await axios
      .post(API_BASE_URL + "/auth/logingoogle", data, { 
        headers : {
            'Content-Type': 'application/json'
        }
      })
  }

  export const loginFacebook = async(accesstoken) => {
    const data = {
      accesstoken: accesstoken
    }
    const res = await axios
      .post(API_BASE_URL + "/auth/loginfacebook",
        data, {
        headers : {
          'Content-Type': 'application/json'
        }
      });
    return res;

  }

  export const joinRoom = async(id) => {
    const data = {
      idRoom: Number(id)
    }
    console.log(data)
    const res = await axios
      .post(API_BASE_URL + "/room/joinroom",
        data, {
        headers : {
          'auth-token': localStorage.getItem(ACCESS_TOKEN_NAME),
          'Content-Type': 'application/json'
        }
      });
    return res;

  }

  export const addRoom = async () => {
    const res = await axios
      .post(API_BASE_URL + "/room",
        "", {
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



