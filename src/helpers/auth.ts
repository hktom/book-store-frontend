import axios from "axios";
import { IUser } from "./interfaces";

export const getMe = async (token: string) => {
  try {
    const { data } = await axios.get("http://localhost:3000/me", {
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
    const { data } = await axios.post("http://localhost:3000/login", {
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
    const { data } = await axios.post("http://localhost:3000/register", {
      ...user,
    });

    return data.token;
  } catch (error) {
    console.error(error);
    return null;
  }
};
