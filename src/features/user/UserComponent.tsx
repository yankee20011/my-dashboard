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
      title: "Editor",
      render: () => (
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button>Edit</Button>
          <Button onClick={() => deleteUser}>Delete</Button>
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
