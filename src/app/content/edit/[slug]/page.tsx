import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile } from "node:fs/promises";
import { ContentForm, ContentFromSchema } from "~/components/content-form";
import contents from "~/data/contents.json";

type Slug = keyof typeof contents;

export default function EditSlug({ params }: { params: { slug: Slug } }) {
  const content = contents[params.slug];

  const updateContent = async (content: ContentFromSchema) => {
    "use server";

    const { slug, ...data } = content;
    await writeFile(
      process.cwd() + "/src/data/contents.json",
      JSON.stringify({ ...contents, [slug]: data }),
    );
    revalidatePath("/");
    redirect(`/${slug}`);
  };

  return (
    <ContentForm
      createContent={updateContent}
      defaulValues={{
        ...content,
        slug: params.slug,
      }}
    />
  );
}
