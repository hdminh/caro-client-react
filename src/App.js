import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { makeStyles } from "@material-ui/core/styles";
import Home from "./page/Home";
import Room from "./page/Room";
import Match from "./page/Match";
import History from "./page/History";
import LoginForm from "./page/LoginForm";
import Ranking from "./page/Ranking";
import RegisterForm from "./page/RegisterForm";
import PrivateRoute from "./utils/PrivateRoute";
import Alert from "@material-ui/lab/Alert";
import User from "./page/User";
import MatchHistory from "./page/MatchHistory";
import NotFound from "./page/NotFound";
import Backdrop from "@material-ui/core/Backdrop";
import ResetPassword from "./page/ResetPassword";
import ConformVerify from "./page/ConformVerify";
import ConformVeryfyMail from "./page/ConformVerifyMail";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function App(props) {
  const classes = useStyles();
  const [title, setTitle] = useState("Caro");
  const [auth, setAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Router>
      <div className="App">
        <div className="container">
          <Header
            title={title}
            auth={auth}
            setAuth={setAuth}
            setTitle={setTitle}
          />
          <div className="container d-flex align-items-center flex-column">
            {error && <Alert severity="error">{error}</Alert>}
            {loading && (
              <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" />
              </Backdrop>
            )}
            <Switch>
              <Route path="/login">
                <LoginForm
                  setAuth={setAuth}
                  setTitle={setTitle}
                  setError={setError}
                  setLoading={setLoading}
                />
              </Route>
              <Route path="/resetpassword">
                <ResetPassword/>
              </Route>

              <Route path="/user/forgetpassword">
                <ConformVerify/>
              </Route>
              
              <Route path="/user/emailverify/verify">
                <ConformVeryfyMail/>
              </Route>

              <Route path="/register">
                <RegisterForm setError={setError} setLoading={setLoading} />
              </Route>
              <PrivateRoute path="/" exact>
                <Home setError={setError} setLoading={setLoading} />
              </PrivateRoute>
              <PrivateRoute path="/room/:id">
                <Room
                  setTitle={setTitle}
                  setError={setError}
                  setLoading={setLoading}
                />
              </PrivateRoute>
              <PrivateRoute path="/match/:id/:ishost">
                <Match
                  setError={setError}
                  title={title}
                  setLoading={setLoading}
                />
              </PrivateRoute>
              <PrivateRoute exact path="/user">
                <User setError={setError} setLoading={setLoading} />
              </PrivateRoute>
              <PrivateRoute path="/ranking">
                <Ranking setError={setError} setLoading={setLoading} />
              </PrivateRoute>
              <PrivateRoute path="/history">
                <History setError={setError} setLoading={setLoading} />
              </PrivateRoute>
              <PrivateRoute path="/detail/:id">
                <MatchHistory setError={setError} setLoading={setLoading} />
              </PrivateRoute>
              <Route path="" component={NotFound} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
