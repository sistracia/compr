import { useEffect, useRef } from "react";
import {
  instrumentNavbarTransitionY,
  instrumentSmoothScroll,
} from "./instrument";
import { NavbarProps } from "./top-navbar";

export type PageScrollProps = NavbarProps & {
  transform: string;
  children: React.ReactNode;
  className?: string;
  navbar: (
    props: NavbarProps & { ref: React.RefObject<HTMLElement> },
  ) => React.ReactNode;
};

export function PageScroll({
  children,
  transform,
  navbar: Navbar,
  className,
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
        className={className}
        style={{
          position: "fixed",
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative" }}>
          <div ref={contentContainerRef}>{children}</div>
        </div>
      </div>
    </>
  );
}
