"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@repo/utils";
import { useState } from "react";
import { HorizontalScroll } from "@repo-x/smooth-scroll/horizontal-scroll";

export type ImageSliderProps = {
  contents: React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
  displayNumber?: number;
};

export function ImageSlider({
  contents,
  className,
  style,
  displayNumber = 3,
}: ImageSliderProps) {
  const [windowNumber, setWindowNumber] = useState(0);

  const disablePrev = windowNumber === 0;
  const disabledNext = windowNumber === contents.length - displayNumber;

  const prev = () => {
    if (disablePrev) {
      return;
    }
    setWindowNumber(windowNumber - 1);
  };

  const next = () => {
    if (disabledNext) {
      return;
    }
    setWindowNumber(windowNumber + 1);
  };

  return (
    <div style={style} className={cn("relative flex h-full w-full", className)}>
      <HorizontalScroll
        windowNumber={windowNumber}
        displayNumber={displayNumber}
        contents={contents}
        contentClassName={cn(
          "overflow-hidden transition-all duration-200 ease-linear",
          "before:pointer-events-none before:absolute before:left-0 before:top-0 before:h-full before:w-full before:animate-[slide-right-out] before:bg-neutral-800 before:delay-1000 before:duration-1000 before:content-[''] before:fill-mode-forwards",
        )}
      />

      <div className="absolute bottom-0 flex w-full justify-between px-5 py-2">
        <button
          className={cn(
            "flex items-center justify-center rounded-full bg-black/50 p-2",
            disablePrev ? "stroke-gray-400" : "stroke-white",
          )}
          onClick={prev}
          disabled={disablePrev}
        >
          <ArrowLeftIcon width={18} height={18} />
        </button>
        <button
          className={cn(
            "flex items-center justify-center rounded-full bg-black/50 p-2",
            disabledNext ? "stroke-gray-400" : "stroke-white",
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
