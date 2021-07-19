import { createContext, Dispatch } from "react";

import { UsersType } from "../types/UsersType";

export interface UserContent {
  user: UsersType | null;
  setUser: Dispatch<UsersType | null>;
}

export const UserContext = createContext<UserContent>({
  setUser: () => {},
  user: null,
});
