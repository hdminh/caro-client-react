import React from "react";

import { InfoBar } from "./InfoBar/InfoBar";
import { Messages } from "./Messages/Messages";

import "./Chat/Chat.css";

export default function ChatHistory(props) {

  return (
    <div className="outerContainer">
      {/* <TextContainer users={users} /> */}
      <div className="container">
        <InfoBar room={props.room} />
        <Messages messages={props.messages} name={props.name} />
      </div>
    </div>
  );
};
