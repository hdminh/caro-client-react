<<<<<<< HEAD
import React,{ useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import {useForm } from 'react-hook-form';
import { ACCESS_TOKEN_NAME } from '../constants/apiContants';
import {getUserToken,getCurrentUser} from '../api/authService';
import { joinRoom, addRoom } from '../api/roomService';
import {joinRoomSock,addRoomScok} from '../socket/roomSocket';
import {ioClient} from '../socket/index';
import UserOnline from '../components/UserOnline';
import Dialog from '../components/Dialog';
=======
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joinRoom, addRoom, getListRoom } from "../api/roomService";
import { joinRoomSock, addRoomScok } from "../socket/roomSocket";
import RoomInfo from "../components/RoomInfo";
>>>>>>> f2650fccd4fcd7e593989746bae7123ff4162cf6
// import io from 'socket.io-client'

//const ioClient = io.connect("https://caro-game-api.herokuapp.com/");

function Home(props) {
<<<<<<< HEAD
    const [openDialog,setOpenDialog]=useState(false);
    const [contentDialog,setContentDialog]= useState("accept");
    const [inviteRoomId,setInviteRoomId]=useState();
    const {register, handleSubmit} = useForm();
    const token = getUserToken();
    const name = getCurrentUser();

    
    const handleJoin = ((data) => {
      console.log("data in handle join");
      console.log(data);
      joinRoom(data.id).then(result => {
=======
  // const token = localStorage.getItem(ACCESS_TOKEN_NAME)
  // if(token){
  //   ioClient.emit("online",{ token: token })
  // }
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    getListRoomInfo();
  }, []);

  const [listRoom, setListRoom] = useState(null);

  const getListRoomInfo = () => {
    props.setLoading(true);
    getListRoom()
      .then((res) => {
        props.setLoading(false);
        console.log(res.data);
        setListRoom(res.data);
      })
      .catch((err) => {
        props.setLoading(false);

        props.setError(err.message);
      });
  };

  const handleJoin = (data) => {
    console.log(data);
    joinRoom(data.idRoom)
      .then((result) => {
>>>>>>> f2650fccd4fcd7e593989746bae7123ff4162cf6
        if (result.status < 400) {
          props.setError(null);
          joinRoomSock(result.data._id);
          console.log(result);
          props.history.push("/room/" + result.data._id);
        } else {
          props.setError("Error finding room");
        }
      })
      .catch((error) => {
        props.setError(error.message);
      });
  };

  const handleAddNew = () => {
    props.setLoading(true);
    addRoom()
      .then((result) => {
        props.setLoading(true);
        if (result.status < 400) {
          props.setError(null);
          console.log(result);
          props.history.push("/room/" + result.data._id);
          // joinRoomSock(result.data._id);
          joinRoomSock(result.data._id);
        } else {
          props.setError("Error add new room");
        }
      })
<<<<<<< HEAD
    })
    const acceptInvite=() =>{
      console.log("accept invite");
      setOpenDialog(false);
      handleJoin()

    }
=======
      .catch((error) => {
        props.setLoading(true);
        props.setError(error.message);
      });
  };
>>>>>>> f2650fccd4fcd7e593989746bae7123ff4162cf6

  // const  joinRoomSock=((data) =>{
  //   ioClient.emit("join_room",{data});
  // })

<<<<<<< HEAD
    useEffect(() => {
        if (!localStorage.getItem(ACCESS_TOKEN_NAME)) redirectToLogin();  
        if(token){
          ioClient.off("online");
          ioClient.emit("online", getCurrentUser());
        }

        ioClient.on("join_room_from_invite",({roomId,name})=>{
            setContentDialog(name +" muốn mời bạn chơi cùng phòng " +roomId);
            setInviteRoomId(roomId);
            setOpenDialog(true);
          console.log(roomId+name);
        })
    },[])
=======
  // useEffect(() => {
  //   if (!localStorage.getItem(ACCESS_TOKEN_NAME)) redirectToLogin();
  // });
>>>>>>> f2650fccd4fcd7e593989746bae7123ff4162cf6
  function redirectToLogin() {
    props.history.push("/login");
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();
  return (
    <div className="App">
      <form
        className={classes.form}
        noValidate
        onSubmit={handleSubmit((data) => handleJoin(data))}
      >
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          required
          name="id"
          label="Input Room ID"
          type="text"
          id="idRoom"
          autoComplete="current-id"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Join room
        </Button>
      </form>
      <Button
<<<<<<< HEAD
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleAddNew}
          >
            Add new room
          </Button>
          <UserOnline />
          <Dialog setOpenDialog={setOpenDialog} openDialog={openDialog} content={contentDialog} setResult={acceptInvite}/>
=======
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleAddNew}
      >
        Add new room
      </Button>
      <div>
        <Grid container spacing={4}>
          {listRoom !== null &&
            listRoom.map((room) => (
              <RoomInfo data={room} joinRoom={handleJoin} />
            ))}
        </Grid>
      </div>
>>>>>>> f2650fccd4fcd7e593989746bae7123ff4162cf6
    </div>
  );
}

export default withRouter(Home);
