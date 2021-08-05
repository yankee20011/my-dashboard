import { Link, useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import {
  Container,
  useForm,
  Button,
  Form,
  Input,
  Loader,
  Space,
} from "ebs-design";

import { UsersType } from "types/UsersType";

const Register = () => {
  const [form] = useForm();
  const history = useHistory();

  const { mutate, isLoading } = useMutation(
    (values: UsersType) => axios.post("http://localhost:3000/users ", values),
    { onSuccess: () => history.push("/") }
  );

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
      {isLoading ? (
        <Loader loading />
      ) : (
        <Form className="form" form={form} onFinish={mutate}>
          <h3 style={{ marginBottom: "1rem" }}>Register</h3>
          <Form.Field name="name" label="Name" rules={[{ required: true }]}>
            <Input type="text" />
          </Form.Field>
          <Form.Field
            name="secondName"
            label="Second Name"
            rules={[{ required: true }]}
          >
            <Input type="text" />
          </Form.Field>
          <Form.Field name="email" label="Email" rules={[{ required: true }]}>
            <Input type="email" />
          </Form.Field>
          <Form.Field
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input type="password" />
          </Form.Field>
          <Space justify="space-between">
            <Link to="/">
              <Button>Back to Login</Button>
            </Link>
            <Button submit>Register</Button>
          </Space>
        </Form>
      )}
    </Container>
  );
};

export default Register;
