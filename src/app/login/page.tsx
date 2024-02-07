import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";

function Login() {
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
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name="email"
          type="email"
          fullWidth
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          fullWidth
          sx={{ my: 2 }}
        />

        <Button variant="contained" color="success" sx={{ mb: 5 }}>
          Login
        </Button>

        <Link href="/register"> dont have an account ? sign up </Link>
      </Box>
    </Box>
  );
}

export default Login;
