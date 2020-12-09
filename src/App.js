import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PrivateRoute from './utils/PrivateRoute';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  const [title, setTitle] = useState("Caro");
  const [auth, setAuth] = useState(true);

  return (
    <Router>
    <div className="App">
      <Header title={title} auth={auth} setAuth={setAuth} />
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/login">
              <LoginForm setAuth={setAuth} setTitle={setTitle} />
            </Route>
            <Route path="/register">
              <RegisterForm />
            </Route>
            <PrivateRoute path="/" exact>
              <Home/>
            </PrivateRoute>
          </Switch>
        </div>
    </div>
    </Router>
  );
}

export default App;
