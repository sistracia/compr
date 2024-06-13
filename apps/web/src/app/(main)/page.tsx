import { HomePage } from "@repo/hugof-ui/home-page";

export default function Home() {
  return (
    <HomePage
      title={
        "Website & Mobile Application Creation Services\nProvide Digital Solutions for Your Business."
      }
      sliderContents={[
        <div key="1" className="h-full bg-white"></div>,
        <div key="2" className="h-full bg-red-600"></div>,
        <div key="3" className="h-full bg-yellow-600"></div>,
        <div key="4" className="h-full bg-green-600"></div>,
        <div key="5" className="h-full bg-blue-600"></div>,
        <div key="6" className="h-full bg-purple-600"></div>,
      ]}
    />
  );
}
