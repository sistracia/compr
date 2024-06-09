import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile } from "node:fs/promises";
import { ContentForm, ContentFromSchema } from "~/components/content-form";
import contents from "~/data/contents.json";

export default function EditSlug() {
  const createContent = async (content: ContentFromSchema) => {
    "use server";

    const { slug, ...data } = content;
    await writeFile(
      process.cwd() + "/src/data/contents.json",
      JSON.stringify({ ...contents, [slug]: data }),
    );
    revalidatePath("/");
    redirect("/");
  };

  return <ContentForm createContent={createContent} />;
}
