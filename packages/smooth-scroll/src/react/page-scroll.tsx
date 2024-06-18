import gsap from "gsap";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  listenHashChange,
  listenInternalLink,
  onAnchorLinkClick,
} from "../core";
import {
  Lenis,
  LenisRef,
  ReactLenis,
  ReactLenisProps,
  useLenis,
} from "../lenis";

export type PageScrollProps = Omit<ReactLenisProps, "root" | "autoRaf">;

// Yoinked from https://github.com/darkroomengineering/lenis/blob/main/website/layouts/default/index.js
export const PageScroll = forwardRef<Lenis | undefined, PageScrollProps>(
  function (props, ref) {
    const lenisRef = useRef<LenisRef>(null);
    const lenis = useLenis();
    const [hash, setHash] = useState<string>();

    useImperativeHandle(ref, () => {
      return lenis;
    }, [lenis]);

    useEffect(() => {
      if (lenis && hash) {
        // scroll to on hash change
        const target = document.querySelector(hash);
        if (target === null || !(target instanceof HTMLElement)) {
          return;
        }
        lenis.scrollTo(target, { offset: 0 });
      }
    }, [lenis, hash]);

    useEffect(() => {
      // update scroll position on page refresh based on hash
      return listenHashChange(setHash);
    }, []);

    useEffect(() => {
      // catch anchor links clicks
      function onClick(e: Event) {
        onAnchorLinkClick(e, setHash);
      }

      return listenInternalLink(document, onClick);
    }, []);

    useEffect(() => {
      function update(time: number) {
        lenisRef.current?.lenis?.raf(time * 1000);
      }

      gsap.ticker.add(update);

      return () => {
        gsap.ticker.remove(update);
      };
    });

    return <ReactLenis root ref={lenisRef} autoRaf={false} {...props} />;
  },
);

PageScroll.displayName = "PageScroll";
