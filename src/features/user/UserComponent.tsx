import { useQuery, useQueryClient, useMutation } from "react-query";
import { Link, useRouteMatch, Redirect } from "react-router-dom";

import { useGlobalContext } from "hooks/useGlobalContext";
import { fetchUsers } from "api/fetchUsers";
import { UsersType } from "types/UsersType";
import { users } from "../../api/users";
import { Table, Container, Loader, Button } from "ebs-design";

const UserComponent = () => {
  const { setUserId } = useGlobalContext();
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery("users", fetchUsers);

  let { url } = useRouteMatch();

  const { mutate: deleteUser } = useMutation(users.delete, {
    onSuccess: () => queryClient.invalidateQueries(),
  });

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "name",
      render: (_: unknown, user: UsersType) =>
        `${user.name} ${user.secondName}`,
    },
    {
      title: (
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Container>Editor</Container>{" "}
          <Link to={`${url}/add`}>
            <Button>Add</Button>
          </Link>
        </Container>
      ),
      render: (_: unknown, user: UsersType) => (
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link to={`${url}/${user.id}/edit`}>
            <Button
              className="button-edit edit"
              onClick={() => setUserId(user.id)}
            >
              Edit
            </Button>
          </Link>
          <Button onClick={() => deleteUser(user.id)}>Delete</Button>
        </Container>
      ),
    },
  ];

  return (
    <>
      {isFetching ? (
        <Loader loading />
      ) : (
        <>
          <Table columns={columns} data={data} />
          {data.length === 0 && <Redirect to="/" />}
        </>
      )}
    </>
  );
};

export default UserComponent;
