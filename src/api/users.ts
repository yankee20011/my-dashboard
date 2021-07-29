import axios from "axios";
import { UsersType } from "types";

export const users = {
  get: async () => {
    const { data } = await axios.get("http://localhost:3000/users");
    return data;
  },
  post: async (body: UsersType | {}) => {
    const { data } = await axios.post("http://localhost:3000/users", body);
    return data;
  },
  patch: async (body: UsersType | {}, id: number | null) => {
    const { data } = await axios.patch(
      `http://localhost:3000/users/${id}`,
      body
    );
    return data;
  },
  delete: async (id: number) => {
    const { data } = await axios.delete(`http://localhost:3000/users/${id}`);
    return data;
  },
  getUser: async (id: number | null) => {
    const { data } = await axios.get(`http://localhost:3000/users/${id}`);
    return data;
  },
};
