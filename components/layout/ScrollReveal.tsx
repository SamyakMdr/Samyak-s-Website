"use client";

import { useEffect } from "react";

const STAGGER = 70; // ms between elements that arrive together
const MAX_STEPS = 5;
const DURATION = 500; // matches the transition in globals.css
const MARGIN = 0.1; // share of the viewport an element must rise above the bottom edge

// Fades in every [data-reveal] element the first time it scrolls into view.
// Only elements below the fold are hidden, and only once this has run, so the
// page is complete without JavaScript and nothing on screen ever flashes.
// The observer does the measuring too: reading positions here, right after
// hydration, would force a layout of the whole page.
// Elements that arrive together are staggered. Off with reduced motion.
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers = new Set<number>();
    const finish = (element: HTMLElement) => {
      element.dataset.reveal = "";
      element.style.removeProperty("--reveal-delay");
    };

    const pending: HTMLElement[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        let step = 0;
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          if (element.dataset.reveal !== "pending") {
            // First report: where the element starts. Hidden elements (the other
            // breakpoint's layout) have no box and are dropped with the ones on screen.
            const box = entry.boundingClientRect;
            const hidden = box.width === 0 && box.height === 0;
            const fold = entry.rootBounds ? entry.rootBounds.height / (1 - MARGIN) : window.innerHeight;
            if (hidden || entry.isIntersecting || box.top < fold) {
              observer.unobserve(element);
            } else {
              element.dataset.reveal = "pending";
              pending.push(element);
            }
            continue;
          }
          if (!entry.isIntersecting) continue;
          observer.unobserve(element);
          // Reached from below (scrolling back up after a jump): no animation.
          if (entry.boundingClientRect.top < 0) {
            finish(element);
            continue;
          }
          const delay = Math.min(step++, MAX_STEPS) * STAGGER;
          element.style.setProperty("--reveal-delay", `${delay}ms`);
          element.dataset.reveal = "in";
          // Hand the element back afterwards so its own hover transitions apply.
          const timer = window.setTimeout(() => {
            timers.delete(timer);
            finish(element);
          }, delay + DURATION + 50);
          timers.add(timer);
        }
      },
      { rootMargin: `0px 0px -${MARGIN * 100}% 0px` },
    );

    for (const element of document.querySelectorAll<HTMLElement>("[data-reveal]")) observer.observe(element);

    return () => {
      observer.disconnect();
      for (const timer of timers) window.clearTimeout(timer);
      for (const element of pending) finish(element);
    };
  }, []);

  return null;
}
