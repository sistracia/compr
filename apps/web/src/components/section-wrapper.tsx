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
          "w-[90%] sm:w-[80%]",
          inset ? "inset-x-[5%] sm:inset-x-[10%]" : "mx-[5%] sm:mx-[10%]",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

SectionWrapper.displayName = "SectionWrapper";
