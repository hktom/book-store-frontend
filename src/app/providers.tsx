"use client";

import { getMe } from "@/helpers/auth";
import { IOrder, IUser } from "@/helpers/interfaces";
import { getCurrentOrder } from "@/helpers/order";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface IUserContext {
  user: IUser | null;
  currentOrder: IOrder | null;
  fetchUser: (token: string) => void;
  fetchCurrentOrder: (token: string) => void;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  currentOrder: null,
  fetchCurrentOrder: async () => {},
  fetchUser: async () => {},
});

interface IUserProviderProps {
  children: React.ReactNode;
}

function UserProvider({ children }: IUserProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [currentOrder, setCurrentOrder] = useState<IOrder | null>(null);

  const fetchUser = async (token: string) => {
    const me = await getMe(token);
    if (me) {
      setUser(me);
    }
  };

  const fetchCurrentOrder = async (token: string) => {
    const order = await getCurrentOrder(token);
    if (order) {
      setCurrentOrder(order);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, fetchUser, fetchCurrentOrder, currentOrder }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
