import { forwardRef, useEffect, useRef } from "react";
import {
  instrumentNavbarTransitionY,
  instrumentSmoothScroll,
  listenInternalLink,
} from "./instrument";

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
    const navRef = useRef<HTMLElement | null>(null);

    const refCallback = (currentRef: HTMLElement | null) => {
      navRef.current = currentRef;

      if (ref === null) {
        return;
      }

      if (typeof ref === "function") {
        ref(currentRef);
        return;
      }

      ref.current = currentRef;
    };

    // Close back the nav when navigating
    useEffect(() => {
      const navRefContainer = navRef.current;
      if (navRefContainer === null) {
        return;
      }

      return listenInternalLink(navRefContainer, navbarOnLinkClick);
    }, [navbarOnLinkClick]);

    return (
      <>
        {navbarBar}
        <nav
          ref={refCallback}
          className={navbarClassName}
          style={{
            ...navbarStyle,
            transform: `translateY(-${navbarOpen ? 0 : 100}%)`,
          }}
        >
          {navbarContent}
        </nav>
      </>
    );
  },
);

TopNavbar.displayName = "TopNavBar";

export type PageScrollProps = NavbarProps & {
  transform: string;
  children: React.ReactNode;
  navbar: (
    props: NavbarProps & { ref: React.RefObject<HTMLElement> },
  ) => React.ReactNode;
};

export function PageScroll({
  children,
  transform,
  navbar: Navbar,
  ...resProps
}: PageScrollProps) {
  const pageContainerRef = useRef<HTMLDivElement | null>(null);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);
  const navbarContainerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const contentContainer = contentContainerRef.current;
    if (!contentContainer) {
      return;
    }

    return instrumentSmoothScroll(contentContainer, transform);
  }, [transform]);

  useEffect(() => {
    const pageContainer = pageContainerRef?.current;
    const navbarContainer = navbarContainerRef.current;
    if (!pageContainer || !navbarContainer) {
      return;
    }

    return instrumentNavbarTransitionY(pageContainer, navbarContainer);
  }, []);

  return (
    <>
      <Navbar {...resProps} ref={navbarContainerRef}></Navbar>
      <div
        ref={pageContainerRef}
        className="fixed h-full w-full overflow-hidden transition-transform duration-500"
      >
        <div className="relative">
          <div ref={contentContainerRef}>{children}</div>
        </div>
      </div>
    </>
  );
}
