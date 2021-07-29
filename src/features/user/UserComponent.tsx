import { useQuery, useQueryClient, useMutation } from "react-query";
import { Link, useRouteMatch, Redirect } from "react-router-dom";

import { useGlobalContext } from "hooks/useGlobalContext";
import { fetchUsers } from "api/fetchUsers";
import { UsersType } from "types/UsersType";
import { Button, Loading } from "components/index";
import { users } from "../../api/users";

const UserComponent = () => {
  const { setUserId } = useGlobalContext();
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery("users", fetchUsers);

  let { url } = useRouteMatch();

  const { mutate: deleteUser } = useMutation(users.delete, {
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <div>
          <table className="user-table">
            <thead>
              <tr className="user-table__heading">
                <th>Email</th>
                <th>Username</th>
                <th>
                  <Link to={`${url}/add`}>
                    <Button className="button-edit edit">Add User</Button>
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: UsersType) => {
                return (
                  <tr key={item.id} className="user-table__content">
                    <td>{item.email}</td>
                    <td>{item.name + " " + item.secondName}</td>
                    <td>
                      <div className="user-table__buttons">
                        <Link to={`${url}/${item.id}/edit`}>
                          <Button
                            className="button-edit edit"
                            onClick={() => setUserId(item.id)}
                          >
                            Edit
                          </Button>
                        </Link>
                        <Button
                          className="button-delete delete"
                          onClick={() => deleteUser(item.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {data.length === 0 && <Redirect to="/" />}
        </div>
      )}
    </>
  );
};

export default UserComponent;
