import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ride Ready | Road rules for young riders",
  description:
    "Build safer riding habits with kid-friendly lessons for bikes, scooters, and e-scooters.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
