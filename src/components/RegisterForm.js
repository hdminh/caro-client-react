import React from 'react';
import {ACCESS_TOKEN_NAME} from '../constants/apiContants';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useForm } from 'react-hook-form';
import { signup } from '../utils/api';
import { withRouter } from 'react-router-dom';

function RegisterForm(props) {

    const {register, handleSubmit} = useForm();


    const handleSubmitCheck = (e) => {
        console.log(e)
        signup(e.email, e.password, e.confirmpassword).then(function (response) {
                if(response.status === 200){
                    localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                    redirect();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const redirect = () => {
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit((data)=> handleSubmitCheck(data))}>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="confirmpassword"
            label="Confirm Password"
            type="confirmpassword"
            id="confirmpassword"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          
        </form>
      </div>
      
    </Container>
  );
        
}

export default withRouter(RegisterForm);