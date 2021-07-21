import { useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "react-query";

import { fetchPosts } from "../../../api/fetchPosts";
import { PostType } from "../../../types/PostsType";
import ButtonDelete from "../../../components/buttons/ButtonDelete";
import ButtonEdit from "../../../components/buttons/ButtonEdit";
import ModalEditAdd from "../../../components/modal/ModalEditAdd";
import { useGlobalContext } from "../../../hooks/useGlobalContext";

const PostsComponent = () => {
  const { setShowModal } = useGlobalContext();

  const { data } = useQuery("users", fetchPosts);
  console.log(data);

  const queryClient = useQueryClient();

  const { mutate: deletePost } = useMutation(
    (id: number) => axios.delete(`http://localhost:3000/posts/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries(),
    }
  );

  return (
    <section className="posts">
      <div className="posts__add-post">
        <ButtonEdit onClick={() => setShowModal(true)}>Add New Post</ButtonEdit>
      </div>
      <div className="posts__container">
        {data?.map((item: PostType) => {
          return (
            <div key={item.id} className="posts__block">
              <h2 className="posts__title">{item.title}</h2>
              <div className="posts__date-category-container">
                <h4 className="posts__category">{item.category}</h4>
                <p className="posts__date">{item.date}</p>
              </div>
              <div className="posts__tags">
                {item.tags?.map((tag, index) => (
                  <div key={index}>{tag}</div>
                ))}
              </div>
              <p className="posts__description">{item.description}</p>
              <div className="posts__buttons">
                <div>
                  <ButtonEdit onClick={() => setShowModal(true)}>
                    Edit
                  </ButtonEdit>
                </div>
                <ButtonDelete onClick={() => deletePost(item.id)}>
                  Delete
                </ButtonDelete>
              </div>
            </div>
          );
        })}
      </div>
      <ModalEditAdd />
    </section>
  );
};

export default PostsComponent;
