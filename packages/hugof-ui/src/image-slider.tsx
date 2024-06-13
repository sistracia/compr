"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@repo/utils";
import { useState } from "react";

export type ImageSliderProps = {
  contents: React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
};

export function ImageSlider({ contents, className, style }: ImageSliderProps) {
  const [slideWindow, setSlideWindow] = useState<[number, number, number]>([
    0, 1, 2,
  ]);

  const disablePrev = slideWindow[0] === 0;
  const disabledNext =
    slideWindow[slideWindow.length - 1] === contents.length - 1;

  const prev = () => {
    if (disablePrev) {
      return;
    }
    setSlideWindow([slideWindow[0] - 1, slideWindow[0], slideWindow[1]]);
  };

  const next = () => {
    if (disabledNext) {
      return;
    }
    setSlideWindow([slideWindow[1], slideWindow[2], slideWindow[2] + 1]);
  };

  return (
    <div style={style} className={cn("relative flex h-full w-full", className)}>
      {contents.map((content, index) => {
        return (
          <div
            key={index}
            className={cn(
              "relative transition-all duration-200 ease-linear",
              "before:absolute before:left-0 before:top-0 before:h-full before:w-full before:animate-[slide-right-out] before:bg-neutral-800 before:delay-1000 before:duration-1000 before:content-[''] before:fill-mode-forwards",
              slideWindow.includes(index) ? "w-full" : "w-[0px]",
            )}
          >
            {content}
          </div>
        );
      })}
      <div className="absolute bottom-0 flex w-full justify-between px-5 py-2">
        <button
          className={cn(
            "flex items-center justify-center rounded-full bg-black/50 p-2",
            disablePrev && "stroke-gray-400",
          )}
          onClick={prev}
          disabled={disablePrev}
        >
          <ArrowLeftIcon width={18} height={18} />
        </button>
        <button
          className={cn(
            "flex items-center justify-center rounded-full bg-black/50 p-2",
            disabledNext && "stroke-gray-400",
          )}
          onClick={next}
          disabled={disabledNext}
        >
          <ArrowRightIcon width={18} height={18} />
        </button>
      </div>
    </div>
  );
}
