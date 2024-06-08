import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavBar } from "~/components/NavBar";
import { PageScroll } from "~/components/PageScroll";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Our Approach - Web & Mobile App Developer - Hugof",
  description:
    "Hugof is the best partner for your business in facing the Digital Era.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <NavBar title="hugof" />
        <PageScroll disableEffect={true}>{children}</PageScroll>
      </body>
    </html>
  );
}
