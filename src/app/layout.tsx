import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Box } from "@mui/material";
import UserProvider from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <UserProvider>
          <Header />
          <Box sx={{ maxWidth: "90rem", mx: "auto", mt: 4 }}>{children}</Box>
        </UserProvider>
      </body>
    </html>
  );
}
