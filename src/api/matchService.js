import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../constants/apiContants';

//id room
export const createMatch = async(id) => {
    const data = {
      id:id
    }
    console.log(data)
    return await axios
      .post(API_BASE_URL + "/match",
        data, {
        headers : {
          'auth-token': localStorage.getItem(ACCESS_TOKEN_NAME),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        return response.data;
      }).catch((err) => {
        return err;
      });
  }

  export const playMatch = async (matchId, i) => {
    const data = {
      id: matchId,
      x_axis:Math.round(i/20),
      y_axis:i%20
    }
    return await axios
      .post(API_BASE_URL + "/match/play",
      data, {
        headers : {
          'auth-token': localStorage.getItem(ACCESS_TOKEN_NAME),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        return response.data;
      }).catch((err) => {
        return err;
      });
  }

  export const chatMatch = async (matchId, {user,message}) => {
    const data = {
      id: matchId,
      message:{user:user,text:message}
    }
    return await axios
      .post(API_BASE_URL + "/match/chat",
      data, {
        headers : {
          'auth-token': localStorage.getItem(ACCESS_TOKEN_NAME),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        return response.data;
      }).catch((err) => {
        return err;
      });
  }

  export const surrender = async (matchId) => {
    const data = {
      id: matchId
    }
    return await axios
      .put(API_BASE_URL + "/match/surrender",
      data, {
        headers : {
          'auth-token': localStorage.getItem(ACCESS_TOKEN_NAME),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        return response.data;
      }).catch((err) => {
        return err;
      });
  }

<<<<<<< HEAD
  export const DrawMatch =async (matchId) =>{
    const data = {
      id: matchId
    }
    return await axios
      .put(API_BASE_URL + "/match/draw",
      data, {
        headers : {
          'auth-token': localStorage.getItem(ACCESS_TOKEN_NAME),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        return response.data;
      }).catch((err) => {
        return err;
      });
  }

=======
  export const getUserMatch = async () => {
    const url = API_BASE_URL + '/match/mymatch';
    const res = await axios.get(url, { 
        headers : {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem(ACCESS_TOKEN_NAME)
        }
    });
  return res;
  };
>>>>>>> f2650fccd4fcd7e593989746bae7123ff4162cf6

  export const getMatchInfo = async (id) => {
    const url = API_BASE_URL + '/match/' + id;
    const res = await axios.get(url, { 
        headers : {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem(ACCESS_TOKEN_NAME)
        }
    });
  return res;
  };

  // export const getRoomInfo = async(id) => {
  //   const url = API_BASE_URL + "/room/" + id;
  //   const res = await axios
  //     .get(url, {
  //       headers : {
  //         'auth-token': localStorage.getItem(ACCESS_TOKEN_NAME),
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //   console.log(res)
  //   return res;

  // }

  // export const leaveRoom = async(id) => {
  //   const data = {
  //     id: id
  //   }
  //   const res = await axios
  //     .post(API_BASE_URL + "/room/leaveRoom",
  //       data, {
  //       headers : {
      
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //   return res;

  // }


