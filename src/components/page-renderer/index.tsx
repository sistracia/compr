import { PageHeader } from "../page-header";

export type PageRendererProps = {
  title?: string;
  subtitle?: string;
};

export function PageRenderer({ title = "", subtitle = "" }: PageRendererProps) {
  return (
    <>
      <PageHeader subtitle={subtitle} title={title} />
    </>
  );
}
