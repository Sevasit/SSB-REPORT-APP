import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./providers";
import FontPrompt from "../app/utils/customFonts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body
          style={{ fontFamily: "var(--font-prompt)" }}
          className={FontPrompt.variable}
        >
          {children}
        </body>
      </html>
    </NextAuthProvider>
  );
}
