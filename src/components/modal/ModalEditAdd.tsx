import React, { Dispatch, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

import ButtonDelete from "../buttons/ButtonDelete";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { PostType } from "../../types/PostsType";

interface Props {
  post: PostType | null;
  setPost: Dispatch<PostType | null>;
}

const ModalEditAdd = ({ post, setPost }: Props) => {
  const [form, setForm] = useState<PostType | null>(null);
  // const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   if (form) {
  //     setIsVisible(false);
  //     return;
  //   }
  //   setIsVisible(true);
  //   const timer = setTimeout(() => {
  //     setIsVisible(false);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, [form]);

  const { setShowModal } = useGlobalContext();

  const queryClient = useQueryClient();

  const { mutate: editPost } = useMutation(
    (value: PostType) => {
      return axios.patch(`http://localhost:3000/posts/${post?.id} `, value);
    },
    {
      onSuccess: () => queryClient.invalidateQueries("posts"),
    }
  );

  const { mutate: addPost } = useMutation(
    (newPost: PostType | null) => {
      return axios.post("http://localhost:3000/posts", newPost);
    },
    {
      onSuccess: () => queryClient.invalidateQueries("posts"),
    }
  );

  const ifEditPost = () => {
    console.log(form);

    post
      ? editPost(form!)
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
    setForm({ ...form, [e.target.name]: e.target.value });
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
              value={form?.title}
              defaultValue={post?.title}
              onChange={onInputchange}
              name="title"
            />
            <input
              type="text"
              placeholder="Category"
              value={form?.category}
              defaultValue={post?.category}
              onChange={onInputchange}
              name="category"
            />
            <input
              type="text"
              placeholder="Tags"
              value={form?.tags}
              defaultValue={post?.tags}
              onChange={onInputchange}
              name="tags"
            />
            <input
              type="time"
              defaultValue={post?.date}
              value={form?.date}
              onChange={onInputchange}
              name="date"
            />
            <textarea
              id="description"
              placeholder="Some text.."
              value={form?.description}
              defaultValue={post?.description}
              onChange={onInputchange}
              name="description"
            ></textarea>
          </form>
        </div>
        <div className="modal__footer">
          <ButtonDelete
            onClick={() => {
              setPost(null);
              setShowModal(false);
            }}
          >
            Close
          </ButtonDelete>
          <button onClick={ifEditPost}>{post ? "Edit" : "Add"}</button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditAdd;
