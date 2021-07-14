import React from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";

import PostsComponent from "./pages/PostsComponent";
import UsersComponent from "./pages/UserComponent";

const Home = () => {
  let { path, url } = useRouteMatch();

  return (
    <div className="home">
      <nav className="home__sidebar">
        <div>Username</div>
        <hr />
        <ul>
          <li>
            <Link to={`${url}/users`}>Users</Link>
          </li>
          <li>
            <Link to={`${url}/posts`}>Posts</Link>
          </li>
        </ul>
      </nav>
      <section className="home__content">
        <Switch>
          <Route exact path={path}>
            <div className="welcome-page">
              <h2>Welcome page</h2>
            </div>
          </Route>
          <Route path={`${path}/users`} component={UsersComponent} />
          <Route path={`${path}/posts`} component={PostsComponent} />
        </Switch>
      </section>
    </div>
  );
};

export default Home;
