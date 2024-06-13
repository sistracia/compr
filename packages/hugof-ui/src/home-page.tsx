import { HomePageHeader } from "./home-page-header";
import { ImageSlider, ImageSliderProps } from "./image-slider";

export type HomePageProps = {
  title?: string;
  sliderContents?: ImageSliderProps["contents"];
};

export function HomePage({ title = "", sliderContents }: HomePageProps) {
  return (
    <div className="h-dvh">
      <HomePageHeader title={title} curtainCount={3} className="h-2/4" />
      {sliderContents && (
        <ImageSlider contents={sliderContents} className="h-2/4" />
      )}
    </div>
  );
}
