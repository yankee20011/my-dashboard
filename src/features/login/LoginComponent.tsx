import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useQuery } from "react-query";
import { Button, Container, Form, Input, Space, useForm } from "ebs-design";

import { useGlobalContext } from "hooks/useGlobalContext";
import { UsersType } from "types/UsersType";
import { ToggleType } from "types/ToggleType";
import { fetchUsers } from "api/fetchUsers";

interface Login {
  email: string;
  password: string;
}

const LoginComponent = () => {
  const [isValidUser, setIsValidUser] = useState<ToggleType>(null);

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
      }
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
        <Space justify="space-between">
          {isValidUser ? (
            <Redirect to="/home" />
          ) : (
            <Button submit>Sign in</Button>
          )}
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </Space>
      </Form>
    </Container>
  );
};

export default LoginComponent;
