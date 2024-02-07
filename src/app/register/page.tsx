import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";

function Register() {
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
          Register
        </Typography>
        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          name="firstName"
          type="text"
          fullWidth
        />

        <TextField
          id="outlined-basic"
          label="last Name"
          variant="outlined"
          name="lastName"
          type="text"
          fullWidth
        />

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
          Register
        </Button>

        <Link href="/login"> login </Link>
      </Box>
    </Box>
  );
}

export default Register;
