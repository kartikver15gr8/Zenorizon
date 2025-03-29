import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/landing/navbar";
import { Toaster } from "sonner";
import { siteConfig } from "@/config/site-config";
import { Providers } from "./providers";
import { Bricolage_Grotesque } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage_grotesque = Bricolage_Grotesque({
  subsets: ["latin"],
});

export const metadata: Metadata = siteConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage_grotesque.className} font-light`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
