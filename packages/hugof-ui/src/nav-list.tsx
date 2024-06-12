import { NavMenu, NavMenuProps } from "./nav-menu";

export type NavListProps = {
  mainMenu: NavMenuProps;
  extraMenus?: NavMenuProps[];
};

export function NavList({ mainMenu, extraMenus }: NavListProps) {
  return (
    <div className="flex flex-col space-y-12 *:flex-1 sm:flex-row sm:space-y-0">
      <NavMenu {...mainMenu} />
      {extraMenus && (
        <div className="grid grid-cols-1 space-y-12 overflow-scroll sm:grid-cols-2 sm:space-y-0">
          {extraMenus.map((extraMenu, index) => {
            return <NavMenu compact key={index} {...extraMenu} />;
          })}
        </div>
      )}
    </div>
  );
}
