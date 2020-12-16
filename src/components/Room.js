import React,{ useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../constants/apiContants';
import { getRoomInfo } from '../utils/api';
import io from 'socket.io-client'

const ioClient = io.connect("https://caro-game-api.herokuapp.com/");
//const ioClient = io.connect("http://127.0.0.1:8080");

function Home(props) {
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
        {data}
    </div>
  );
}

export default withRouter(Home);