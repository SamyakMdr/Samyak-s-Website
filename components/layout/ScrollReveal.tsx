"use client";

import { useEffect } from "react";

const STAGGER = 70; // ms between elements that arrive together
const MAX_STEPS = 5;
const DURATION = 500; // matches the transition in globals.css

// Fades in every [data-reveal] element the first time it scrolls into view.
// Only elements below the fold are hidden, and only once this has run, so the
// page is complete without JavaScript and nothing on screen ever flashes.
// Elements that arrive together are staggered. Off with reduced motion.
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers = new Set<number>();
    const finish = (element: HTMLElement) => {
      element.dataset.reveal = "";
      element.style.removeProperty("--reveal-delay");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        let step = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
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
      { rootMargin: "0px 0px -10% 0px" },
    );

    const pending: HTMLElement[] = [];
    for (const element of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      // Hidden elements (the other breakpoint's layout) measure 0 and are skipped.
      if (element.getBoundingClientRect().top < window.innerHeight) continue;
      element.dataset.reveal = "pending";
      pending.push(element);
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
      for (const timer of timers) window.clearTimeout(timer);
      for (const element of pending) finish(element);
    };
  }, []);

  return null;
}
