import * as React from "react";

import { cn } from "@repo/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "form-ui-flex form-ui-h-9 form-ui-w-full form-ui-rounded-md form-ui-border form-ui-border-input form-ui-bg-transparent form-ui-px-3 form-ui-py-1 form-ui-text-sm form-ui-shadow-sm form-ui-transition-colors file:form-ui-border-0 file:form-ui-bg-transparent file:form-ui-text-sm file:form-ui-font-medium placeholder:form-ui-text-muted-foreground focus-visible:form-ui-outline-none focus-visible:form-ui-ring-1 focus-visible:form-ui-ring-ring disabled:form-ui-cursor-not-allowed disabled:form-ui-opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
