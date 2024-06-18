import { useEffect, useRef } from "react";
import { instrumentHorizontalScroll } from "./instrument";

export type HorizontalScrollProps = {
  contents?: React.ReactNode[];
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  displayNumber?: number;
  windowNumber?: number;
};

export function HorizontalScroll({
  contents,
  containerStyle,
  containerClassName,
  contentClassName,
  contentStyle,
  displayNumber = 1,
  windowNumber = 0,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const windowWidth = 100 / displayNumber;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    return instrumentHorizontalScroll(container);
  }, []);

  return (
    <div
      ref={containerRef}
      className={containerClassName}
      style={{
        position: "relative",
        width: "100%",
        ...containerStyle,
      }}
    >
      {(contents || []).map((content, index) => {
        return (
          <div
            key={index}
            className={contentClassName}
            style={{
              position: "absolute",
              height: "100%",
              left: `${(index - windowNumber) * windowWidth}%`,
              width: `${windowWidth}%`,
              ...contentStyle,
            }}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
