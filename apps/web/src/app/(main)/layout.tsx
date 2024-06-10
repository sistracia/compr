import { getAllContents } from "@/actions/content";
import { NavBar } from "@/components/nav-bar";
import { NavList } from "@/components/nav-list";
import { TextLink } from "@/components/text-link";
import Link from "next/link";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contents = await getAllContents();

  return (
    <NavBar
      title="hugof"
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
    </NavBar>
  );
}
