import Link from "next/link";
import { NavList } from "~/components/nav-list";
import { PageScroll } from "~/components/page-scroll";
import { TextLink } from "~/components/text-link";
import contents from "~/data/contents.json";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageScroll
      navbarTitle="hugof"
      navbarContent={
        <NavList
          mainMenu={{
            title: "Menu",
            submenu: (
              <>
                {Object.entries(contents).map(([slug, content]) => {
                  return (
                    <Link key={slug} href={`/${slug}`}>
                      <TextLink>{content.subtitle}</TextLink>
                    </Link>
                  );
                })}
              </>
            ),
          }}
        />
      }
    >
      {children}
    </PageScroll>
  );
}
