import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { Loader, Button, Container, Modal, Card, Space } from "ebs-design";

import { posts } from "api/posts";
import { PostType } from "types/PostsType";

import ModalEditAdd from "./PostsModal";

const PostsComponent: React.FC = () => {
  const [post, setPost] = useState<PostType | null>(null);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery("posts", posts.get);

  const onToggleHandler = (): void => setOpen((s) => !s);

  const { mutate: deletePost } = useMutation(posts.delete, {
    onSuccess: () => queryClient.invalidateQueries("posts"),
  });

  return (
    <Container>
      {isFetching ? (
        <Loader loading />
      ) : (
        <Card>
          <Card.Header bordered>
            <Button className="button-edit edit" onClick={onToggleHandler}>
              Add New Post
            </Button>
          </Card.Header>
          <Card.Body className="posts-body">
            {data.length
              ? data?.map((item: PostType) => {
                  const newTags = item?.tags?.split(",");

                  return (
                    <div key={item.id} className="posts__block">
                      <h2 className="posts__title">{item.title}</h2>
                      <div className="posts__date-category-container">
                        <h4 className="posts__category">{item.category}</h4>
                        <p className="posts__date">{item.date}</p>
                      </div>
                      <div className="posts__tags">
                        {newTags?.map((tag, index) => (
                          <div key={index}>{tag}</div>
                        ))}
                      </div>
                      <p className="posts__description">{item.description}</p>
                      <Space justify="end">
                        <Button
                          className="button-edit edit"
                          onClick={() => {
                            onToggleHandler();
                            setPost(item);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          className="button-delete delete"
                          onClick={() => deletePost(item.id!)}
                        >
                          Delete
                        </Button>
                      </Space>
                    </div>
                  );
                })
              : null}
          </Card.Body>
        </Card>
      )}

      <Modal open={open} onClose={onToggleHandler}>
        <ModalEditAdd
          post={post}
          setPost={setPost}
          onToggleHandler={onToggleHandler}
        />
      </Modal>
    </Container>
  );
};

export default PostsComponent;
