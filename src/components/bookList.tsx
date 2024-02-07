"use client";

import { filterBooks, getBooks } from "@/helpers/fetchBooks";
import { IBook } from "@/helpers/interfaces";
import { Box, CardMedia, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import BookCard from "./bookCard";

function BookList() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasReachedEnd, setHasReachedEnd] = useState<boolean>(false);

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

  useEffect(() => {
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
            <BookCard {...book} />
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
