import { Switch, Route, Link, useRouteMatch, Redirect } from "react-router-dom";

import PostsComponent from "./pages/PostsComponent";
import UsersComponent from "./pages/UserComponent";

import { useGlobalContext } from "../../hooks/useGlobalContext";

import ButtonEdit from "../../components/buttons/ButtonEdit";
import FormUserAdd from "../../components/forms/FormUserAddEdit";

const Home = () => {
  const { setUser, user } = useGlobalContext();
  let { path, url } = useRouteMatch();

  const signOut = () => {
    setUser(null);
  };

  if (user) {
    return (
      <div className="home">
        <nav className="home__sidebar">
          <div>{user.name + " " + user.secondName}</div>
          <ButtonEdit onClick={signOut}>Sign Out</ButtonEdit>
          <hr />
          <ul>
            <li>
              <Link to={`${url}/user`}>Users</Link>
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
            <Route path={`${path}/user`} component={UsersComponent} />
            <Route path={`${path}/posts`} component={PostsComponent} />
            <Route path={`${path}/user/add`} component={FormUserAdd} />
          </Switch>
        </section>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Home;
