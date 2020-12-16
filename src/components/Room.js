import React,{ useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../constants/apiContants';
import { getRoomInfo } from '../utils/api';
import UserInfoCard from '../components/UserInfoCard';

function Room(props) {

    const [players, setPlayers] = useState([])

    const setListUser = (() => {
        getRoomInfo(props.match.params.id).then(result => {
            setPlayers(result.data.players)
            console.log('list player', players)
        })
    })

    useEffect(() => {
        if (!localStorage.getItem(ACCESS_TOKEN_NAME)) redirectToLogin();  
        setListUser();
        
    })
  function redirectToLogin() {
    props.history.push('/login');
  }
  return (
    <div className="App">
      {players.map((player) => <UserInfoCard user={player} />)}
    </div>
  );
}

export default withRouter(Room);