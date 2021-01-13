import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";

export default function UserInfoForm(props) {
  const { register, handleSubmit } = useForm();
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

  const handleSubmitCheck = (e) => {};
  return (
    <form
      className={classes.form}
      noValidate
      onSubmit={handleSubmit((data) => handleSubmitCheck(data))}
    >
      <Grid container>
      <Grid item>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            value={props.data.lastname}
            fullWidth
            name="lastname"
            label="Họ"
            type="name"
            id="lastname"
          />
        </Grid>
        <Grid item xs>
          <TextField
            variant="outlined"
            margin="normal"
            value={props.data.firstname}
            fullWidth
            name="firstname"
            label="Tên"
            type="name"
            id="firstname"
          />
        </Grid>
        
      </Grid>
      <TextField
        variant="outlined"
        margin="normal"
        inputRef={register}
        value={new Date(props.data.registerdate).toLocaleDateString()}
        fullWidth
        name="firstname"
        label="Ngày đăng ký"
        type="name"
        id="firstname"
      />
      <Grid container>
        <Grid item>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            value={props.data.email}
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
          />
        </Grid>
        <Grid item xs>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            value={props.data.gender === 0 ? "Nam" : "Nữ"}
            fullWidth
            name="gender"
            label="Giới tính"
            id="gender"
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            value={props.data.totalmatch}
            fullWidth
            name="gender"
            label="Tổng số trận"
            id="gender"
          />
        </Grid>
        <Grid item xs>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            value={props.data.win}
            fullWidth
            name="gender"
            label="Số trận thắng"
            id="gender"
          />
        </Grid>
        <Grid item xs>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            value={props.data.cup}
            fullWidth
            name="gender"
            label="Cup"
            id="gender"
          />
        </Grid>
      </Grid>
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
  );
}
