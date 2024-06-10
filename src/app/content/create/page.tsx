import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addContent } from "~/app/actions/content";
import { ContentForm, ContentFromSchema } from "~/components/content-form";

export default function EditSlug() {
  const createContent = async (content: ContentFromSchema) => {
    "use server";

    await addContent({
      ...content,
      content: {},
    });

    revalidatePath("/");
    redirect("/");
  };

  return <ContentForm createContent={createContent} />;
}
