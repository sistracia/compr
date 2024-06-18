const HASH_SYMBOL = "#";

export function getHashValue(href: string) {
  return href.includes(HASH_SYMBOL) ? href.split(HASH_SYMBOL).pop() : "";
}

export function isEventTargetElement(
  node: EventTarget | null,
): node is Element {
  return node !== null && node instanceof Element;
}

export function getElementHref(element: Element) {
  return element.getAttribute("href") || "";
}

export function onAnchorLinkClick(
  e: Event,
  onHashChange?: (hash: string) => void,
) {
  const node = e.currentTarget;
  if (!isEventTargetElement(node)) {
    return;
  }

  const href = getElementHref(node);
  const hash = getHashValue(href);
  if (!hash || !href.includes(window.location.pathname)) {
    return;
  }

  // Override only for anchor link in the same page
  e.preventDefault();
  onHashChange?.(HASH_SYMBOL + hash);
  setTimeout(() => {
    if (!hash) {
      return;
    }
    window.location.hash = hash;
  }, 0);
}

export function listenHashChange(onHashChange: (hash: string) => void) {
  const onChange = () => {
    onHashChange(window.location.hash);
  };

  window.addEventListener("hashchange", onChange, false);
  return () => {
    window.removeEventListener("hashchange", onChange, false);
  };
}

export function listenInternalLink(
  container: HTMLElement | Document,
  onClick: (event: Event) => void,
) {
  const internalLinks = container.querySelectorAll(
    'a:not([href^="http"], [href^="https"])',
  );

  internalLinks.forEach((node) => {
    node.addEventListener("click", onClick, false);
  });

  return () => {
    internalLinks.forEach((node) => {
      node.removeEventListener("click", onClick, false);
    });
  };
}
