import { NavMenu, NavMenuProps } from "./nav-menu";

export type NavListProps = {
  mainMenu: NavMenuProps;
  extraMenus?: NavMenuProps[];
};

export function NavList({ mainMenu, extraMenus }: NavListProps) {
  return (
    <div className="flex-col sm:flex-row flex *:flex-1 space-y-12 sm:space-y-0">
      <NavMenu {...mainMenu} />
      {extraMenus && (
        <div className="grid grid-cols-1 sm:grid-cols-2 space-y-12 sm:space-y-0 overflow-scroll">
          {extraMenus.map((extraMenu, index) => {
            return <NavMenu compact key={index} {...extraMenu} />;
          })}
        </div>
      )}
    </div>
  );
}
