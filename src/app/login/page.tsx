"use client";

import { autLogin } from "@/helpers/auth";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useContext, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { UserContext } from "../providers";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, fetchUser } = useContext(UserContext);
  const router = useRouter();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading((prev) => !prev);
    const token = await autLogin({ email, password });
    if (token) {
      Cookies.set("token", token);
      await fetchUser(token);
      setLoading((prev) => !prev);
      router.push("/");
    } else {
      setLoading((prev) => !prev);
      setError("login failed");
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
          Login
        </Typography>

        <Typography variant="body1" align="center" color="error">
          {error}
        </Typography>
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
          Login
        </Button>

        <Link href="/register"> dont have an account ? sign up </Link>
      </Box>
    </Box>
  );
}

export default Login;
