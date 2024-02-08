"use client";

import {
  getCurrentOrder,
  removeBookFromCart,
  updateOrder,
} from "@/helpers/order";
import { Alert, Box, Button, CardMedia, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function Cart() {
  const router = useRouter();
  const { currentOrder, fetchCurrentOrder, fetchUser } =
    useContext(UserContext);
  const token = Cookies.get("token") || "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (token && !currentOrder) {
      fetchCurrentOrder(token);
    }
  }, [currentOrder, fetchCurrentOrder, token]);

  if (!currentOrder) {
    return <Box>Loading....</Box>;
  }

  const remove = async (cartId: string, bookId: string, token: string) => {
    await removeBookFromCart(cartId, bookId, token);
    fetchCurrentOrder(token);
  };

  const placeOrder = async (orderId: string, status: string, token: string) => {
    setLoading((prev) => !prev);
    const res = await updateOrder(orderId, status, token);
    if (res) {
      await fetchUser(token);
      await fetchCurrentOrder(token);
      setSuccess("Order placed successfully");
    } else {
      setError(
        "Failed to place order. Please try again later and check your balance."
      );
    }
    setLoading((prev) => !prev);
  };

  return (
    <Box sx={{ mt: 5 }}>
      {error && <Alert severity="error"> {error}</Alert>}
      {success && <Alert severity="success"> {success}</Alert>}

      {currentOrder.carts.map((cart) => (
        <Box
          key={cart.id}
          onClick={() => router.push(`/book/${cart.bookId}`)}
          sx={{
            display: "flex",
            cursor: "pointer",
            transition: "all 0.3s ease",
            mb: 2,

            border: "1px solid #ccc",
            "&:hover": {
              boxShadow: "0px 0px 10px 1px #ccc",
            },
          }}
        >
          <CardMedia
            component="img"
            image={cart.bookCover}
            sx={{ width: "150px", height: "150px", objectFit: "cover" }}
          />

          <Box sx={{ ml: 2, p: 2 }}>
            <Typography variant="h6">{cart.bookTitle}</Typography>
            <Typography variant="body1">
              {cart.quantity} x ${cart.unitPrice}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => remove(cart.id, cart.bookId, token)}
              size="small"
              sx={{ mt: 2 }}
            >
              Remove
            </Button>
          </Box>
        </Box>
      ))}

      {currentOrder.carts.length > 0 && (
        <Button
          variant="contained"
          color="success"
          sx={{ mt: 2 }}
          disabled={loading}
          onClick={() => placeOrder(currentOrder.id, "purchased", token)}
        >
          Checkout for ${currentOrder.total}
        </Button>
      )}
    </Box>
  );
}

export default Cart;
