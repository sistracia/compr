import { clsx } from "clsx";

export type NavMenuProps = {
  title: string;
  submenu: React.ReactNode;
  compact?: boolean;
};

export function NavMenu({ title, submenu, compact }: NavMenuProps) {
  return (
    <div className={clsx("flex flex-col", compact ? "gap-2" : "gap-5")}>
      <p className="text-xs">{title}</p>
      {submenu}
    </div>
  );
}
