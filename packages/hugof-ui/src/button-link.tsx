import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@repo/utils";

export type ButtonLinkProps<T extends React.ElementType = "a"> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    children?: React.ReactNode;
  };

export function ButtonLink<T extends React.ElementType = "a">(
  props: ButtonLinkProps<T>,
) {
  const { as: Comp = "a", children, ...restProps } = props;
  return (
    <Comp
      {...restProps}
      className={cn(
        "flex items-center text-[1.25vw] font-medium leading-[2.5vw] text-black",
        "[&>svg]:hover:bg-black [&>svg]:hover:stroke-white",
        restProps?.className,
      )}
    >
      {children}
      <ArrowRightIcon
        className="ml-[10px] flex h-[2.5vw] w-[2.5vw] items-center justify-center rounded-full border-2 border-solid border-black bg-white stroke-black p-2 transition duration-300"
        width="20"
        height="20"
      />
    </Comp>
  );
}
