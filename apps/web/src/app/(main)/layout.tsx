import Link from "next/link";
import { NavList } from "@/components/nav-list";
import { PageScroll } from "@/components/page-scroll";
import { TextLink } from "@/components/text-link";
import { getAllContents } from "@/actions/content";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contents = await getAllContents();
  return (
    <PageScroll
      navbarTitle="hugof"
      navbarContent={
        <NavList
          mainMenu={{
            title: "Menu",
            submenu: (
              <>
                {contents.map((content) => {
                  return (
                    <Link key={content.slug} href={`/${content.slug}`}>
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
