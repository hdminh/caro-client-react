import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './page/Home';
import Room from './page/Room';
import Match from './page/Match';
import LoginForm from './page/LoginForm';
import RegisterForm from './page/RegisterForm';
import PrivateRoute from './utils/PrivateRoute';
import Alert from '@material-ui/lab/Alert';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  const [title, setTitle] = useState("Caro");
  const [auth, setAuth] = useState(true);
  const [error, setError] = useState(null);

  return (
    <Router>
    <div className="App">
      <Header title={title} auth={auth} setAuth={setAuth} setTitle={setTitle} />
        <div className="container d-flex align-items-center flex-column">
        {error && <Alert severity="error">{error}</Alert>}
          <Switch>
            <Route path="/login">
              <LoginForm setAuth={setAuth} setTitle={setTitle} setError={setError} />
            </Route>
            <Route path="/register">
              <RegisterForm setError={setError} />
            </Route>
            <PrivateRoute path="/" exact>
              <Home setError={setError}/>
            </PrivateRoute>
            <PrivateRoute path="/room/:id" >
              <Room setTitle={setTitle} setError={setError}/>
            </PrivateRoute>
            <PrivateRoute path="/match/" >
              <Match />
            </PrivateRoute>
          </Switch>
        </div>
    </div>
    </Router>
  );
}

export default App;
