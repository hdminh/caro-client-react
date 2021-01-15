import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from "axios";
import "../../../style.css"
axios.defaults.timeout = 60000;
const ForgetPassword = (props) => {
  const [username, setUsername] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const handleForgetPassword = () => {
    axios.post("http://localhost:8080/api/v1/auth/forgetpassword", {
      username,
      newpassword,
    }).then(()=>{
      //redirect
    });
  };
  return (
    <>
      <div className="card card-container">
        <Form>
          <div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">New password</label>
              <Input
                type="password"
                className="form-control"
                name="name"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
        </Form>
        <div>
          <button
            className="btn btn-primary btn-block"
            onClick={() => handleForgetPassword()}
          >
            Forgot password
          </button>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
