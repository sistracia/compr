import { PauseIcon } from "@radix-ui/react-icons";

export type NavBarProps = {
  title?: React.ReactNode;
};

export function NavBar({ title }: NavBarProps) {
  return (
    <nav className="fixed top-[2vw] inset-x-[5vw] sm:inset-x-[10vw] w-[90vw] sm:w-[80vw] flex justify-between items-center z-[1]">
      <a className="text-3xl sm:text-5xl">{title}</a>
      <button>
        <PauseIcon width="38px" height="38px" className="rotate-90" />
      </button>
    </nav>
  );
}
