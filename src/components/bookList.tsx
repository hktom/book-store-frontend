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

const filterBooks = (prevBooks: IBook[], newBooks: IBook[]) => {
  const books = newBooks.filter((newBook) => {
    return !prevBooks.some((prevBook) => prevBook.id === newBook.id);
  });

  return [...prevBooks, ...books];
};

function BookList() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasReachedEnd, setHasReachedEnd] = useState<boolean>(false);

  useEffect(() => {
    async function fetchBooks(page: number) {
      setLoading((prevLoading) => !prevLoading);
      const newBooks = await getBooks(page);
      if (newBooks.length > 0) {
        setBooks((prevBooks) => filterBooks(prevBooks, newBooks));
        setLoading((prevLoading) => !prevLoading);
      } else {
        setHasReachedEnd(true);
      }
    }
    fetchBooks(page);
  }, [page]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight * 0.8 &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const bottomMessage = useMemo(() => {
    if (hasReachedEnd) {
      return "You have reached the end!";
    } else if (loading) {
      return "Loading...";
    } else {
      return "";
    }
  }, [hasReachedEnd, loading]);

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

      <Typography variant="h5" sx={{ my: 7 }}>
        {bottomMessage}
      </Typography>
    </Box>
  );
}

export default BookList;
