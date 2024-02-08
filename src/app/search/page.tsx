"use client";

import BookCard from "@/components/bookCard";
import { searchBook } from "@/helpers/fetchBooks";
import { IBook } from "@/helpers/interfaces";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

function SearchPage() {
  const [search, setSearch] = useState<string>("");
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    setLoading((prev) => !prev);
    const data = await searchBook(search);
    setBooks(data);
    setLoading((prev) => !prev);
  };
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h1" component="h1" gutterBottom sx={{ mt: 5 }}>
        Search for a book
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <Box
          component={"form"}
          sx={{ display: "flex", p: 2 }}
          onSubmit={handleSearch}
        >
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
            required
          />
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{ ml: 2 }}
            disabled={loading}
          >
            Search
          </Button>
        </Box>

        <Box sx={{ width: "80%" }}>
          {!search && <h1>Search for a book</h1>}
          {search && books.length === 0 && <h1>No book found</h1>}

          <Grid container spacing={2}>
            {books.map((book) => (
              <Grid item xs={12} md={3} key={book.id}>
                <BookCard {...book} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default SearchPage;
