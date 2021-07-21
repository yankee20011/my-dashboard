import { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

import { UsersType } from "../../types/UsersType";
import { ToggleType } from "../../types/ToggleType";
import { useGlobalContext } from "../../hooks/useGlobalContext";

const Register = () => {
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPassword, setIsConfirmPassword] = useState<ToggleType>(null);

  const { url } = useRouteMatch();
  const { userId } = useGlobalContext();

  const { mutate: addUser } = useMutation((newUser: UsersType) =>
    axios.post("http://localhost:3000/users ", newUser)
  );

  const { mutate: editUser } = useMutation((newUser: UsersType) =>
    axios.patch(`http://localhost:3000/users/${userId} `, newUser)
  );

  const onRegister = () => {
    if (
      name &&
      secondName &&
      email &&
      password &&
      password === confirmPassword
    ) {
      addUser({
        id: new Date().getTime(),
        name: name,
        secondName: secondName,
        email: email,
        password: password,
      });
      setIsConfirmPassword(null);
    } else if (password !== confirmPassword) {
      setIsConfirmPassword(false);
    }
  };

  const onEdit = () => {
    if (
      name &&
      secondName &&
      email &&
      password &&
      password === confirmPassword
    ) {
      editUser({
        id: new Date().getTime(),
        name: name,
        secondName: secondName,
        email: email,
        password: password,
      });
      setIsConfirmPassword(null);
    } else if (password !== confirmPassword) {
      setIsConfirmPassword(false);
    }
  };

  return (
    <section className="register">
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
        {isConfirmPassword === false ? (
          <div>Incorect Confirm Password</div>
        ) : null}
        <div className="register__buttons">
          <Link to="/home/user">
            <button
              disabled={
                name &&
                secondName &&
                email &&
                password &&
                password === confirmPassword
                  ? false
                  : true
              }
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
    </section>
  );
};

export default Register;
