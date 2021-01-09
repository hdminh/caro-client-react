import React from 'react';
import {ACCESS_TOKEN_NAME} from '../constants/apiContants';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useForm, Controller} from 'react-hook-form';
import { login, loginGoogle, loginFacebook } from '../api/authService';
import { withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

function LoginForm(props) {

    const {register, handleSubmit, control} = useForm();

    const onSuccessGoogle = async (responseGG) => {
      console.log(responseGG);
      loginGoogle(responseGG.tokenId).then(
        (res) => {
          if (res.status === 200) {
            localStorage.setItem("user", JSON.stringify(res.data.datalogin.firstname));
            localStorage.setItem(ACCESS_TOKEN_NAME, res.data.datalogin.token)
            redirectToHome()
          }
        },
        (error) => {
          props.setError(error.message)
        }
      );
    }
    const onFailureGoogle = (response) => {
      console.log("failure" + response);
      console.log(response);
      props.setError("Login Google failed!")
  
    }
    const responseFacebook = (responseFB) => {
      console.log(responseFB)
      loginFacebook(responseFB.accessToken).then(
        (res) => {
          console.log(res)
          if (res.status === 200) {
            localStorage.setItem("user", JSON.stringify(res.data.datalogin.firstname));
            localStorage.setItem(ACCESS_TOKEN_NAME, res.data.datalogin.token)
            redirectToHome()
          }
        },
        (error) => {
          props.setError(error.message)
        }
      );
    }
    const componentClicked =() =>{
      console.log("click");
    }

    const handleSubmitCheck = (e) => {
        console.log(e)
      
        login(e.username, e.password).then((response) => {
          console.log(response)
                if(response.status === 200){
                    localStorage.setItem(ACCESS_TOKEN_NAME, response.data.datalogin.token);
                    redirectToHome();
                }
            })
            .catch((error) => {
              props.setError(error.message)
              
            });
    }
    const redirectToHome = () => {
        props.history.push('/');
        props.setError(null)
        props.setTitle("Home")
        props.setAuth(true);
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
            id="username"
            label="Email Address"
            name="username"
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
          <FormControlLabel
            control={
              <Controller as={Checkbox} control={control} name="remember" color="primary" defaultValue={false}/>}
            label="Remember me"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <GoogleLogin
            size="small"
            fullWidth
            clientId= "316252754883-uijdm91atqp7dunbbukpii5bkele0ttg.apps.googleusercontent.com"
            buttonText="LOGIN WITH GOOGLE"
            onSuccess={onSuccessGoogle}
            onFailure={onFailureGoogle}
            cookiePolicy={'single_host_origin'}
          />
            <br/> 
            <br/> 
          <FacebookLogin
            size="small"
            type="button"
            fullWidth
            variant="contained"
            appId="4063580557003301"
            fields="name,email,picture"
            icon="fa-facebook"
            onClick={componentClicked}
            callback={responseFacebook} />
            <br/>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
        
}

export default withRouter(LoginForm);