import { createContext, Dispatch } from "react";

import { UsersType } from "../types/UsersType";

export interface UserContent {
  user: UsersType | null;
  setUser: Dispatch<UsersType | null>;
  userId: number | null;
  setUserId: Dispatch<number | null>;
  showModal: boolean;
  setShowModal: Dispatch<boolean>;
}

export const UserContext = createContext<UserContent>({
  setUser: () => {},
  setUserId: () => {},
  user: null,
  userId: null,
  showModal: false,
  setShowModal: () => {},
});
