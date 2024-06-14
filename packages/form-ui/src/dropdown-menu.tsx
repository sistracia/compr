import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@repo/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "form-ui-flex form-ui-cursor-default form-ui-select-none form-ui-items-center form-ui-rounded-sm form-ui-px-2 form-ui-py-1.5 form-ui-text-sm form-ui-outline-none focus:form-ui-bg-accent data-[state=open]:form-ui-bg-accent",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="form-ui-ml-auto form-ui-h-4 form-ui-w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "form-ui-z-50 form-ui-min-w-[8rem] form-ui-overflow-hidden form-ui-rounded-md form-ui-border form-ui-bg-popover form-ui-p-1 form-ui-text-popover-foreground form-ui-shadow-lg data-[state=open]:form-ui-animate-in data-[state=closed]:form-ui-animate-out data-[state=closed]:form-ui-fade-out-0 data-[state=open]:form-ui-fade-in-0 data-[state=closed]:form-ui-zoom-out-95 data-[state=open]:form-ui-zoom-in-95 data-[side=bottom]:form-ui-slide-in-from-top-2 data-[side=left]:form-ui-slide-in-from-right-2 data-[side=right]:form-ui-slide-in-from-left-2 data-[side=top]:form-ui-slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "form-ui-z-50 form-ui-min-w-[8rem] form-ui-overflow-hidden form-ui-rounded-md form-ui-border form-ui-bg-popover form-ui-p-1 form-ui-text-popover-foreground form-ui-shadow-md",
        "data-[state=open]:form-ui-animate-in data-[state=closed]:form-ui-animate-out data-[state=closed]:form-ui-fade-out-0 data-[state=open]:form-ui-fade-in-0 data-[state=closed]:form-ui-zoom-out-95 data-[state=open]:form-ui-zoom-in-95 data-[side=bottom]:form-ui-slide-in-from-top-2 data-[side=left]:form-ui-slide-in-from-right-2 data-[side=right]:form-ui-slide-in-from-left-2 data-[side=top]:form-ui-slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "form-ui-relative form-ui-flex form-ui-cursor-default form-ui-select-none form-ui-items-center form-ui-rounded-sm form-ui-px-2 form-ui-py-1.5 form-ui-text-sm form-ui-outline-none form-ui-transition-colors focus:form-ui-bg-accent focus:form-ui-text-accent-foreground data-[disabled]:form-ui-pointer-events-none data-[disabled]:form-ui-opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "form-ui-relative form-ui-flex form-ui-cursor-default form-ui-select-none form-ui-items-center form-ui-rounded-sm form-ui-py-1.5 form-ui-pl-8 form-ui-pr-2 form-ui-text-sm form-ui-outline-none form-ui-transition-colors focus:form-ui-bg-accent focus:form-ui-text-accent-foreground data-[disabled]:form-ui-pointer-events-none data-[disabled]:form-ui-opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="form-ui-absolute form-ui-left-2 form-ui-flex form-ui-h-3.5 form-ui-w-3.5 form-ui-items-center form-ui-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className="form-ui-h-4 form-ui-w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "form-ui-relative form-ui-flex form-ui-cursor-default form-ui-select-none form-ui-items-center form-ui-rounded-sm form-ui-py-1.5 form-ui-pl-8 form-ui-pr-2 form-ui-text-sm form-ui-outline-none form-ui-transition-colors focus:form-ui-bg-accent focus:form-ui-text-accent-foreground data-[disabled]:form-ui-pointer-events-none data-[disabled]:form-ui-opacity-50",
      className,
    )}
    {...props}
  >
    <span className="form-ui-absolute form-ui-left-2 form-ui-flex form-ui-h-3.5 form-ui-w-3.5 form-ui-items-center form-ui-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <DotFilledIcon className="form-ui-h-4 form-ui-w-4 form-ui-fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "form-ui-px-2 form-ui-py-1.5 form-ui-text-sm form-ui-font-semibold",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn(
      "-form-ui-mx-1 form-ui-my-1 form-ui-h-px form-ui-bg-muted",
      className,
    )}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "form-ui-ml-auto form-ui-text-xs form-ui-tracking-widest form-ui-opacity-60",
        className,
      )}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
