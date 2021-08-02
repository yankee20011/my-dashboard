import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { users } from "api/users";

import { UsersType } from "types/UsersType";
import { useGlobalContext } from "hooks/useGlobalContext";
import { Container, Form, Input, Loader, useForm, Button } from "ebs-design";

const FormUser = () => {
  const [form] = useForm();

  const history = useHistory();
  const { url } = useRouteMatch();
  const { userId } = useGlobalContext();

  const mutateFunc = async (value: UsersType | {}) =>
    url === "/home/user/add" ? users.post(value) : users.patch(value, data.id);

  const { mutate } = useMutation((value: UsersType | {}) => mutateFunc(value), {
    onSuccess: () => history.push("/home/user"),
  });

  const { isFetching, data } = useQuery("selectUser", () =>
    users.getUser(userId)
  );
  console.log(data);

  const handleForm = (values: UsersType) => {
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
            {url === "/home/user/add" ? "Add user" : "Edit user"}
          </h3>
          <Form.Field
            name="name"
            label="Name"
            rules={[{ required: true }]}
            initialValue={url !== "/home/user/add" ? data.name : null}
          >
            <Input type="text" />
          </Form.Field>
          <Form.Field
            name="secondName"
            label="Second Name"
            rules={[{ required: true }]}
            initialValue={url !== "/home/user/add" ? data.secondName : null}
          >
            <Input type="text" />
          </Form.Field>
          <Form.Field
            name="email"
            label="Email"
            rules={[{ required: true }]}
            initialValue={url !== "/home/user/add" ? data.email : null}
          >
            <Input type="email" />
          </Form.Field>
          <Form.Field
            name="password"
            label="Password"
            rules={[{ required: true }]}
            initialValue={url !== "/home/user/add" ? data.password : null}
          >
            <Input type="password" />
          </Form.Field>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0",
            }}
          >
            <Link to="/home/user">
              <Button>Back to Users</Button>
            </Link>
            <Button submit>Save</Button>
          </Container>
        </Form>
      )}
    </Container>
  );
};

export default FormUser;
