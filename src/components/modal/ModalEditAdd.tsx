import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";

import { useGlobalContext } from "../../hooks/useGlobalContext";
import { PostType } from "../../types/PostsType";
import ButtonDelete from "../buttons/ButtonDelete";
import ButtonEdit from "../buttons/ButtonEdit";

const ModalEditAdd: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [description, setDescrition] = useState<string>("");

  const { showModal, setShowModal } = useGlobalContext();

  const { mutate: addPost } = useMutation((newUser: PostType) =>
    axios.post("http://localhost:3000/posts ", newUser)
  );

  // const { mutate: editPost } = useMutation((newUser: PostType) =>
  //   axios.patch(`http://localhost:3000/users/${userId} `, newUser)
  // );

  if (!showModal) {
    return null;
  } else
    return (
      <div className="modal">
        <div className="modal__content">
          <div className="modal__header">
            <h4>Add Post</h4>
          </div>
          <div className="modal__body">
            <form className="modal__form">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="tags">Tags:</label>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <label htmlFor="time">Time:</label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescrition(e.target.value)}
              ></textarea>
            </form>
          </div>
          <div className="modal__footer">
            <ButtonDelete onClick={() => setShowModal(false)}>
              Close
            </ButtonDelete>
            <ButtonEdit
              onClick={() =>
                addPost({
                  id: new Date().getTime(),
                  title: title,
                  description: description,
                  date: time,
                  tags: [tags],
                  category: category,
                })
              }
            >
              Add
            </ButtonEdit>
          </div>
        </div>
      </div>
    );
};

export default ModalEditAdd;
