import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withRouter } from "react-router-dom";
import UserInfoForm from "../components/UserInfoForm";
import { getUserInfo } from "../api/userService";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
function UserInfo(props) {
  useEffect(() => {
    getInfo();
  }, []);

  const [data, setData] = useState(null);

  const getInfo = () => {
    props.setLoading(true)
    getUserInfo()
      .then((res) => {
          props.setLoading(false)
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        props.setLoading(false)
        props.setError("Lấy thông tin không thành công");
      });
  };

  // const redirect = () => {
  //   props.setError(null)
  //   props.history.push('/login');
  // }
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      backgroundColor: "#444",
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
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {data && (
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={data.avatar}>
            <AccountCircleIcon />
          </Avatar>

          <UserInfoForm data={data} />
        </div>
      )}
    </Container>
  );
}

export default withRouter(UserInfo);
