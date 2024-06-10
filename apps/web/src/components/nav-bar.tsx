"use client";

import { ArrowUpIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { forwardRef, useEffect, useState } from "react";
import { SectionWrapper } from "./section-wrapper";

export type NavBarProps = {
  title?: React.ReactNode;
  children?: React.ReactNode;
};

export const NavBar = forwardRef<HTMLDivElement, NavBarProps>(
  function (props, ref) {
    const { title, children } = props;
    const [open, setOpen] = useState(false);

    const onToggle = () => {
      setOpen(!open);
    };

    // Close back the nav when navigating
    useEffect(() => {
      const anchorClickListeners: [Element, (event: Event) => void][] = [];
      document
        .querySelectorAll('a:not([href^="http"], [href^="https"])')
        .forEach((anchor) => {
          const anchorClickListener = () => {
            setOpen(false);
          };

          anchorClickListeners.push([anchor, anchorClickListener]);
        });

      anchorClickListeners.forEach(([anchor, listener]) => {
        anchor.addEventListener("click", listener);
      });

      return () => {
        anchorClickListeners.forEach(([anchor, listener]) => {
          anchor.removeEventListener("click", listener);
        });
      };
    }, []);

    return (
      <>
        <SectionWrapper
          inset={true}
          className="fixed top-[2vw] z-[2] flex items-center justify-between text-white mix-blend-exclusion"
        >
          <a className="text-3xl sm:text-3xl xl:text-5xl">{title}</a>
          <button onClick={onToggle}>
            {open ? (
              <span className="grid items-center justify-center mix-blend-exclusion *:col-start-1 *:col-end-1 *:row-start-1 *:row-end-1">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 200 200"
                  className="scale-110"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    strokeWidth="10"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    strokeWidth="10"
                    strokeDasharray="565.48"
                    strokeDashoffset="0"
                    className="animate-[circle-fill] stroke-white duration-500 ease-linear"
                  />
                </svg>
                <ArrowUpIcon
                  stroke="white"
                  className="w-full mix-blend-exclusion duration-500 animate-in zoom-in-50"
                />
              </span>
            ) : (
              <HamburgerMenuIcon
                width="23"
                height="23"
                className="mix-blend-exclusion duration-500 animate-in zoom-in-50"
              />
            )}
          </button>
        </SectionWrapper>
        <nav
          ref={ref}
          className="fixed z-[1] flex h-full w-full items-center justify-between overflow-scroll bg-neutral-800 text-white transition-transform duration-500 sm:h-[60vh]"
          style={{
            transform: `translateY(-${open ? 0 : 100}%)`,
          }}
        >
          <SectionWrapper className="h-full pt-[90px]">
            {children}
          </SectionWrapper>
        </nav>
      </>
    );
  },
);

NavBar.displayName = "NavBar";
