import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { ACCESS_TOKEN_NAME } from '../constants/apiContants';
import { getRoomInfo } from '../api/roomService';
import UserInfoCard from '../components/UserInfoCard';
import { joinMatchSock, createdMatchSock } from '../socket/matchSocket';
import { createMatch } from '../api/matchService';
import { newRoomPlayerSock, inviteRoomSock} from '../socket/roomSocket';
import { ioClient } from '../socket/index';
import Button from '@material-ui/core/Button';
import { getCurrentUser, getUserToken } from '../api/authService';
import UserOnline from '../components/UserOnline';

// import io from 'socket.io-client';
// // const ioClient = io.connect("http://127.0.0.1:8088");

function Room(props) {
  const [players, setPlayers] = useState([]);
  const [roomId, setRoomId] = useState();
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
  useEffect(() => {
    if (!localStorage.getItem(ACCESS_TOKEN_NAME)) redirectToLogin();
    //  newRoomPlayerSock();
    // setListUser();  
    setListUser();
    ioClient.on("create_match", async ({roomId,player1,player2}) => {
    const result = await createMatch(room_Id);
      console.log(result);
      if (result._id) {
        // console.log(roomId);
        // console.log(JSON.stringify(roomId));

        // console.log(roomInfor.roomId);
        createdMatchSock(roomId,result._id);
        localStorage.setItem("player", JSON.stringify({player1,player2}));

      }
    })
    ioClient.on("start_game", (data) => {
      console.log(data);
      props.history.push('/match/' + data);
      // setPlayers([]);
    })
    ioClient.on("new_room_player", (data) => {
      setListUser();
      console.log(data);
      // setPlayers([]);
    })
  }, [])
  function redirectToLogin() {
    props.history.push('/login');
  }
  const handlePlay = (() => {
    // joinMatch(room_Id);
  })

  const handleReady = () => {
    // const userToken=getUserToken();
    joinMatchSock(roomId, getCurrentUser());
  }
  const handleInvite=(enemyId)=>{
    console.log(enemyId);
    inviteRoomSock(roomId,enemyId,getCurrentUser())
  }
  

  return (
    <Container component="main">
      <CssBaseline />
      <Typography component="h1" variant="h5">
      PHÒNG ĐẤU
       </Typography>
       <br/>
       {roomId !== null &&
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleReady}
            >
              Ready
    </Button>}
      <Grid container spacing={2}>
        <Grid item xs={8}>

    {players !== null && players.map((player) => <UserInfoCard key={player._id} user={player}></UserInfoCard>)}
        </Grid>
        <Grid item xs={4}>
          <UserOnline handleInvite={handleInvite}/>
        </Grid>
       

      </Grid>
    </Container>
  );
}

export default withRouter(Room);