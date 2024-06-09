import { PageHeader } from "../page-header";

export type PageRendererProps = {
  title?: string;
};

export function PageRenderer({
  title = "Website Creation Services,\nAndroid and iOS Applications.",
}: PageRendererProps) {
  return (
    <>
      <PageHeader subtitle="Our Approach" title={title} scrollToHash="#main" />
    </>
  );
}
