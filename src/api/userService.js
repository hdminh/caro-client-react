import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../constants/apiContants';

export const getUserInfo = async () => {
    const url = API_BASE_URL + '/user';
    const res = await axios.get(url, { 
        headers : {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem(ACCESS_TOKEN_NAME)
        }
    });
  return res;
};


