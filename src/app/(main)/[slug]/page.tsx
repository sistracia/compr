import { PageRenderer } from "~/components/page-renderer";
import contents from "~/data/contents.json";

type Slug = keyof typeof contents;

export default function DetailPage({ params }: { params: { slug: Slug } }) {
  const content = contents[params.slug];
  return <PageRenderer subtitle={content.subtitle} title={content.title} />;
}
