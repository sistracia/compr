import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import "@repo/form-ui/styles.css";
import "@repo/hugof-ui/styles.css";
import "@repo/smooth-scroll/styles.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed top-0 z-[9999] w-full bg-yellow-100 text-black">
            <p>
              <a
                href="https://hugaf.com"
                target="_blank"
                rel="noreferrer noopener nofollow"
                className="text-sky-600"
              >
                hugaf
              </a>{" "}
              web clone, clonned for learning purpose.
            </p>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
