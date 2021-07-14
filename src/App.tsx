import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./features/login/LoginComponent";
import Register from "./features/register/RegisterComponent";
import Home from "./features/home/HomeComponent";

import "./styles/App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
