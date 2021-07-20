import { useQuery, useQueryClient } from "react-query";
import { Link, useRouteMatch } from "react-router-dom";
import axios from "axios";

import { useGlobalContext } from "../../../hooks/useGlobalContext";
import { fetchUsers } from "../../../api/fetchUsers";
import { UsersType } from "../../../types/UsersType";
import ButtonDelete from "../../../components/buttons/ButtonDelete";
import ButtonEdit from "../../../components/buttons/ButtonEdit";

const User = () => {
  const { setUserId } = useGlobalContext();

  const { data } = useQuery("users", fetchUsers);
  const queryClient = useQueryClient();

  let { url } = useRouteMatch();

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
              <Link to={`${url}/add`}>
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
                <td>
                  <div className="user-table__buttons">
                    <Link to={`${url}/${item.id}/edit`}>
                      <ButtonEdit onClick={() => setUserId(item.id)}>
                        Edit
                      </ButtonEdit>
                    </Link>
                    <ButtonDelete onClick={() => deleteUser(item.id)}>
                      Delete
                    </ButtonDelete>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default User;
