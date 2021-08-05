import { Dispatch } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  Button,
  Form,
  Modal,
  Input,
  Textarea,
  Container,
  useForm,
  DatePicker,
  Space,
} from "ebs-design";

import { PostType } from "types/PostsType";
import { posts } from "api/posts";

interface Props {
  post: PostType | null;
  setPost: Dispatch<PostType | null>;
  onToggleHandler: () => void;
}

const PostsModal = ({ post, setPost, onToggleHandler }: Props) => {
  const [form] = useForm();

  const queryClient = useQueryClient();

  const { mutate: editPost } = useMutation(
    (value: PostType) => posts.patch(value, post?.id!),
    {
      onSuccess: () => queryClient.invalidateQueries("posts"),
    }
  );

  const { mutate: addPost } = useMutation(posts.post, {
    onSuccess: () => queryClient.invalidateQueries("posts"),
  });

  const handlePosts = (values: PostType) => {
    post ? editPost(values) : addPost(values);
    onToggleHandler();
    setPost(null);
  };

  return (
    <Modal.Content>
      <Form form={form} onFinish={handlePosts}>
        <h2 style={{ textAlign: "center" }}>
          {post ? "Edit Post" : "Add Post"}
        </h2>
        <Form.Field
          name="title"
          label="Title"
          rules={[{ required: true }]}
          initialValue={post?.title}
        >
          <Input type="text" />
        </Form.Field>
        <Form.Field
          name="category"
          label="Category"
          rules={[{ required: true }]}
          initialValue={post?.category}
        >
          <Input type="text" />
        </Form.Field>
        <Form.Field
          name="tags"
          label="Tags"
          rules={[{ required: true }]}
          extra="To add more capsules divide them with (,)"
          initialValue={post?.tags}
        >
          <Input type="text" />
        </Form.Field>
        <Form.Field
          name="date"
          label="Time"
          rules={[{ required: true }]}
          initialValue={post?.date}
        >
          <DatePicker showTimeSelect dateFormat="yy/MMMM/d HH" />
        </Form.Field>
        <Form.Field
          name="description"
          label="Description"
          rules={[{ required: true }]}
          initialValue={post?.description}
        >
          <Textarea className="textarea" />
        </Form.Field>

        <Space justify="space-between">
          <Button
            className="button-delete delete"
            onClick={() => {
              setPost(null);
              onToggleHandler();
            }}
          >
            Close
          </Button>
          <Button submit>Save</Button>
        </Space>
      </Form>
    </Modal.Content>
  );
};

export default PostsModal;
