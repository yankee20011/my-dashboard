import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

import { UsersType } from "../../types/UsersType";
import { ToggleType } from "../../types/ToggleType";

const Register = () => {
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPassword, setIsConfirmPassword] = useState<ToggleType>(null);

  const mutation = useMutation((newUser: UsersType) =>
    axios.post("http://localhost:3000/users ", newUser)
  );

  const registerVerification =
    name && secondName && email && password && password === confirmPassword;

  const onRegister = () => {
    if (registerVerification) {
      mutation.mutate({
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
          />
          <input
            type="text"
            placeholder="Second Name"
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
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
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {isConfirmPassword === false ? (
          <div>Incorect Confirm Password</div>
        ) : null}
        <div className="register__buttons">
          <Link to="/">
            <button
              disabled={registerVerification ? false : true}
              onClick={onRegister}
            >
              Register
            </button>
          </Link>
          <Link to="/">
            <button>Back to Login</button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Register;
