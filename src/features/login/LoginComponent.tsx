import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useQuery } from "react-query";

import { fetchUsers } from "api/fetchUsers";
import { UsersType } from "types/UsersType";

import { useGlobalContext } from "hooks/useGlobalContext";
import { ToggleType } from "types/ToggleType";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isValidUser, setIsValidUser] = useState<ToggleType>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const { setUser } = useGlobalContext();

  const { data } = useQuery("users", fetchUsers);

  const userLog = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const findUser = data.find(
      (users: UsersType) => users.email === form.email
    );

    if (findUser) {
      if (
        findUser.email === form.email &&
        findUser.password === form.password
      ) {
        setUser(findUser);
        setIsValidUser(true);
      } else if (findUser.password !== form.password) {
        setIsPassword(true);
        setTimeout(() => {
          setIsPassword(false);
        }, 1500);
      }
    } else if (findUser === undefined) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    }
  };

  return (
    <section className="login">
      <form onSubmit={userLog}>
        <div className="login__inputs">
          <input
            type="text"
            placeholder="Email"
            value={form.email}
            onChange={onInputChange}
            name="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onInputChange}
            name="password"
          />
        </div>
        <div className="login__email-error">
          {isVisible && <h4>This user doesn't exist</h4>}
          {isPassword && <h4>Incorect password</h4>}
        </div>
        <div className="login__buttons">
          {isValidUser ? (
            <Redirect to="/home" />
          ) : (
            <button type="submit">Sign in</button>
          )}
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
