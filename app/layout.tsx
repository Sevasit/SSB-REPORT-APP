import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./providers";
import FontPrompt from "../app/utils/customFonts";
import QueryProvider from "./utils/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SSB-REPORT",
  description: "Suggestion system for BUS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <html lang="en" className=" h-auto">
        <body
          style={{ fontFamily: "var(--font-prompt)" }}
          className={`${FontPrompt.variable}`}
        >
          <QueryProvider>{children}</QueryProvider>
        </body>
      </html>
    </NextAuthProvider>
  );
}
