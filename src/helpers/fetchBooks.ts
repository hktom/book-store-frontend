import axios from "axios";
import { IBook } from "./interfaces";

export const getBooks = async (page: number): Promise<IBook[]> => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/books?page=${page}`);

    return data as IBook[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchBook = async (title: string): Promise<IBook[]> => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/book?title=${title}`);

    return data as IBook[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBook = async (id: string): Promise<IBook | null> => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/book/${id}`);

    return data as IBook;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const filterBooks = (prevBooks: IBook[], newBooks: IBook[]) => {
  const books = newBooks.filter((newBook) => {
    return !prevBooks.some((prevBook) => prevBook.id === newBook.id);
  });

  return [...prevBooks, ...books];
};
