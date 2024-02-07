import axios from "axios";
import { IBook } from "./interfaces";

export const getBooks = async (page: number): Promise<IBook[]> => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/books?page=${page}`
    );

    return data as IBook[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const filterBooks = (prevBooks: IBook[], newBooks: IBook[]) => {
  const books = newBooks.filter((newBook) => {
    return !prevBooks.some((prevBook) => prevBook.id === newBook.id);
  });

  return [...prevBooks, ...books];
};
