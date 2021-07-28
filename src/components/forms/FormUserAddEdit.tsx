import { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

import Loading from "../loading/Loading";

import { UsersType } from "../../types/UsersType";
import { useGlobalContext } from "../../hooks/useGlobalContext";

const FormUser = () => {
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { url } = useRouteMatch();
  const { userId } = useGlobalContext();

  const { mutate: addUser } = useMutation((newUser: UsersType) =>
    axios.post("http://localhost:3000/users", newUser)
  );

  const { mutate: editUser } = useMutation((newUser: UsersType) =>
    axios.patch(`http://localhost:3000/users/${userId}`, newUser)
  );

  const { isFetching } = useQuery(
    "selectUser",
    async () => {
      const { data } = await axios.get(`http://localhost:3000/users/${userId}`);
      return data;
    },
    {
      onSuccess: (data) => {
        if (url === "/home/user/add") {
          setName("");
          setSecondName("");
          setEmail("");
        } else {
          setName(data.name);
          setSecondName(data.secondName);
          setEmail(data.email);
        }
      },
    }
  );

  const userVerification =
    name && secondName && email && password && password === confirmPassword;

  const onRegister = () => {
    if (userVerification) {
      addUser({
        id: new Date().getTime(),
        name: name,
        secondName: secondName,
        email: email,
        password: password,
      });
    }
  };

  const onEdit = () => {
    if (userVerification) {
      editUser({
        id: new Date().getTime(),
        name: name,
        secondName: secondName,
        email: email,
        password: password,
      });
    }
  };

  // const onInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e);

  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  return (
    <section className="register center-register-login">
      {isFetching ? (
        <Loading />
      ) : (
        <form>
          <div className="register__inputs">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Second Name"
              value={secondName}
              onChange={(e) => setSecondName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="register__buttons">
            <Link to="/home/user">
              <button
                disabled={userVerification ? false : true}
                onClick={url === "/home/user/add" ? onRegister : onEdit}
                style={{ textAlign: "center" }}
              >
                {url === "/home/user/add" ? "Add User" : "Edit User"}
              </button>
            </Link>
            <Link to="/home/user">
              <button>Back to Users</button>
            </Link>
          </div>
        </form>
      )}
    </section>
  );
};

export default FormUser;
