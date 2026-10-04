"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { POINTER_QUERY } from "@/lib/gsap";
import { requestAnchor, scrollToId, setLenis, settleScroll } from "@/lib/scroll";

// Smooth scrolling on desktop pointers only; touch and reduced motion keep the
// native scroller. Also routes in-page anchor clicks through the same scroller
// so they land 68px below the fixed header.
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const query = window.matchMedia(POINTER_QUERY);
    let destroy = () => {};
    let cancelled = false;

    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled || !query.matches) return;
      const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true, syncTouch: false });
      setLenis(lenis);
      destroy = () => {
        setLenis(null);
        lenis.destroy();
      };
    };

    const apply = () => {
      destroy();
      destroy = () => {};
      if (query.matches) void start();
    };

    apply();
    query.addEventListener("change", apply);
    return () => {
      cancelled = true;
      query.removeEventListener("change", apply);
      destroy();
    };
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      const id = decodeURIComponent(url.hash.slice(1));
      if (!id) return;
      if (scrollToId(id)) {
        event.preventDefault();
        window.history.replaceState(window.history.state, "", url.hash);
      }
    };
    // Capture phase: next/link handles its own click during bubbling and would
    // jump to the hash natively, without the smooth scroll or the pinned anchors.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Arriving with a hash (e.g. /#contact from another page): jump once the page
  // has laid out, and again if the pinned intro registers its anchors later.
  useEffect(() => {
    settleScroll();
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const frame = requestAnimationFrame(() => requestAnchor(id));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
