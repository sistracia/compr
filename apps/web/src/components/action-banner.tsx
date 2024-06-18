"use client";

import { ThemeModeToggle } from "@repo/form-ui/ui/theme-mode-toggle";
import { useTheme } from "next-themes";

export type ActionBannerProps = {
  children?: React.ReactNode;
};
export function ActionBanner({ children }: ActionBannerProps) {
  const { setTheme } = useTheme();

  return (
    <div className="flex w-full items-center gap-2 border-t-2 border-black bg-white p-1">
      <ThemeModeToggle
        onDarkClick={() => {
          setTheme("dark");
        }}
        onLightClick={() => {
          setTheme("light");
        }}
        onSystemClick={() => {
          setTheme("system");
        }}
      />
      {children}
    </div>
  );
}
