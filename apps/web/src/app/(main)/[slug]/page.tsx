import { getContentBySlug } from "@/actions/content";
import NotFound from "@/app/not-found";
import { PageRenderer } from "@/components/page-renderer";

export default async function DetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const content = await getContentBySlug(params.slug);

  if (!content) {
    return <NotFound />;
  }

  return <PageRenderer subtitle={content.subtitle} title={content.title} />;
}
