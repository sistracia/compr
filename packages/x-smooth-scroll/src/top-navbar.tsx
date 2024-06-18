import { forwardRef, useEffect, useRef } from "react";
import { listenInternalLink } from "./instrument";

export type NavbarProps = {
  navbarBar?: React.ReactNode;
  navbarContent?: React.ReactNode;
  navbarOpen?: boolean;
  navbarStyle?: React.CSSProperties;
  navbarClassName?: string;
  navbarOnLinkClick?: (event: Event) => void;
};

export const TopNavbar = forwardRef<HTMLElement, NavbarProps>(
  function (props, ref) {
    const {
      navbarOpen,
      navbarBar,
      navbarContent,
      navbarOnLinkClick,
      navbarClassName,
      navbarStyle,
    } = props;
    const navContainerRef = useRef<HTMLDivElement | null>(null);

    // Close back the nav when navigating
    useEffect(() => {
      const navContainer = navContainerRef.current;
      if (navContainer === null) {
        return;
      }

      return listenInternalLink(navContainer, navbarOnLinkClick);
    }, [navbarOnLinkClick]);

    return (
      <div ref={navContainerRef}>
        {navbarBar}
        <nav
          ref={ref}
          className={navbarClassName}
          style={{
            ...navbarStyle,
            transform: `translateY(-${navbarOpen ? 0 : 100}%)`,
          }}
        >
          {navbarContent}
        </nav>
      </div>
    );
  },
);

TopNavbar.displayName = "TopNavBar";
