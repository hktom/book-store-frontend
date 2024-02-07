"use client";

import { IBook } from "@/helpers/interfaces";
import { Box, CardMedia, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

const getBooks = async (page: number): Promise<IBook[]> => {
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

function BookList() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [page, setPage] = useState<number>(1);

  const filterBooks = (prevBooks: IBook[], newBooks: IBook[]) => {
    const books = newBooks.filter((newBook) => {
      return !prevBooks.some((prevBook) => prevBook.id === newBook.id);
    });

    return [...prevBooks, ...books];
  };

  useEffect(() => {
    async function fetchBooks(page: number) {
      const newBooks = await getBooks(page);
      setBooks((prevBooks) => filterBooks(prevBooks, newBooks));
    }
    fetchBooks(page);
  }, [page]);

  return (
    <Box sx={{ mt: 5 }}>
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item xs={12} md={3} key={book.id}>
            <Box
              sx={{
                p: 1,
                border: "1px solid #ccc",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                image={book.cover}
                alt={book.title}
                sx={{ height: "300px", width: "100%", objectFit: "cover" }}
              />
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body1"
                  component="h3"
                  sx={{ textAlign: "center" }}
                >
                  {book.title}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default BookList;
