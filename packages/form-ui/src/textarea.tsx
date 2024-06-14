import * as React from "react";

import { cn } from "@repo/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "form-ui-flex form-ui-min-h-[60px] form-ui-w-full form-ui-rounded-md form-ui-border form-ui-border-input form-ui-bg-transparent form-ui-px-3 form-ui-py-2 form-ui-text-sm form-ui-shadow-sm placeholder:form-ui-text-muted-foreground focus-visible:form-ui-outline-none focus-visible:form-ui-ring-1 focus-visible:form-ui-ring-ring disabled:form-ui-cursor-not-allowed disabled:form-ui-opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
