import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useQuery } from "react-query";

import { fetchUsers } from "api/fetchUsers";
import { UsersType } from "types/UsersType";
import { useGlobalContext } from "hooks/useGlobalContext";
import { ToggleType } from "types/ToggleType";

import { Button, Container, Form, Input, useForm } from "ebs-design";

interface Login {
  email: string;
  password: string;
}

const LoginComponent = () => {
  const [isValidUser, setIsValidUser] = useState<ToggleType>(null);
  const [isUserError, setIsUserError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const [form] = useForm();

  const { setUser } = useGlobalContext();

  const { data } = useQuery("users", fetchUsers);

  const userLog = (values: Login) => {
    const findUser = data.find(
      (users: UsersType) => users.email === values.email
    );

    if (findUser) {
      if (
        findUser.email === values.email &&
        findUser.password === values.password
      ) {
        setUser(findUser);
        setIsValidUser(true);
      } else if (findUser.password !== values.password) {
        setIsPasswordError(true);
        setTimeout(() => {
          setIsPasswordError(false);
        }, 1500);
      }
    } else if (findUser === undefined) {
      setIsUserError(true);
      setTimeout(() => {
        setIsUserError(false);
      }, 1500);
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "100vh",
        marginTop: "-1rem",
      }}
    >
      <Form form={form} onFinish={userLog} className="form">
        <h3 style={{ marginBottom: "1rem" }}>Login</h3>
        <Form.Field name="email" label="Email" rules={[{ required: true }]}>
          <Input type="email" size="medium" />
        </Form.Field>
        <Form.Field
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input type="password" size="medium" />
        </Form.Field>

        <Container style={{ margin: "1rem 0 1rem 0" }}>
          {isUserError && <h4>This user doesn't exist</h4>}
          {isPasswordError && <h4>Incorect password</h4>}
        </Container>
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0",
          }}
        >
          {isValidUser ? (
            <Redirect to="/home" />
          ) : (
            <Button submit>Sign in</Button>
          )}
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </Container>
      </Form>
    </Container>
  );
};

export default LoginComponent;
