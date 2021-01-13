import React, { useState, useEffect } from "react";
import queryString from 'query-string';
// import io from "socket.io-client";
import {ioClient} from "../../socket/index";


import {InfoBar} from '../InfoBar/InfoBar';
import {Input} from '../Input/Input';
import {Messages} from '../Messages/Messages';
import {TextContainer} from '../TextContainer/TextContainer'

import './Chat.css';

// let socket;

export const Chat = (props) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    const { name, room } = props;
    console.log(name+room);

    setRoom(room);
    setName(name);

    ioClient.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, []);
  
  useEffect(() => {
    ioClient.on('message', message => {
      setMessages(msgs => [ ...msgs, message ]);
    });
    
    ioClient.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      ioClient.emit('sendMessage', message, () => setMessage(''));
    }
  }


  return (
    <div className="outerContainer">
    {/* <TextContainer users={users} /> */}
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}