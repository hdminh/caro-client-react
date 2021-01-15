import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
const ForgetPassword = (props) => {
  const [red,setRed] =useState('')
  let id = new URLSearchParams(window.location.search).get("id");
  let userid = new URLSearchParams(window.location.search).get("userid");
  axios
    .post("http://localhost:8080/api/v1/auth/verifyemail", {
      id,
      userid,
    })
    .then((value) => {
        setRed("12")
      
    });
  return <>{
      red&&(<Redirect to="/login"></Redirect>)
  }
  </>;
};

export default ForgetPassword;