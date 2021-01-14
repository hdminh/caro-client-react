import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useForm } from 'react-hook-form';
import { checkRegister, signup } from '../api/authService';
import { withRouter } from 'react-router-dom';

function RegisterForm(props) {

    const {register, handleSubmit} = useForm();

    const handleSubmitCheck = (e) => {
        checkRegister(e.username, e.password, e.confirmpassword).then(res => {
          if(res.status === 200){
          signup(e).then(function (response) {
            console.log(response)
                if(response.status === 201){
                    redirect();
                }
            })
            .catch(function (error) {
              props.setError(error)
            });
        }
      }).catch((error) => {
        console.log(error);
        props.setError(error.message)
      });
    }
    const redirect = () => {
      props.setError(null)
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
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="confirmpassword"
            label="Confirm Password"
            type="password"
            id="confirmpassword"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="firstname"
            label="First Name"
            type="name"
            id="firstname"
            autoComplete="name"
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="lastname"
            label="Last Name"
            type="name"
            id="lastname"
            autoComplete="name"
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
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Have an account? sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
        
}

export default withRouter(RegisterForm);