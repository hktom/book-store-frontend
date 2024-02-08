"use client";

import { autLogin, autRegister } from "@/helpers/auth";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { UserContext } from "../providers";
import Cookies from "js-cookie";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, fetchUser, fetchCurrentOrder } = useContext(UserContext);
  const router = useRouter();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading((prev) => !prev);
    const token = await autRegister({ email, password, firstName, lastName });
    if (token) {
      Cookies.set("token", token);
      await fetchUser(token);
      await fetchCurrentOrder(token);
      setLoading((prev) => !prev);
      router.push("/");
    } else {
      setLoading((prev) => !prev);
      setError("register failed");
    }
  };

  return (
    <Box sx={{ maxWidth: "40rem", mx: "auto", mt: 10 }}>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
          px: 5,
          border: "1px solid #ccc",
          borderRadius: 1,
        }}
        onSubmit={onSubmit}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>

        <Typography variant="body1" align="center" color="error">
          {error}
        </Typography>

        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          name="firstName"
          type="text"
          fullWidth
          onChange={(e) => setFirstName(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="last Name"
          variant="outlined"
          name="lastName"
          type="text"
          fullWidth
          onChange={(e) => setLastName(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name="email"
          type="email"
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          fullWidth
          sx={{ my: 2 }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="success"
          sx={{ mb: 5 }}
          type="submit"
          disabled={loading}
        >
          Register
        </Button>

        <Link href="/login"> login </Link>
      </Box>
    </Box>
  );
}

export default Register;
