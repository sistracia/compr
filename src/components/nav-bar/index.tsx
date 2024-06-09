"use client";

import { ArrowUpIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { forwardRef, useState } from "react";
import { SectionWrapper } from "../section-wrapper";

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

    return (
      <>
        <SectionWrapper
          inset={true}
          className="flex justify-between items-center fixed top-[2vw] z-[2] text-white mix-blend-exclusion"
        >
          <a className="text-3xl sm:text-3xl xl:text-5xl">{title}</a>
          <button onClick={onToggle}>
            {open ? (
              <span className="grid items-center justify-center [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 mix-blend-exclusion">
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
                    className="stroke-white animate-[circle-fill] duration-500 ease-linear"
                  />
                </svg>
                <ArrowUpIcon
                  stroke="white"
                  className="w-full animate-in zoom-in-50 duration-500 mix-blend-exclusion"
                />
              </span>
            ) : (
              <HamburgerMenuIcon
                width="23"
                height="23"
                className="animate-in zoom-in-50 duration-500 mix-blend-exclusion"
              />
            )}
          </button>
        </SectionWrapper>
        <nav
          ref={ref}
          className="h-full sm:h-[60vh] overflow-scroll text-white bg-neutral-800 flex justify-between items-center transition-transform duration-500 fixed z-[1]"
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
