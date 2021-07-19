import { useQuery, useQueryClient } from "react-query";
import { Link, useRouteMatch } from "react-router-dom";
import axios from "axios";

import { fetchUsers } from "../../../api/fetchUsers";
import { UsersType } from "../../../types/UsersType";
import ButtonDelete from "../../../components/buttons/ButtonDelete";
import ButtonEdit from "../../../components/buttons/ButtonEdit";
import FormUserAdd from "../../../components/forms/FormUserAddEdit";

const Users = () => {
  const { data } = useQuery("users", fetchUsers);
  const queryClient = useQueryClient();

  let { path, url } = useRouteMatch();

  queryClient.invalidateQueries();

  const deleteUser = (id: number) => {
    axios.delete(`http://localhost:3000/users/${id}`);
  };

  return (
    <>
      <table className="user-table">
        <thead>
          <tr className="user-table__heading">
            <th>Email</th>
            <th>Username</th>
            <th>
              <Link to={`${path}/add`}>
                <ButtonEdit>Add User</ButtonEdit>
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
                <th className="user-table__buttons">
                  <ButtonEdit>Edit</ButtonEdit>
                  <ButtonDelete onClick={() => deleteUser(item.id)}>
                    Delete
                  </ButtonDelete>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Users;
