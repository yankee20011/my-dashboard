import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./features/login/Login";
import Register from "./features/register/Register";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
