import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitHub Repo Spy",
  description: "GitHub Repositories With Search Functionality",
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen p-5 sm:p-16 flex flex-col gap-6`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
