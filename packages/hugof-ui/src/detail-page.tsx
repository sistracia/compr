import { DetailPageHeader } from "./detail-page-header";

export type DetailPageProps = {
  title?: string;
  subtitle?: string;
};

export function DetailPage({ title = "", subtitle = "" }: DetailPageProps) {
  return (
    <>
      <DetailPageHeader subtitle={subtitle} title={title} />
    </>
  );
}
