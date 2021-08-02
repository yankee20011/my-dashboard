import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useLocation,
  Redirect,
} from "react-router-dom";

import PostsComponent from "features/posts/PostsComponent";
import UsersComponent from "features/user/UserComponent";
import FormUserAddEdit from "features/user/FormUser";

import { useGlobalContext } from "hooks/useGlobalContext";
import {
  Layout,
  AvatarInline,
  Button,
  Sidebar,
  Icon,
  Container,
} from "ebs-design";

const HomeComponent = () => {
  const { setUser, user, userId } = useGlobalContext();
  let { path, url } = useRouteMatch();
  let { pathname } = useLocation();

  const signOut = () => {
    setUser(null);
  };

  return (
    <Layout className="content">
      {user ? (
        <>
          <Layout.Topbar>
            <Layout.Topbar.LeftSide>
              <Button onClick={signOut} size="small">
                Sign Out
              </Button>
            </Layout.Topbar.LeftSide>
            <Layout.Topbar.RightSide>
              <AvatarInline
                alt={`${user.name} ${user.secondName}`}
                status="active"
                reversed
              />
            </Layout.Topbar.RightSide>
          </Layout.Topbar>
          <Sidebar>
            <Sidebar.TopMenu>
              <Link to={`${url}/user`}>
                <Sidebar.Item
                  prefix={<Icon type="users" />}
                  text="Users"
                  active={pathname.startsWith("/home/user")}
                />
              </Link>
              <Link to={`${url}/posts`}>
                <Sidebar.Item
                  prefix={<Icon type="archive" />}
                  text="Posts"
                  active={pathname.startsWith("/home/post")}
                />
              </Link>
            </Sidebar.TopMenu>
          </Sidebar>
          <Layout.Content className="content">
            <Switch>
              <Route exact path={path}>
                <Container style={{ textAlign: "center" }}>
                  <h2>Welcome {`${user.name} ${user.secondName}`}</h2>
                </Container>
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
          </Layout.Content>
        </>
      ) : (
        <Redirect to="/" />
      )}
    </Layout>
  );
};

export default HomeComponent;
