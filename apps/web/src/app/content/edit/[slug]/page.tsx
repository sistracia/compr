import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { editContent, getContentBySlug } from "@/actions/content";
import NotFound from "@/app/not-found";
import { ContentForm, ContentFromSchema } from "@/components/content-form";

export default async function EditSlug({
  params,
}: {
  params: { slug: string };
}) {
  const content = await getContentBySlug(params.slug);

  const updateContent = async (content: ContentFromSchema) => {
    "use server";
    await editContent({ ...content, content: {} });
    revalidatePath("/");
    redirect(`/${content.slug}`);
  };

  if (!content) {
    return <NotFound />;
  }

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
