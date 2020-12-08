import React from 'react';
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
  const title = "abc";
  return (
    <Router>
    <div className="App">
      <Header title={title}/>
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/login">
              <LoginForm />
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
