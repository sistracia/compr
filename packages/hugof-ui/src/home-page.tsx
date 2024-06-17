import { HomePageHeader } from "./home-page-header";
import { ImageSlider, ImageSliderProps } from "./image-slider";

export type HomePageProps = {
  title?: string;
  sliderContents?: ImageSliderProps["contents"];
  headerExtra?: React.ReactNode;
};

export function HomePage({
  title = "",
  sliderContents,
  headerExtra,
}: HomePageProps) {
  return (
    <div className="h-dvh">
      <HomePageHeader
        title={title}
        curtainCount={3}
        className="h-2/4"
        extra={headerExtra}
      />
      {sliderContents && (
        <ImageSlider contents={sliderContents} className="h-2/4" />
      )}
    </div>
  );
}
