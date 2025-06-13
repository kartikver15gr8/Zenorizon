import type { Metadata } from "next";
import Navbar from "@/components/landing/navbar";
import { siteConfig } from "@/config/site-config";

export const metadata: Metadata = siteConfig;

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
