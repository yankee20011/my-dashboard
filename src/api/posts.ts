import axios from "axios";
import { PostType } from "types";

export const posts = {
  get: async () => {
    const { data } = await axios.get("http://localhost:3000/posts");
    return data;
  },
  post: async (body: PostType | {}) => {
    const { data } = await axios.post("http://localhost:3000/posts", body);
    return data;
  },
  patch: async (body: PostType | {}, id: number | null) => {
    const { data } = await axios.patch(
      `http://localhost:3000/posts/${id}`,
      body
    );
    return data;
  },
  delete: async (id: number) => {
    const { data } = await axios.delete(`http://localhost:3000/posts/${id}`);
    return data;
  },
};
