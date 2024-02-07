import BookList from "@/components/bookList";
import { IBook } from "@/helpers/interfaces";
import { Box, CardMedia, Typography } from "@mui/material";
import axios from "axios";

export default async function Home() {
  return (
    <main>
      <CardMedia
        component="img"
        image="/banner.jpg"
        alt="Vercel"
        sx={{ height: "550px", width: "100%", objectFit: "cover" }}
      />

      <Typography variant="h1" component="h1" gutterBottom sx={{ mt: 5 }}>
        Welcome to the JenKins Book Store
      </Typography>

      <Typography variant="h5" component="p" gutterBottom sx={{ mt: 5 }}>
        You can find the best books in the world here.
      </Typography>

      <BookList />
    </main>
  );
}
