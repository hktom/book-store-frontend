"use client";

import { IBook } from "@/helpers/interfaces";
import { Box, Button, Fab } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function OrderItem({ id }: any) {
  const [quantity, setQuantity] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Fab
        color="success"
        aria-label="add"
        onClick={() => setQuantity((prev) => prev + 1)}
      >
        <AddIcon />
      </Fab>

      <Box sx={{ mx: 2 }}>{quantity}</Box>

      <Fab
        color="error"
        aria-label="remove"
        onClick={() => setQuantity((prev) => (prev > 0 ? prev - 1 : 0))}
      >
        <RemoveIcon />
      </Fab>

      <Button
        variant="contained"
        color="success"
        sx={{ ml: 5 }}
        onClick={() => console.log(id)}
      >
        Add to cart
      </Button>
    </Box>
  );
}

export default OrderItem;
