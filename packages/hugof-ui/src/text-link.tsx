import { cn } from "@repo/utils";

export type TextLinkProps = {
  className?: string;
  children?: React.ReactNode;
  compact?: boolean;
};

export function TextLink({ className, children, compact }: TextLinkProps) {
  return (
    <span
      className={cn(
        "duration:ease-out  relative before:absolute before:bottom-[-2px] before:left-0 before:h-[2px] before:w-full before:origin-right before:scale-0 before:bg-white before:transition-transform before:duration-300 before:content-[''] hover:before:origin-left hover:before:scale-100",
        compact ? "text-sm" : "text-2xl",
        className,
      )}
    >
      {children}
    </span>
  );
}
