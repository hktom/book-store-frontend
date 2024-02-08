"use client";

import { Alert, Box, Button, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers";
import { updateOrder } from "@/helpers/order";

function Order() {
  const { user, fetchUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = Cookies.get("token") || "";

  if (!user) {
    return <Box>Loading....</Box>;
  }

  const cancelOrder = async (orderId: string, token: string) => {
    setLoading((prev) => !prev);
    const res = await updateOrder(orderId, "cancelled", token);
    if (res) {
      await fetchUser(token);
      setSuccess("Order cancelled successfully");
    } else {
      setError("Failed to cancel order. Please try again later");
    }
    setLoading((prev) => !prev);
  };

  return (
    <Box>
      {error && <Alert severity="error"> {error}</Alert>}
      {success && <Alert severity="success"> {success}</Alert>}
      {user.orders
        .filter((order) => order.status !== "pending")
        .map((order, index) => (
          <Box
            key={order.id}
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
            <Box sx={{ ml: 2, p: 2 }}>
              <Typography variant="h6">
                #{index + 1} : {order.id}
              </Typography>
              <Typography variant="body1">
                ${order.total} - {order.status}
              </Typography>
              {order.status !== "cancelled" && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => cancelOrder(order.id, token)}
                  disabled={loading}
                  size="small"
                  sx={{ mt: 2 }}
                >
                  Cancel
                </Button>
              )}
            </Box>
          </Box>
        ))}
    </Box>
  );
}

export default Order;
