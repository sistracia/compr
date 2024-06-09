import { clsx } from "clsx";
import { forwardRef } from "react";

export type SectionWrapperProps = {
  inset?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export const SectionWrapper = forwardRef<HTMLDivElement, SectionWrapperProps>(
  function (props, ref) {
    const { children, inset, className } = props;

    return (
      <div
        ref={ref}
        className={clsx(
          "w-[90vw] sm:w-[80vw]",
          inset ? "inset-x-[5vw] sm:inset-x-[10vw]" : "mx-[5vw] sm:mx-[10vw]",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

SectionWrapper.displayName = "SectionWrapper";
