import React,{ useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../constants/apiContants';
import { getRoomInfo } from '../utils/api';
import UserInfoCard from '../components/UserInfoCard';
import io from 'socket.io-client';
const ioClient = io.connect("http://127.0.0.1:8080");

function Room(props) {
    const [players, setPlayers] = useState([]);
    let idRoom=null;

    const setListUser = (() => {
        getRoomInfo(props.match.params.id).then(result => {
          if (result.status < 400) {
            setPlayers(result.data.players)
            console.log('list player', players)
            props.setTitle(result.data.room.idRoom)
          }
        }).catch((error) => {
          props.setError(error.message)

        })
    })

    useEffect(() => {
        if (!localStorage.getItem(ACCESS_TOKEN_NAME)) redirectToLogin();  
         setListUser();  
    },[])
  function redirectToLogin() {
    props.history.push('/login');
  }
  const handlePlay =(() =>{
    joinMatch(props.match.params.id);
  })
  function joinMatch(data){
    ioClient.emit("joinmatch",{data});

  }
  function handleClickInMatch(i){
    ioClient.emit("play",{i});
  }

  return (
    <div className="App">
      {players !== null && players.map((player) => <UserInfoCard key={player._id} user={player} />)}

    </div>
  );
}

export default withRouter(Room);