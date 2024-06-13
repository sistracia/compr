import { getContentBySlug } from "@/actions/content";
import NotFound from "@/app/not-found";
import { DetailPage } from "@repo/hugof-ui/detail-page";

export default async function ContentDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const content = await getContentBySlug(params.slug);

  if (!content) {
    return <NotFound />;
  }

  return <DetailPage subtitle={content.subtitle} title={content.title} />;
}
