import { ThemeProvider } from "@/components/theme-provider";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="w-full fixed bottom-0 bg-yellow-100 text-black">
            <p>
              This{" "}
              <a
                href="https://hugaf.com"
                target="_blank"
                rel="noreferrer noopener nofollow"
                className="text-sky-600"
              >
                Hugaf
              </a>{" "}
              web clone is made for learning purpose by cloning.
            </p>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
