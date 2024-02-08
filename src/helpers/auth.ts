import axios from "axios";
import { IUser } from "./interfaces";

export const getMe = async (token: string) => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data as IUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const autLogin = async (user: Partial<IUser>) => {
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/login`, {
      ...user,
    });

    return data.token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const autRegister = async (user: Partial<IUser>) => {
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/register`, {
      ...user,
    });

    return data.token;
  } catch (error) {
    console.error(error);
    return null;
  }
};
