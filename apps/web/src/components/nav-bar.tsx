"use client";

import { ArrowUpIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { PageScroll, TopNavbar } from "@repo/smooth-page-scroll";
import { useState } from "react";
import { SectionWrapper } from "./section-wrapper";

export type NavBarProps = {
  title?: React.ReactNode;
  navbarContent?: React.ReactNode;
  children?: React.ReactNode;
};

export function NavBar(props: NavBarProps) {
  const { title, children, navbarContent } = props;
  const [open, setOpen] = useState(false);

  const onToggle = () => {
    setOpen(!open);
  };

  return (
    <PageScroll
      navbar={TopNavbar}
      transform="500ms linear"
      navbarOpen={open}
      navbarOnLinkClick={onToggle}
      navbarClassName="fixed z-[1] flex h-full w-full items-center justify-between overflow-scroll bg-neutral-800 text-white transition-transform duration-500 sm:h-[60vh]"
      navbarContent={
        <SectionWrapper className="h-full pt-[90px]">
          {navbarContent}
        </SectionWrapper>
      }
      navbarBar={
        <SectionWrapper
          inset={true}
          className="fixed top-[2vw] z-[2] flex items-center justify-between text-white mix-blend-exclusion"
        >
          <a className="text-3xl sm:text-3xl xl:text-5xl">{title}</a>
          <button aria-label="navbar button" onClick={onToggle}>
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
      }
    >
      {children}
    </PageScroll>
  );
}
