"use client";

import { ArrowUpIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { PageScroll } from "@repo/smooth-scroll/page-scroll";
import { TopNavbar } from "@repo/smooth-scroll/top-navbar";
import { useState } from "react";
import { SectionWrapper } from "./section-wrapper";
import { cn } from "@repo/utils";

export type NavBarProps<T extends React.ElementType = "a"> = Omit<
  React.ComponentPropsWithoutRef<T>,
  "children"
> & {
  titleAs?: T;
  title?: React.ReactNode;
  navbarContent?: React.ReactNode;
  children?: React.ReactNode;
};

export function NavBar<T extends React.ElementType = "a">(
  props: NavBarProps<T>,
) {
  const {
    children,
    navbarContent,
    titleAs: TitleComp = "a",
    title,
    ...titleProps
  } = props;
  const [open, setOpen] = useState(false);

  const navbarOnLinkClick = () => {
    setOpen(false);
  };

  const onToggle = () => {
    setOpen(!open);
  };

  return (
    <PageScroll
      navbar={TopNavbar}
      navbarOpen={open}
      navbarOnLinkClick={navbarOnLinkClick}
      transform="500ms linear"
      navbarClassName="fixed z-[1] flex w-full items-center justify-between overflow-scroll bg-neutral-800 text-white transition-transform duration-500 sm:h-[60vh]"
      className="transition-transform duration-500"
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
          <TitleComp
            {...titleProps}
            className={cn(
              "text-3xl sm:text-3xl xl:text-5xl",
              titleProps?.className,
            )}
          >
            {title}
          </TitleComp>
          <button aria-label="navbar button" onClick={onToggle}>
            {open ? (
              <span className="grid items-center justify-center *:col-start-1 *:col-end-1 *:row-start-1 *:row-end-1">
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
                  className="w-full duration-500 animate-in zoom-in-50"
                />
              </span>
            ) : (
              <HamburgerMenuIcon
                width="23"
                height="23"
                className="duration-500 animate-in zoom-in-50"
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
