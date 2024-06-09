import { NavMenu, NavMenuProps } from "../nav-menu";

export type NavListProps = {
  mainMenu: NavMenuProps;
  extraMenus?: NavMenuProps[];
};

export function NavList({ mainMenu, extraMenus }: NavListProps) {
  return (
    <div className="flex-col sm:flex-row flex [&>*]:flex-1 gap-10 sm:gap-5">
      <NavMenu {...mainMenu} />
      {extraMenus && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-5 overflow-scroll">
          {extraMenus.map((extraMenu, index) => {
            return <NavMenu compact key={index} {...extraMenu} />;
          })}
        </div>
      )}
    </div>
  );
}
