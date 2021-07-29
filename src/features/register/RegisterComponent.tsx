import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

import { UsersType } from "types/UsersType";
import { Loading } from "components";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    secondName: "",
    email: "",
    password: "",
  });

  const history = useHistory();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const { mutate, isLoading } = useMutation(
    (newUser: UsersType) => axios.post("http://localhost:3000/users ", newUser),
    { onSuccess: () => history.push("/") }
  );

  const registerVerification =
    form.name && form.secondName && form.email && form.password;

  const onRegister = () => {
    if (registerVerification) {
      mutate({
        id: new Date().getTime(),
        ...form,
      });
    }
  };

  return (
    <section className="register">
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={onRegister}>
          <div className="register__inputs">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={onInputChange}
              name="name"
            />
            <input
              type="text"
              placeholder="Second Name"
              value={form.secondName}
              onChange={onInputChange}
              name="secondName"
            />
            <input
              type="email"
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
          <div className="register__buttons">
            <button
              disabled={registerVerification ? false : true}
              type="submit"
            >
              Register
            </button>
            <Link to="/">
              <button>Back to Login</button>
            </Link>
          </div>
        </form>
      )}
    </section>
  );
};

export default Register;
