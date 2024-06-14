import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { Button } from "@repo/form-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/form-ui/dropdown-menu";

export interface ThemeModeToggleProps {
  onLightClick?: () => void;
  onDarkClick?: () => void;
  onSystemClick?: () => void;
}

export function ThemeModeToggle({
  onDarkClick,
  onLightClick,
  onSystemClick,
}: ThemeModeToggleProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="form-ui-h-[1.2rem] form-ui-w-[1.2rem] form-ui-rotate-0 form-ui-scale-100 form-ui-transition-all dark:-form-ui-rotate-90 dark:form-ui-scale-0" />
          <MoonIcon className="form-ui-absolute form-ui-h-[1.2rem] form-ui-w-[1.2rem] form-ui-rotate-90 form-ui-scale-0 form-ui-transition-all dark:form-ui-rotate-0 dark:form-ui-scale-100" />
          <span className="form-ui-sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onLightClick}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={onDarkClick}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={onSystemClick}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
