import { cn } from "@repo/utils";

export type NavMenuProps = {
  title: string;
  submenu: React.ReactNode;
  compact?: boolean;
};

export function NavMenu({ title, submenu, compact }: NavMenuProps) {
  return (
    <div className={cn("flex flex-col", compact ? "gap-2" : "gap-5")}>
      <p className="text-xs">{title}</p>
      {submenu}
    </div>
  );
}
