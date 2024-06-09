import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { NavList } from "~/components/nav-list";
import { PageScroll } from "~/components/page-scroll";
import { TextLink } from "~/components/text-link";
import "../globals.css";

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
        <PageScroll
          navbarTitle="hugof"
          navbarContent={
            <NavList
              mainMenu={{
                title: "Menu",
                submenu: (
                  <>
                    <Link href="#portfolio">
                      <TextLink>Portfolio & Case Studies</TextLink>
                    </Link>
                    <Link href="#about-us">
                      <TextLink>About Us</TextLink>
                    </Link>
                    <Link href="#service">
                      <TextLink>Service</TextLink>
                    </Link>
                    <Link href="#contact-us">
                      <TextLink>Contact Us</TextLink>
                    </Link>
                    <Link href="#faq">
                      <TextLink>FAQ</TextLink>
                    </Link>
                  </>
                ),
              }}
              extraMenus={[
                {
                  title: "Information",
                  submenu: (
                    <>
                      <Link href="#website-creation-services">
                        <TextLink compact>Website Creation Services</TextLink>
                      </Link>
                      <Link href="#android-ios-app-pricing">
                        <TextLink compact>Android & iOS App Pricing</TextLink>
                      </Link>
                      <Link href="#blog">
                        <TextLink compact>Blog</TextLink>
                      </Link>
                      <Link href="#our-approach">
                        <TextLink compact>Out Approach</TextLink>
                      </Link>
                      <Link href="#legal">
                        <TextLink compact>Legal</TextLink>
                      </Link>
                      <Link href="#privacy-cookies">
                        <TextLink compact>Privacy & Cookies</TextLink>
                      </Link>
                    </>
                  ),
                },
                {
                  title: "Headquarters",
                  submenu: (
                    <>
                      <p className="text-sm">
                        PT Panca Teknologi Indonesia, Senatama Building 3rd
                        Floor, 10420 DKI Jakarta, Indonesia
                      </p>
                      <a
                        target="_blank"
                        href="https://wa.me/6282260004141"
                        rel="noreferrer noopener nofollow"
                      >
                        <TextLink compact>0822 6000 4141</TextLink>
                      </a>
                      <Link href="#career">
                        <TextLink compact>Career</TextLink>
                      </Link>
                    </>
                  ),
                },
              ]}
            />
          }
        >
          {children}
        </PageScroll>
      </body>
    </html>
  );
}
