import { getAllContents } from "@/actions/content";
import { NavBar } from "@repo/hugof-ui/nav-bar";
import { NavList } from "@repo/hugof-ui/nav-list";
import { TextLink } from "@repo/hugof-ui/text-link";
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
