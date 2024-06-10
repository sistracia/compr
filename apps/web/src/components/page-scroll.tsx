"use client";

import { useEffect, useRef } from "react";
import { NavBar } from "./nav-bar";

export type PageScrollProps = {
  disableEffect?: boolean;
  navbarTitle?: React.ReactNode;
  children?: React.ReactNode;
  navbarContent?: React.ReactNode;
};

export function PageScroll({
  children,
  navbarTitle,
  navbarContent,
}: PageScrollProps) {
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const navbarContainerRef = useRef<HTMLDivElement>(null);

  // Handling smooth scrolling
  useEffect(() => {
    const contentContainer = contentContainerRef.current;
    if (!contentContainer) {
      return;
    }

    const setContainerTranslateY = (value: number) => {
      contentContainer.style.transform = `translateY(${value}px)`;
    };

    const setTransitionStyle = () => {
      if (!contentContainer.getAttribute("class")) {
        contentContainer.setAttribute("class", "duration-500 ease-linear");
      }
    };

    const unsetTransitionStyle = () => {
      if (contentContainer.getAttribute("class")) {
        contentContainer.removeAttribute("class");
      }
    };

    const getHashValue = (hash: string) => {
      return hash.substring(1);
    };

    const getHashDestination = (hash: string) => {
      return document.getElementById(getHashValue(hash));
    };

    const getHashDestinationY = (hash?: string) => {
      return hash ? getHashDestination(hash)?.offsetTop || 0 : 0;
    };

    // For handle new page load with hash
    const historyState = window.history.state;
    const hash = window.location.hash;

    const containerHeight = contentContainer.clientHeight;
    document.body.setAttribute("style", `height: ${containerHeight}px`);

    let loadPageWithHash =
      hash && historyState && historyState.scrollY === undefined;

    let initialY = loadPageWithHash
      ? getHashDestinationY(hash)
      : historyState.scrollY;

    if (!loadPageWithHash) {
      setTransitionStyle();
    } else {
      setTimeout(() => {
        setTransitionStyle();
      }, 1);
    }

    window.scrollTo({ left: 0, top: initialY, behavior: "instant" });

    let scrollFromHashChange = false;
    let scrollFromAnchor = false;

    // Handle scroll restoration manually
    // https://developer.mozilla.org/en-US/docs/Web/API/History/scrollRestoration#prevent_automatic_page_location_restoration
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }

    window.addEventListener("beforeunload", () => {
      // save the position
      const positionState = {
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      };
      window.history.replaceState(
        Object.assign({}, window.history.state, positionState),
        "",
      );
    });

    let latestHashValue = getHashValue(hash);

    // Handle scroll effect on click to hash href
    const anchorClickListeners: [Element, (event: Event) => void][] = [];
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      const anchorClickListener = (event: Event) => {
        const hash = anchor.getAttribute("href") || "";
        latestHashValue = getHashValue(hash);

        const hashDestination = getHashDestination(latestHashValue);
        if (!hashDestination) {
          return;
        }

        // By disable the default behaviour, it won't update the page URL hash
        event.preventDefault();

        scrollFromAnchor = true;

        const scrollY = getHashDestinationY(hash);
        setContainerTranslateY(scrollY * -1);
        window.scrollTo({
          left: 0,
          top: scrollY,
        });
      };

      anchorClickListeners.push([anchor, anchorClickListener]);
    });

    // Set hash from previous anchor click to the page URL
    // after the scroll transition done
    let timer: ReturnType<typeof setTimeout> | null = null;
    const anchoScrollListener = () => {
      if (!scrollFromAnchor) {
        return;
      }

      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(function () {
        const newHref = `#${latestHashValue}`;
        if (window.location.hash !== newHref) {
          window.location.hash = newHref;
        }
      }, 1);
    };

    // Handle scroll effect on hash in URL change
    const windowHasChangeListener = () => {
      if (scrollFromAnchor) {
        scrollFromAnchor = false;
        return;
      }

      unsetTransitionStyle();
      setContainerTranslateY(0);

      loadPageWithHash = true;
      scrollFromHashChange = true;

      initialY = getHashDestinationY(window.location.hash);
      window.scrollTo({ left: 0, top: initialY, behavior: "instant" });

      setTimeout(() => {
        setTransitionStyle();
        scrollFromHashChange = false;
      }, 1);
    };

    // Handle scroll effect on scroll
    // See: https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event#scroll_event_throttling
    let ticking = false;
    const documentScrollListener = () => {
      if (scrollFromHashChange) {
        return;
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const documentScrollTop = document.documentElement.scrollTop;
          const yCoordinate = loadPageWithHash
            ? documentScrollTop - initialY
            : documentScrollTop;
          setContainerTranslateY(yCoordinate * -1);
          ticking = false;
        });
        ticking = true;
      }
    };

    anchorClickListeners.forEach(([anchor, listener]) => {
      anchor.addEventListener("click", listener);
    });
    document.addEventListener("scroll", anchoScrollListener);
    window.addEventListener("hashchange", windowHasChangeListener, false);
    document.addEventListener("scroll", documentScrollListener);

    return () => {
      anchorClickListeners.forEach(([anchor, listener]) => {
        anchor.removeEventListener("click", listener);
      });
      document.removeEventListener("scroll", anchoScrollListener);
      window.removeEventListener("hashchange", windowHasChangeListener, false);
      document.removeEventListener("scroll", documentScrollListener);
    };
  }, []);

  // Handling navbar animation
  useEffect(() => {
    const pageContainer = pageContainerRef?.current;
    const navbarContainer = navbarContainerRef.current;
    if (!pageContainer || !navbarContainer) {
      return;
    }

    const setPageContainerY = (y: number) => {
      pageContainer.setAttribute("style", `transform: translateY(${y}px)`);
    };

    const getNavbarState = () => {
      const isOpen = document.body.style.getPropertyValue("overflow") !== "";
      return isOpen;
    };

    const toggleNavbarVisibility = () => {
      if (!getNavbarState()) {
        document.body.style.overflow = "hidden";
        setPageContainerY(navbarContainer.clientHeight);
      } else {
        document.body.style.removeProperty("overflow");
        setPageContainerY(0);
      }
    };

    const transitionRunListener = (event: Event) => {
      if (
        event.target instanceof Element &&
        event.currentTarget instanceof Element &&
        event.target.tagName !== event.currentTarget.tagName
      ) {
        return;
      }
      toggleNavbarVisibility();
    };

    navbarContainer.addEventListener("transitionrun", transitionRunListener);

    return () => {
      navbarContainer.removeEventListener(
        "transitionrun",
        transitionRunListener,
      );
    };
  }, []);

  return (
    <>
      <NavBar ref={navbarContainerRef} title={navbarTitle}>
        {navbarContent}
      </NavBar>
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
