import React,{ useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../constants/apiContants';
import { getRoomInfo } from '../api/roomService';
import UserInfoCard from '../components/UserInfoCard';
import {joinMatchSock} from '../socket/matchSocket';
import {newRoomPlayerSock} from '../socket/roomSocket';
import {ioClient} from '../socket/index';
// import io from 'socket.io-client';
// // const ioClient = io.connect("http://127.0.0.1:8088");

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
    // ioClient.on("new_room_player",(data) =>{
    //   setListUser();  
    //    console.log(data);
    //    console.log(ioClient);
    //    setPlayers([]);
    //  })

    useEffect(() => {
        if (!localStorage.getItem(ACCESS_TOKEN_NAME)) redirectToLogin();  
        //  newRoomPlayerSock();
        setListUser();  

        ioClient.on("new_room_player",(data) =>{
         setListUser();  
          console.log(data);
          console.log(ioClient);
          setPlayers([]);
        })
    })
  function redirectToLogin() {
    props.history.push('/login');
  }
  const handlePlay =(() =>{
    // joinMatch(props.match.params.id);
  })
  // function joinMatch(data){
  //   ioClient.emit("joinmatch",{data});

  // }
  // function handleClickInMatch(i){
  //   ioClient.emit("play",{i});
  // }

  return (
    <div className="App">
      {players !== null && players.map((player) => <UserInfoCard key={player._id} user={player} joinMatchSock={joinMatchSock}/>)}

    </div>
  );
}

export default withRouter(Room);