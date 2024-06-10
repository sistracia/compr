import sql from "@/lib/db";
import { Content } from "@/types/content";

export async function getAllContents() {
  const contents = await sql<
    Content[]
  >`SELECT slug, subtitle, title, content FROM content`;

  return contents;
}

export async function getContentBySlug(slug: string) {
  const [content] = await sql<
    [Content?]
  >`SELECT slug, subtitle, title, content FROM content WHERE slug = ${slug}`;

  return content;
}

export async function addContent({ content, slug, subtitle, title }: Content) {
  await sql`
      INSERT INTO "content"
          (slug, subtitle, title, content)
      VALUES 
          (${slug}, ${subtitle},  ${title}, ${JSON.stringify(content)})
    `;
}

export async function editContent({ content, slug, subtitle, title }: Content) {
  await sql`
        UPDATE "content"
        SET (slug, subtitle, title, content) =
            (${slug}, ${subtitle},  ${title}, ${JSON.stringify(content)})
        WHERE slug = ${slug}
    `;
}
