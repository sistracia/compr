import { PageHeader } from "~/components/PageHeader";

export default function Home() {
  return (
    <>
      <PageHeader
        subtitle="Our Approach"
        title={"Website Creation Services,\nAndroid and iOS Applications."}
        scrollToHash="#main"
      />
      <div id="main" className="h-screen border-2 border-solid border-black">
        Hohoho
      </div>
      <PageHeader subtitle="XXXX" title={"XXXX"} scrollToHash="#xmain" />
      <main
        id="xmain"
        className="h-screen border-2 border-solid border-rose-500"
      >
        Hihihi
      </main>
    </>
  );
}
