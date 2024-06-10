import { clsx } from "clsx";

export type TextLinkProps = {
  className?: string;
  children?: React.ReactNode;
  compact?: boolean;
};

export function TextLink({ className, children, compact }: TextLinkProps) {
  return (
    <span
      className={clsx(
        "relative  before:content-[''] before:absolute before:left-0 before:bottom-[-2px] before:w-full before:h-[2px] before:bg-white hover:before:scale-100 before:scale-0 hover:before:origin-left before:origin-right before:transition-transform before:duration-300 duration:ease-out",
        compact ? "text-sm" : "text-2xl",
        className,
      )}
    >
      {children}
    </span>
  );
}
