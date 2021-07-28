import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useQuery } from "react-query";

import { fetchUsers } from "../../api/fetchUsers";
import { UsersType } from "../../types/UsersType";

import { useGlobalContext } from "../../hooks/useGlobalContext";
import { ToggleType } from "../../types/ToggleType";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isValidUser, setIsValidUser] = useState<ToggleType>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  console.log(isPassword);

  // useEffect(() => {
  //   if (isValidUser) {
  //     setIsVisible(false);
  //     return;
  //   }
  //   setIsValidUser(null);
  //   setIsVisible(true);
  //   const timer = setTimeout(() => {
  //     setIsVisible(false);
  //   }, 1500);
  //   return () => clearTimeout(timer);
  // }, [isValidUser]);

  const { setUser } = useGlobalContext();

  const { data } = useQuery("users", fetchUsers);

  const userLog = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const findUser = data.find(
      (users: UsersType) => users.email === loginEmail
    );

    if (findUser) {
      if (
        findUser.email === loginEmail &&
        findUser.password === loginPassword
      ) {
        setUser(findUser);
        setIsValidUser(true);
      } else if (findUser.password !== loginPassword) {
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
          {isVisible && <h4>This user doesn't exist</h4>}
          {isPassword && <h4>Incorect password</h4>}
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
