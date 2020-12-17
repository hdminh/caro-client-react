import React,{ useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import {useForm } from 'react-hook-form';
import { ACCESS_TOKEN_NAME } from '../constants/apiContants';
import { joinRoom, addRoom } from '../utils/api';
//import io from 'socket.io-client'

//const ioClient = io.connect("https://caro-game-api.herokuapp.com/");
//const ioClient = io.connect("http://127.0.0.1:8080");

function Home(props) {
      // const token = localStorage.getItem(ACCESS_TOKEN_NAME)
      // if(token){
      //   ioClient.emit("online",{ token: token })
      // }
    const {register, handleSubmit} = useForm();

    const handleJoin = ((data) => {
      joinRoom(data.id).then(result => {
        if (result.status < 400) {
          console.log(result)
          props.history.push('/room/' + result.data._id);
        }
      })
    })

    const handleAddNew = (() => {
      addRoom().then(result => {
        if (result.status < 400) {
          props.history.push('/room/' + result.data._id);
        }
      })
    })

    useEffect(() => {
        if (!localStorage.getItem(ACCESS_TOKEN_NAME)) redirectToLogin();  

    })
  function redirectToLogin() {
    props.history.push('/login');
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();
  return (
    <div className="App">
      <form className={classes.form} noValidate onSubmit={handleSubmit((data)=> handleJoin(data))}>
      <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            name="id"
            label="Input Room ID"
            type="text"
            id="id"
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
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleAddNew}
          >
            Add new room
          </Button>
    </div>
  );
}

export default withRouter(Home);