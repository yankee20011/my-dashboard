import { Switch, Route, Link, useRouteMatch, Redirect } from "react-router-dom";

import PostsComponent from "./pages/PostsComponent";
import UsersComponent from "./pages/UserComponent";

import { useGlobalContext } from "../../hooks/useGlobalContext";

import FormUserAddEdit from "../../components/forms/FormUserAddEdit";
import ButtonDelete from "../../components/buttons/ButtonDelete";

const Home = () => {
  const { setUser, user, userId } = useGlobalContext();
  let { path, url } = useRouteMatch();

  const signOut = () => {
    setUser(null);
  };

  return (
    <div className="home">
      {user ? (
        <div>
          <nav className="home__sidebar">
            <div className="home__user-container">
              <div className="home__user">
                {user.name + " " + user.secondName}
              </div>
              <ButtonDelete onClick={signOut}>Sign Out</ButtonDelete>
            </div>
            <ul className="home__link-container">
              <hr />
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
                  <h2>Welcome {user.name + " " + user.secondName}</h2>
                </div>
              </Route>
              <Route exact path={`${path}/user`} component={UsersComponent} />
              <Route exact path={`${path}/posts`} component={PostsComponent} />
              <Route
                exact
                path={`${path}/user/add`}
                component={FormUserAddEdit}
              />
              <Route
                exact
                path={`${path}/user/${userId?.toString()}/edit`}
                component={FormUserAddEdit}
              />
            </Switch>
          </section>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

export default Home;
