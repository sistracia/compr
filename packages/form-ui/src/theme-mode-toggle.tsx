import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { Button } from "@repo/form-ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/form-ui/ui/dropdown-menu";

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
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
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
