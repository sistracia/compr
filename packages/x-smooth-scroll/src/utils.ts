export function setContainerTranslateY(
  contentContainer: HTMLElement,
  value: number,
) {
  contentContainer.style.transform = `translateY(${value}px)`;
}

export function isBodyHasOverflowStyle() {
  return document.body.style.getPropertyValue("overflow") !== "";
}

export function setBodyHeight(height: number) {
  document.body.setAttribute("style", `height: ${height}px`);
}

export function getBodyHeight() {
  return document.body.clientHeight;
}

export function isPageLoaded() {
  return document.body.hasAttribute("style");
}

function setTransitionStyle(contentContainer: HTMLElement, transition: string) {
  if (!contentContainer.style.transition) {
    contentContainer.style.transition = transition;
  }
}

function unsetTransitionStyle(contentContainer: HTMLElement) {
  if (contentContainer.style.transition) {
    contentContainer.style.removeProperty("transition");
  }
}

function getHashValue(hash: string) {
  return hash.substring(1);
}

function getHashDestination(hash: string) {
  return document.getElementById(getHashValue(hash));
}

function getHashDestinationY(hash?: string) {
  return hash ? getHashDestination(hash)?.offsetTop || 0 : 0;
}

export function listenBeforeunload() {
  // Handle scroll restoration manually
  // https://developer.mozilla.org/en-US/docs/Web/API/History/scrollRestoration#prevent_automatic_page_location_restoration
  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }

  const listener = () => {
    // save the position
    const positionState = {
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    };
    window.history.replaceState(
      Object.assign({}, window.history.state, positionState),
      "",
    );
  };
  window.addEventListener("beforeunload", listener);

  return () => {
    window.removeEventListener("beforeunload", listener);
  };
}

export function initLoad(contentContainer: HTMLElement, transform: string) {
  // For handle new page load with hash
  const historyState = window.history.state;
  const hash = window.location.hash;

  const containerHeight = contentContainer.clientHeight;
  setBodyHeight(containerHeight);

  const loadPageWithHash =
    hash && historyState && historyState.scrollY === undefined;

  const initialY = loadPageWithHash
    ? getHashDestinationY(hash)
    : historyState.scrollY;

  if (!loadPageWithHash) {
    setTransitionStyle(contentContainer, transform);
  } else {
    setTimeout(() => {
      setTransitionStyle(contentContainer, transform);
    }, 1);
  }

  window.scrollTo({ left: 0, top: initialY, behavior: "instant" });

  return { hash, loadPageWithHash, initialY };
}

export function scollTicker(callback: () => void) {
  // Handle scroll effect on scroll
  // See: https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event#scroll_event_throttling
  let ticking = false;
  return () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
}

export function listenScroll(
  hash: string,
  loadPageWithHash: boolean,
  initialY: number,
  contentContainer: HTMLElement,
  transform: string,
) {
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
      setContainerTranslateY(contentContainer, scrollY * -1);
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

    unsetTransitionStyle(contentContainer);
    setContainerTranslateY(contentContainer, 0);

    loadPageWithHash = true;
    scrollFromHashChange = true;

    initialY = getHashDestinationY(window.location.hash);
    window.scrollTo({ left: 0, top: initialY, behavior: "instant" });

    setTimeout(() => {
      setTransitionStyle(contentContainer, transform);
      scrollFromHashChange = false;
    }, 1);
  };

  const documentScrollListener = scollTicker(() => {
    if (scrollFromHashChange) {
      return;
    }

    const documentScrollTop = document.documentElement.scrollTop;
    const yCoordinate = loadPageWithHash
      ? documentScrollTop - initialY
      : documentScrollTop;
    setContainerTranslateY(contentContainer, yCoordinate * -1);
  });

  anchorClickListeners.forEach(([anchor, listener]) => {
    anchor.addEventListener("click", listener);
  });
  document.addEventListener("scroll", anchoScrollListener);
  document.addEventListener("scroll", documentScrollListener);
  window.addEventListener("hashchange", windowHasChangeListener, false);

  return () => {
    anchorClickListeners.forEach(([anchor, listener]) => {
      anchor.removeEventListener("click", listener);
    });
    document.removeEventListener("scroll", anchoScrollListener);
    document.removeEventListener("scroll", documentScrollListener);
    window.removeEventListener("hashchange", windowHasChangeListener, false);
  };
}
