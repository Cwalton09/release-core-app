import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Release Core",
  description: "A calm and focused starting point for Release Core sessions."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
