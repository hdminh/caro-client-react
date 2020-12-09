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
    return axios
      .post(API_BASE_URL + "/auth/logingoogle", data, { 
        headers : {
            'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.datalogin) {
          localStorage.setItem("user", JSON.stringify(response.datalogin.firstname));
          localStorage.setItem(ACCESS_TOKEN_NAME, response.datalogin.token)
          console.log(response.datalogin)
        }
        return response;
      });

  }

  export const loginFacebook = async(accesstoken) => {
    const data = {
      accesstoken: accesstoken
    }
    return axios
      .post(API_BASE_URL + "/auth/loginfacebook", {
        data,
        headers : {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.datalogin) {
          localStorage.setItem("user", JSON.stringify(response.datalogin.firstname));
          localStorage.setItem(ACCESS_TOKEN_NAME, response.datalogin.token)
          console.log(response.datalogin)
        }
        return response;
      });

  }

