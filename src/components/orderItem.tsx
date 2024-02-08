"use client";

import { IBook, IOrder } from "@/helpers/interfaces";
import { Box, Button, Fab, Typography } from "@mui/material";
import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { UserContext } from "@/app/providers";
import Link from "next/link";
import { addBookToCart, updateBookInCart } from "@/helpers/order";
import Cookies from "js-cookie";

function OrderItem({ id }: any) {
  const [quantity, setQuantity] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { user, currentOrder, fetchCurrentOrder } = useContext(UserContext);
  const token = Cookies.get("token");

  if (!user) {
    return (
      <Box>
        <Typography variant="h6">
          Please login to continue <Link href="/login">sign in</Link>
        </Typography>
      </Box>
    );
  }

  const onAddToCart = async (
    bookId: string,
    quantity: number,
    currentOrder: IOrder
  ) => {
    const cartIndex: number = currentOrder!.carts.findIndex(
      (cart) => cart.bookId === bookId
    );

    const newCart = {
      bookId: bookId,
      quantity: quantity,
    };
    if (cartIndex === -1) {
      addToCart(newCart);
    } else {
      const cartId = currentOrder?.carts[cartIndex].id;
      updateCart({ ...newCart, cartId: cartId });
    }
  };

  const addToCart = async ({ bookId, quantity }: any) => {
    setLoading((prev) => !prev);
    const cart = await addBookToCart(bookId, quantity, token!);
    if (cart) {
      await fetchCurrentOrder(token!);
    }
    setLoading((prev) => !prev);
  };

  const updateCart = async ({ bookId, quantity, cartId }: any) => {
    setLoading((prev) => !prev);
    const cart = await updateBookInCart(cartId, bookId, quantity, token!);
    if (cart) {
      await fetchCurrentOrder(token!);
    }
    setLoading((prev) => !prev);
  };

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
        onClick={() => onAddToCart(id, quantity, currentOrder!)}
        disabled={loading}
      >
        Add to cart
      </Button>
    </Box>
  );
}

export default OrderItem;
