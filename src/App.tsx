import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/App.css";

import Login from "./features/login/LoginComponent";
import Register from "./features/register/RegisterComponent";
import Home from "./features/home/HomeComponent";

import { UserContext } from "./context/UserContext";

import { UsersType } from "./types/UsersType";

function App() {
  const [user, setUser] = useState<UsersType | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
