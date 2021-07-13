import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
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
          <Link to="">
            <button>Register</button>
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
