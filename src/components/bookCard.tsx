"use client";

import { IBook } from "@/helpers/interfaces";
import { Box, CardMedia, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';

function BookCard({ title, cover, tags, writer, point, id }: IBook) {
  const router = useRouter();
  return (
    <Box
      sx={{
        p: 1,
        border: "1px solid #ccc",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0px 0px 10px 1px #ccc",
        },
      }}
      onClick={() => router.push(`/book/${id}`)}
    >
      <CardMedia
        component="img"
        image={cover}
        alt={title}
        sx={{ height: "300px", width: "100%", objectFit: "cover" }}
      />
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" component="h3" sx={{ textAlign: "center" }}>
          {title}
        </Typography>

        <Typography
          variant="subtitle2"
          component="p"
          sx={{ textAlign: "center" }}
        >
          {tags.join(", ")}
        </Typography>

        <Typography variant="body2" component="h3" sx={{ textAlign: "center" }}>
          Author: {writer}
        </Typography>

        <Typography
          variant="subtitle1"
          component="h6"
          sx={{ textAlign: "center" }}
        >
          ${point}
        </Typography>
      </Box>
    </Box>
  );
}

export default BookCard;
