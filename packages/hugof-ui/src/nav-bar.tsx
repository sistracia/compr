"use client";

import { ArrowUpIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { listenInternalLink } from "@repo/smooth-scroll/core";
import { Lenis } from "@repo/smooth-scroll/lenis";
import { PageScroll } from "@repo/smooth-scroll/react/page-scroll";
import { cn } from "@repo/utils";
import { useEffect, useRef, useState } from "react";
import { SectionWrapper } from "./section-wrapper";

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
  const lenis = useRef<Lenis>(null);
  const navContainerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const onToggle = () => {
    if (open) {
      lenis.current?.start();
      setOpen(false);
    } else {
      lenis.current?.stop();
      setOpen(true);
    }
  };

  useEffect(() => {
    const navContainer = navContainerRef.current;
    if (navContainer === null) {
      return;
    }

    return listenInternalLink(navContainer, () => {
      setOpen(false);
    });
  }, []);

  return (
    <>
      <nav ref={navContainerRef}>
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
        <div
          className={cn(
            "fixed z-[1] h-full w-full transition-transform duration-500",
            open ? "translate-y-0" : "-translate-y-full",
          )}
        >
          <div className="flex h-full w-full items-center justify-between overflow-scroll bg-neutral-800 text-white sm:h-[60vh]">
            <SectionWrapper className="h-full pt-[90px]">
              {navbarContent}
            </SectionWrapper>
          </div>
        </div>
      </nav>
      <PageScroll ref={lenis}>{children}</PageScroll>
    </>
  );
}
