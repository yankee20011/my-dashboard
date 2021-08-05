import { Link, useHistory } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import {
  Container,
  Form,
  Input,
  Loader,
  useForm,
  Button,
  Space,
} from "ebs-design";

import { users } from "api/users";
import { useGlobalContext } from "hooks/useGlobalContext";
import { UsersType } from "types/UsersType";

const FormUser = () => {
  const [form] = useForm();

  const history = useHistory();
  const { userId } = useGlobalContext();
  console.log(userId);

  const { isFetching, data } = useQuery("selectUser", () =>
    users.getUser(userId)
  );

  const mutateFunc = async (value: UsersType) =>
    userId ? users.patch(value, data.id) : users.post(value);

  const { mutate } = useMutation((value: UsersType) => mutateFunc(value), {
    onSuccess: () => history.push("/home/user"),
  });

  const handleForm = (values: UsersType) => {
    console.log(values);

    mutate(values);
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {isFetching ? (
        <Loader loading />
      ) : (
        <Form className="form" form={form} onFinish={handleForm}>
          <h3 style={{ marginBottom: "1rem" }}>
            {userId ? "Edit user" : "Add user"}
          </h3>
          <Form.Field
            name="name"
            label="Name"
            rules={[{ required: true }]}
            initialValue={userId ? data.name : null}
          >
            <Input type="text" />
          </Form.Field>
          <Form.Field
            name="secondName"
            label="Second Name"
            rules={[{ required: true }]}
            initialValue={userId ? data.secondName : null}
          >
            <Input type="text" />
          </Form.Field>
          <Form.Field
            name="email"
            label="Email"
            rules={[{ required: true }]}
            initialValue={userId ? data.email : null}
          >
            <Input type="email" />
          </Form.Field>
          <Form.Field
            name="password"
            label="Password"
            rules={[{ required: true }]}
            initialValue={userId ? data.password : null}
          >
            <Input type="password" />
          </Form.Field>
          <Space justify="space-between">
            <Link to="/home/user">
              <Button>Back to Users</Button>
            </Link>
            <Button submit>Save</Button>
          </Space>
        </Form>
      )}
    </Container>
  );
};

export default FormUser;
