import React,{ useEffect, useState  } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../constants/apiContants';
import io from 'socket.io-client'

function Home(props) {
    const ioClient = io.connect("https://caro-game-api.herokuapp.com/");
    const token = localStorage.getItem(ACCESS_TOKEN_NAME)
    const [ data, setData] = useState("")
    ioClient.emit("online",{ token: token })
    useEffect(() => {
        ioClient.on("statusFriendChange",(data)=>{
            setData(JSON.stringify(data))
        })

        if (!localStorage.getItem(ACCESS_TOKEN_NAME)) redirectToLogin();
        
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

export default withRouter(Home);