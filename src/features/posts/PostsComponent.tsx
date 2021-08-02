import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";

import ModalEditAdd from "./PostsModal";

import { PostType } from "types/PostsType";
import { posts } from "api/posts";
import { Loader, Button, Container, Modal } from "ebs-design";

const PostsComponent: React.FC = () => {
  const [post, setPost] = useState<PostType | null>(null);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery("posts", posts.get);

  const onToggleHandler = (): void => setOpen((s) => !s);

  const { mutate: deletePost } = useMutation(posts.delete, {
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return (
    <Container>
      {isFetching ? (
        <Loader loading />
      ) : (
        <>
          <div className="posts__add-post">
            <Button className="button-edit edit" onClick={onToggleHandler}>
              Add New Post
            </Button>
          </div>
          <div className="posts__container">
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
                      <div className="posts__buttons">
                        <div>
                          <Button
                            className="button-edit edit"
                            onClick={() => {
                              onToggleHandler();
                              setPost(item);
                            }}
                          >
                            Edit
                          </Button>
                        </div>
                        <Button
                          className="button-delete delete"
                          onClick={() => deletePost(item.id!)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </>
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
