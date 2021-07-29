import React, { Dispatch, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { useGlobalContext } from "hooks/useGlobalContext";
import { PostType } from "types/PostsType";
import { Button } from "components/index";
import { posts } from "api/posts";

interface Props {
  post: PostType | null;
  setPost: Dispatch<PostType | null>;
}

const ModalEditAdd = ({ post, setPost }: Props) => {
  const [form, setForm] = useState<PostType>(post || {});
  console.log(post);

  const { setShowModal } = useGlobalContext();
  const queryClient = useQueryClient();

  const { mutate: editPost } = useMutation(
    (value: PostType | {}) => posts.patch(value, post?.id!),
    {
      onSuccess: () => queryClient.invalidateQueries("posts"),
    }
  );

  const { mutate: addPost } = useMutation(posts.post, {
    onSuccess: () => queryClient.invalidateQueries("posts"),
  });

  const handlePosts = () => {
    console.log(form);

    post
      ? editPost(form)
      : addPost({
          id: new Date().getTime(),
          ...form,
        });
    setShowModal(false);
    setPost(null);
  };

  const onInputchange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    console.log(form);
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <h4>{post ? "Edit Post" : "Add Post"}</h4>
        </div>
        <div className="modal__body">
          <form className="modal__form">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={onInputchange}
              name="title"
            />
            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={onInputchange}
              name="category"
            />
            <input
              type="text"
              placeholder="Tags"
              value={form.tags}
              onChange={onInputchange}
              name="tags"
            />
            <input
              type="time"
              value={form.date}
              onChange={onInputchange}
              name="date"
            />
            <textarea
              id="description"
              placeholder="Some text.."
              value={form.description}
              onChange={onInputchange}
              name="description"
            ></textarea>
          </form>
        </div>
        <div className="modal__footer">
          <Button
            className="button-delete delete"
            onClick={() => {
              setPost(null);
              setShowModal(false);
            }}
          >
            Close
          </Button>
          <button onClick={handlePosts}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditAdd;
