"use client";

import { clsx } from "clsx";
import { useEffect, useRef } from "react";

export type PageScrollProps = {
  disableEffect?: boolean;
  children?: React.ReactNode;
};

export function PageScroll({
  children,
  disableEffect = false,
}: PageScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainerRef = containerRef.current;
    if (!currentContainerRef || disableEffect) {
      return;
    }

    const setContainerTranslateY = (value: number) => {
      currentContainerRef.style.transform = `translateY(${value}px)`;
    };

    const setTransitionStyle = () => {
      if (!currentContainerRef.getAttribute("class")) {
        currentContainerRef.setAttribute("class", "duration-500 ease-linear");
      }
    };

    const unsetTransitionStyle = () => {
      if (currentContainerRef.getAttribute("class")) {
        currentContainerRef.removeAttribute("class");
      }
    };

    const getHashValue = (hash: string) => {
      return hash.substring(1);
    };

    const getHashDestinationY = (hash?: string) => {
      return hash
        ? document.getElementById(getHashValue(hash))?.offsetTop || 0
        : 0;
    };

    // For handle new page load with hash
    const historyState = window.history.state;
    const hash = window.location.hash;

    const containerHeight = currentContainerRef.clientHeight;
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
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        // By disable the default behaviour, it won't update the page URL hash
        event.preventDefault();

        const hash = anchor.getAttribute("href") || "";
        latestHashValue = getHashValue(hash);
        scrollFromAnchor = true;

        const scrollY = getHashDestinationY(hash);
        setContainerTranslateY(scrollY * -1);
        window.scrollTo({
          left: 0,
          top: scrollY,
        });
      });
    });

    // Set hash from previous anchor click to the page URL
    // after the scroll transition done
    let timer: ReturnType<typeof setTimeout> | null = null;
    document.addEventListener("scroll", () => {
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
    });

    // Handle scroll effect on hash in URL change
    window.addEventListener(
      "hashchange",
      () => {
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
      },
      false,
    );

    // Handle scroll effect on scroll
    // See: https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event#scroll_event_throttling
    let ticking = false;
    document.addEventListener("scroll", () => {
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
    });
  }, [disableEffect]);

  return (
    <div
      className={clsx(
        "w-[90vw] sm:w-[80vw] h-full ",
        disableEffect
          ? "mx-[5vw] sm:mx-[10vw]"
          : "inset-x-[5vw] sm:inset-x-[10vw]",
        disableEffect ? "" : "fixed overflow-hidden",
      )}
    >
      <div className="relative">
        <div ref={containerRef}>{children}</div>
      </div>
    </div>
  );
}
