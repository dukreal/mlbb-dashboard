import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // These were imported by default
import "./globals.css";

// 1. These define the fonts
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 2. Here is where we apply the font and the scroll-lock classes */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black h-screen overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
