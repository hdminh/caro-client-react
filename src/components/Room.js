import React,{ useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../constants/apiContants';
import { getRoomInfo } from '../utils/api';
import io from 'socket.io-client'

const ioClient = io.connect("https://caro-game-api.herokuapp.com/");
//const ioClient = io.connect("http://127.0.0.1:8080");

function Room(props) {
    const token = localStorage.getItem(ACCESS_TOKEN_NAME)
    if(token){
      ioClient.emit("online",{ token: token })
    }
    const [data, setData] = useState([]);

    const setListUser = (() => {
        console.log('id ', props.match.params.id)
        getRoomInfo(props.match.params.id).then(result => {
            console.log(result)
            setData(result.result.players)
        })
    })

    useEffect(() => {
        if (!localStorage.getItem(ACCESS_TOKEN_NAME)) redirectToLogin();  
        setListUser();
        
    })
  function redirectToLogin() {
    props.history.push('/login');
  }
  return (
    <div className="App">
        {data}
    </div>
  );
}

export default withRouter(Room);