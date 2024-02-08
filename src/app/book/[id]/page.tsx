import OrderItem from "@/components/orderItem";
import { getBook } from "@/helpers/fetchBooks";
import { Box, CardMedia, Typography } from "@mui/material";

async function BookPage({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);

  return (
    <div>
      <Box
        sx={{
          mt: 10,
          p: 4,
          display: {
            md: "flex",
            xs: "block",
          },
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <CardMedia
            component="img"
            image={book?.cover}
            alt={book?.title}
            sx={{
              height: "450px",
              width: {
                md: "350px",
                xs: "100%",
              },
              objectFit: "cover",
            }}
          />

          <Typography
            variant="h6"
            component="h4"
            gutterBottom
            sx={{ textAlign: "center", mt: 2 }}
          >
            {book?.tags.join(", ")}
          </Typography>
        </Box>

        <Box sx={{ ml: 10 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ mt: 5 }}>
            {book?.title}
          </Typography>

          <Typography variant="h3" component="h3" gutterBottom sx={{ mt: 1 }}>
            Author: {book?.writer}
          </Typography>
          <Typography variant="h2" component="h2" gutterBottom sx={{ mt: 1 }}>
            ${book?.point}
          </Typography>

          <OrderItem id={params.id.toString()} />
        </Box>
      </Box>
    </div>
  );
}

export default BookPage;
