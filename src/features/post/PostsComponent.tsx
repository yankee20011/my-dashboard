import React, { useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "react-query";

import ModalEditAdd from "./ModalEditAdd";

import { fetchPosts } from "../../api/fetchPosts";
import { PostType } from "../../types/PostsType";
import { useGlobalContext } from "../../hooks/useGlobalContext";

import { Button, Loading } from "../../components/index";

const PostsComponent: React.FC = () => {
  const [post, setPost] = useState<PostType | null>(null);

  const { showModal, setShowModal } = useGlobalContext();

  const { data, isFetching } = useQuery("posts", fetchPosts);

  const queryClient = useQueryClient();

  const { mutate: deletePost } = useMutation(
    (id: number) => axios.delete(`http://localhost:3000/posts/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries(),
    }
  );

  return (
    <section className="posts">
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <div className="posts__add-post">
            <Button
              className="button-edit edit"
              onClick={() => {
                setShowModal(true);
              }}
            >
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
                              setShowModal(true);
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

      {showModal && <ModalEditAdd post={post} setPost={setPost} />}
    </section>
  );
};

export default PostsComponent;
