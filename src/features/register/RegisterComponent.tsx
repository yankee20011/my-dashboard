import { Link } from "react-router-dom";
import { useMutation } from "react-query";

const axios = require("axios").default;

interface usersType {
  id: number | Date;
  name: string;
  secondName: string;
  email: string;
  password: string;
}

const Register = () => {
  const mutation = useMutation((newUser: usersType) =>
    axios.post("http://localhost:3000/users ", newUser)
  );

  return (
    <section className="register">
      <form>
        <div className="register__inputs">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Second Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm password" />
        </div>
        <div className="register__buttons">
          <Link to="/">
            <button
              onClick={(e) => {
                mutation.mutate({
                  id: new Date(),
                  name: "Cristi",
                  secondName: "Ceapa",
                  email: "ianibanilean@gmail.com",
                  password: "qwerty",
                });
                console.log(1);
              }}
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
