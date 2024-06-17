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
      titleAs={Link}
      title="hugof"
      href="/"
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
      <div className="w-full border-t-2 border-black bg-white p-1">
        <Link href="/home/edit">
          <TextLink compact>Edit this Page</TextLink>
        </Link>
      </div>
    </NavBar>
  );
}
