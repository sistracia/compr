"use client";

import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@repo/utils";

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "form-ui-flex form-ui-h-full form-ui-w-full data-[panel-group-direction=vertical]:form-ui-flex-col",
      className,
    )}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "form-ui-relative form-ui-flex form-ui-w-px form-ui-items-center form-ui-justify-center form-ui-bg-border after:form-ui-absolute after:form-ui-inset-y-0 after:form-ui-left-1/2 after:form-ui-w-1 after:-form-ui-translate-x-1/2 focus-visible:form-ui-outline-none focus-visible:form-ui-ring-1 focus-visible:form-ui-ring-ring focus-visible:form-ui-ring-offset-1 data-[panel-group-direction=vertical]:form-ui-h-px data-[panel-group-direction=vertical]:form-ui-w-full data-[panel-group-direction=vertical]:form-ui-after data-[panel-group-direction=vertical]:form-ui-after data-[panel-group-direction=vertical]:form-ui-after data-[panel-group-direction=vertical]:form-ui-after data-[panel-group-direction=vertical]:form-ui-after [&[data-panel-group-direction=vertical]>div]:form-ui-rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="form-ui-z-10 form-ui-flex form-ui-h-4 form-ui-w-3 form-ui-items-center form-ui-justify-center form-ui-rounded-sm form-ui-border form-ui-bg-border">
        <DragHandleDots2Icon className="form-ui-h-2.5 form-ui-w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
