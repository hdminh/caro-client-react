import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm, Controller } from "react-hook-form";
import { login, loginGoogle, loginFacebook } from "../api/authService";
import { withRouter } from "react-router-dom";
// import "../../../style.css"
axios.defaults.timeout = 60000;
const ForgetPassword = (props) => {
  const [username, setUsername] = useState("");
  const [newpassword, setNewPassword] = useState("");
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

  const handleForgetPassword = () => {
    console.log("username");
    console.log(username,newpassword);
    // axios.post("http://localhost:8080/api/v1/auth/forgetpassword", {

     axios.post("https://caro-client-react.vercel.app/api/v1/auth/forgetpassword", {
      username,
      newpassword,
    }).then(()=>{
      //redirect
    });
  };
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form
        className={classes.form}
        noValidate
      onSubmit={() => handleForgetPassword()}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Email Address"
          className="form-control"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="name"
          value={newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="current-password"
        />
        <Button
          // type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
           onClick={handleForgetPassword}
        >
          Reset Password
        </Button>
      </form>
    </div>
  </Container>
    //   <div className="card card-container">
    //     <Form>
    //       <div>
    //         <div className="form-group">
    //           <label htmlFor="username">Username</label>
    //           <Input
    //             type="text"
    //             className="form-control"
    //             name="username"
    //             value={username}
    //             onChange={(e) => setUsername(e.target.value)}
    //           />
    //         </div>

    //         <div className="form-group">
    //           <label htmlFor="name">New password</label>
    //           <Input
    //             type="password"
    //             className="form-control"
    //             name="name"
    //             value={newpassword}
    //             onChange={(e) => setNewPassword(e.target.value)}
    //           />
    //         </div>
    //       </div>
    //     </Form>
    //     <div>
    //       <button
    //         className="btn btn-primary btn-block"
    //         onClick={() => handleForgetPassword()}
    //       >
    //         Forgot password
    //       </button>
    //     </div>
    //   </div>
    // </>
  );
};

export default ForgetPassword;
