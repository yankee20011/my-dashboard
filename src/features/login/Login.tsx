import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="login">
      <form>
        <div className="login__inputs">
          <input type="text" placeholder="Login" />
          <input type="password" placeholder="Password" />
        </div>
        <div className="login__buttons">
          <button>Sign In</button>

          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
