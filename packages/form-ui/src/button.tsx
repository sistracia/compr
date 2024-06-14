import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@repo/utils";

const buttonVariants = cva(
  "form-ui-inline-flex form-ui-items-center form-ui-justify-center form-ui-whitespace-nowrap form-ui-rounded-md form-ui-text-sm form-ui-font-medium form-ui-transition-colors focus-visible:form-ui-outline-none focus-visible:form-ui-ring-1 focus-visible:form-ui-ring-ring disabled:form-ui-pointer-events-none disabled:form-ui-opacity-50",
  {
    variants: {
      variant: {
        default:
          "form-ui-bg-primary form-ui-text-primary-foreground form-ui-shadow hover:form-ui-bg-primary/90",
        destructive:
          "form-ui-bg-destructive form-ui-text-destructive-foreground form-ui-shadow-sm hover:form-ui-bg-destructive/90",
        outline:
          "form-ui-border form-ui-border-input form-ui-bg-background form-ui-shadow-sm hover:form-ui-bg-accent hover:form-ui-text-accent-foreground",
        secondary:
          "form-ui-bg-secondary form-ui-text-secondary-foreground form-ui-shadow-sm hover:form-ui-bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "hover:form-ui-bg-accent hover:form-ui-text-accent-foreground",
      },
      size: {
        default: "form-ui-h-9 form-ui-px-4 form-ui-py-2",
        sm: "form-ui-h-8 form-ui-rounded-md form-ui-px-3 form-ui-text-xs",
        lg: "form-ui-h-10 form-ui-rounded-md form-ui-px-8",
        icon: "form-ui-h-9 form-ui-w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
