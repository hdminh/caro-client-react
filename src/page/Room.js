import React,{ useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../constants/apiContants';
import { getRoomInfo } from '../api/roomService';
import UserInfoCard from '../components/UserInfoCard';
import {joinMatchSock,createdMatchSock} from '../socket/matchSocket';
import {createMatch} from '../api/matchService';
import {newRoomPlayerSock} from '../socket/roomSocket';
import {ioClient} from '../socket/index';
import Button from '@material-ui/core/Button';
import {getUserToken} from '../api/authService';

// import io from 'socket.io-client';
// // const ioClient = io.connect("http://127.0.0.1:8088");

function Room(props) {
    const [players, setPlayers] = useState([]);
    const [roomId,setRoomId] =useState();
    let room_Id = props.match.params.id;


    const setListUser = (() => {
        getRoomInfo(room_Id).then(result => {
          if (result.status < 400) {
            setPlayers(result.data.players)
            setRoomId(result.data.room.idRoom);
            // room_Id=result.data.room._id;
            console.log('rome _id', room_Id)

            props.setTitle(result.data.room.idRoom);
          }
        }).catch((error) => {
          props.setError(error.message)

        })
    })
    // setListUser();  

    // ioClient.on("new_room_player",(data) =>{
    //   setListUser();  
    //    console.log(data);
    //    console.log(ioClient);
    //    setPlayers([]);
    //  })
    


    useEffect(() => {
        if (!localStorage.getItem(ACCESS_TOKEN_NAME)) redirectToLogin();  
        //  newRoomPlayerSock();
        // setListUser();  
        setListUser();  
        ioClient.on("create_match",async (roomId) =>{
          console.log("creating match");
         const result = await createMatch(room_Id);
         console.log(result);
         if(result._id){
          createdMatchSock(result._id);
         }


        })
        ioClient.on("start_game",(data) =>{
          console.log(data);
         props.history.push('/match/'+data);
          // setPlayers([]);
        })
        ioClient.on("new_room_player",(data) =>{
          setListUser();  
           console.log(data);
           // setPlayers([]);
         })
      
        // ioClient.on("start_game",(data) =>{
        //    console.log(data);
        //   props.history.push('/match');

        //    // setPlayers([]);
        //  })

    },[])
  function redirectToLogin() {
    props.history.push('/login');
  }
  const handletest=()=>{
    ioClient.emit("test_room","something");
  }
  const handlePlay =(() =>{
    // joinMatch(room_Id);
  })
  // function joinMatch(data){
  //   ioClient.emit("joinmatch",{data});

  // }
  // function handleClickInMatch(i){
  //   ioClient.emit("play",{i});
  // }

  const handleReady= () =>{
    // const userToken=getUserToken();
    joinMatchSock(roomId);
  }

  return (
    <div className="App">
      { roomId !== null && 
      <Button
      type="submit"
      variant="contained"
      color="primary"
    onClick={handleReady}
    >
      Ready
    </Button>}
         
          
      {players !== null && players.map((player) => <UserInfoCard key={player._id} user={player} />)}

    </div>
  );
}

export default withRouter(Room);