import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitHub repos list",
  description: "GitHub Repositories With Search Functionality",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen p-5 sm:p-16 flex flex-col gap-6`}
      >
        {children}
        <footer className="grow flex items-end text-xs mt-6">
          ©2023 Elsa de Alfonso
        </footer>
      </body>
    </html>
  );
}
