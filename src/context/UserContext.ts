import { createContext, Dispatch } from "react";

import { UsersType } from "../types/UsersType";

export interface UserContent {
  user: UsersType | null;
  userId: number | null;
  showModal: boolean;
  setUser: Dispatch<UsersType | null>;
  setUserId: Dispatch<number | null>;
  setShowModal: Dispatch<boolean>;
}

export const UserContext = createContext<UserContent>({
  user: null,
  userId: null,
  showModal: false,
  setUser: () => {},
  setUserId: () => {},
  setShowModal: () => {},
});
