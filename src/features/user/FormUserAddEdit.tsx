import { useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { users } from "api/users";

import { UsersType } from "types/UsersType";
import { useGlobalContext } from "hooks/useGlobalContext";
import { Loading } from "components/index";

const FormUserAddEdit = () => {
  const [user, setUser] = useState<Partial<UsersType>>({
    name: "",
    secondName: "",
    email: "",
    password: "",
  });

  const history = useHistory();
  const { url } = useRouteMatch();
  const { userId } = useGlobalContext();

  const mutateFunc = async (value: UsersType | {}) =>
    url === "/home/user/add"
      ? users.post(value)
      : users.patch(value, user?.id!);

  const { mutate } = useMutation((value: UsersType | {}) => mutateFunc(value), {
    onSuccess: () => history.push("/home/user"),
  });

  const { isFetching } = useQuery("selectUser", () => users.getUser(userId), {
    onSuccess: (data) => {
      setUser({ ...data });
    },
    enabled: url !== "/home/user/add",
  });

  const onInputchange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  // const userVerification =
  //   name && secondName && email && password && password === confirmPassword;

  const handleForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(user);
  };

  return (
    <section className="register center-register-login">
      {isFetching ? (
        <Loading />
      ) : (
        <form onSubmit={handleForm}>
          <div className="register__inputs">
            <input
              type="text"
              placeholder="Name"
              value={user.name}
              onChange={onInputchange}
              name="name"
            />
            <input
              type="text"
              placeholder="Second Name"
              value={user.secondName}
              onChange={onInputchange}
              name="secondName"
            />
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={onInputchange}
              name="email"
            />
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={onInputchange}
              name="password"
            />
          </div>
          <div className="register__buttons">
            <Link to="/home/user">
              <button>Back to Users</button>
            </Link>
            <button
              disabled={false}
              style={{ textAlign: "center" }}
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default FormUserAddEdit;
