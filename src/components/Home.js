import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../constants/apiContants';
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

function Home(props) {
    const ioClient = io.connect("http://127.0.0.1:8080");
    const token = localStorage.getItem("token")
    const [ data, setData] = useState("")
    ioClient.emit("online",{ token: token })
    useEffect(() => {
        if (!localStorage.getItem(ACCESS_TOKEN_NAME)) redirectToLogin();
        ioClient.on("statusFriendChange",(data)=>{
            setData(JSON.stringify(data))
          })
    }, [])
    function redirectToLogin() {
    props.history.push('/login');
    }
  return (
    <div className="App">
      {data}
    </div>
  );
}

export default withRouter(Home);