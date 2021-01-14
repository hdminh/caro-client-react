import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { ACCESS_TOKEN_NAME } from "../constants/apiContants";
import { getRoomInfo } from "../api/roomService";
import UserInfoCard from "../components/UserInfoCard";
import { joinMatchSock, createdMatchSock } from "../socket/matchSocket";
import { createMatch } from "../api/matchService";
import { newRoomPlayerSock } from "../socket/roomSocket";
import { ioClient } from "../socket/index";
import Button from "@material-ui/core/Button";
import { getCurrentUser, getUserToken } from "../api/authService";

// import io from 'socket.io-client';
// // const ioClient = io.connect("http://127.0.0.1:8088");

function Room(props) {
  const [players, setPlayers] = useState([]);
  const [roomId, setRoomId] = useState();
  let room_Id = props.match.params.id;

  const setListUser = () => {
    getRoomInfo(room_Id)
      .then((result) => {
        if (result.status < 400) {
          setPlayers(result.data.players);
          setRoomId(result.data.room.idRoom);
          // room_Id=result.data.room._id;
          console.log("rome _id", room_Id);

        }
      })
      .catch((error) => {
        props.setError(error.message);
      });
  };
  useEffect(() => {
    setListUser();
    ioClient.on("create_match", async ({ roomId, player1, player2 }) => {
      const result = await createMatch(room_Id);
      console.log(result);
      if (result._id) {
        createdMatchSock(roomId, result._id);
        localStorage.setItem("player", JSON.stringify({ player1, player2 }));
      }
    });
    ioClient.on("start_game", (data) => {
      console.log(data);
      props.history.push("/match/" + data);
      // setPlayers([]);
    });
    ioClient.on("new_room_player", (data) => {
      setListUser();
      console.log(data);
      // setPlayers([]);
    });
  }, []);
  function redirectToLogin() {
    props.history.push("/login");
  }
  const handlePlay = () => {
    // joinMatch(room_Id);
  };

  const handleReady = () => {
    // const userToken=getUserToken();
    joinMatchSock(roomId, getCurrentUser());
  };

  return (
    <Container component="main">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Phòng đấu số {roomId}
        </Typography>
        {roomId !== null && (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleReady}
          >
            Ready
          </Button>
        )}
      </div>
      <Grid container>
        {players &&
          players.map((player) => (
            <div>
              <Grid item xs={2}></Grid>
              <UserInfoCard key={player._id} user={player}></UserInfoCard>
              <Grid item xs={2}></Grid>
            </div>
          ))}
      </Grid>
    </Container>
  );
}

export default withRouter(Room);
