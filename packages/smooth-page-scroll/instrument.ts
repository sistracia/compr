import {
  initLoad,
  isBodyHasOverflowStyle,
  listenBeforeunload,
  listenScroll,
  setContainerTranslateY,
} from "./utils";

// Handling smooth scrolling
export function instrumentSmoothScroll(
  contentContainer: HTMLElement,
  transform: string,
) {
  const unsubscribeBeforeunloadListener = listenBeforeunload();
  const { hash, initialY, loadPageWithHash } = initLoad(
    contentContainer,
    transform,
  );
  const unsubscribeScrollListener = listenScroll(
    hash,
    loadPageWithHash,
    initialY,
    contentContainer,
    transform,
  );

  return () => {
    unsubscribeBeforeunloadListener();
    unsubscribeScrollListener();
  };
}

// Handling navbar animation
export function instrumentNavbarTransitionY(
  pageContainer: HTMLElement,
  navbarContainer: HTMLElement,
) {
  const toggleNavbarVisibility = () => {
    if (!isBodyHasOverflowStyle()) {
      document.body.style.overflow = "hidden";
      setContainerTranslateY(pageContainer, navbarContainer.clientHeight);
    } else {
      document.body.style.removeProperty("overflow");
      setContainerTranslateY(pageContainer, 0);
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
    navbarContainer.removeEventListener("transitionrun", transitionRunListener);
  };
}

export function listenInternalLink(onLinkClick?: (event: Event) => void) {
  const anchorClickListeners: [Element, (event: Event) => void][] = [];
  document
    .querySelectorAll('a:not([href^="http"], [href^="https"])')
    .forEach((anchor) => {
      const anchorClickListener = (event: Event) => {
        onLinkClick?.(event);
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
}
