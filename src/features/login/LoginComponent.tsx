import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useQuery } from "react-query";

import { fetchUsers } from "../../api/fetchUsers";
import { UsersType } from "../../types/UsersType";

import { useGlobalContext } from "../../hooks/useGlobalContext";
import { ToggleType } from "../../types/ToggleType";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isUserLogin, setIsUserLogin] = useState<ToggleType>(null);
  const [isUserPassword, setIsUserPassword] = useState<ToggleType>(null);
  const [isUserExisting, setIsUser] = useState<ToggleType>(null);
  const [isValidUser, setIsValidUser] = useState<ToggleType>(null);

  const { setUser } = useGlobalContext();

  const { data } = useQuery("users", fetchUsers);

  const userLog = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const findUser = data.find(
      (users: UsersType) => users.email === loginEmail
    );

    if (findUser) {
      setIsUser(true);
      if (
        findUser.email === loginEmail &&
        findUser.password === loginPassword
      ) {
        setUser(findUser);
        setIsValidUser(true);
        setIsUserLogin(true);
        setIsUserPassword(true);
      } else if (findUser.password !== loginPassword) {
        setIsUserPassword(false);
      }
    } else if (findUser === undefined) {
      setIsUser(false);
    }
  };

  return (
    <section className="login">
      <form>
        <div className="login__inputs">
          <input
            type="text"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <div className="login__email-error">
          {isUserExisting === false && <h4>This user doesn't exist</h4>}
        </div>
        <div className="login__email-error">
          {isUserLogin === false && <h4>The email is incorect</h4>}
        </div>
        <div className="login__password-error">
          {isUserPassword === false && <h4>The password is incorect</h4>}
        </div>
        <div className="login__buttons">
          {isValidUser ? (
            <Redirect to="/home" />
          ) : (
            <button onClick={userLog}>Sign in</button>
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
