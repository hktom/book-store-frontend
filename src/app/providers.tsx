"use client";

import { getMe } from "@/helpers/auth";
import { IUser } from "@/helpers/interfaces";
import React, { createContext, useContext, useState } from "react";

export interface IUserContext {
  user: IUser | null;
  fetchUser: (token: string) => void;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  fetchUser: () => {},
});

interface IUserProviderProps {
  children: React.ReactNode;
}

function UserProvider({ children }: IUserProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);

  const fetchUser = async (token: string) => {
    const me = await getMe(token);
    if (me) {
      setUser(me);
    }
  };

  return (
    <UserContext.Provider value={{ user, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
