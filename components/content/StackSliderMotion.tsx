"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadMotion, SLIDER_QUERY } from "@/lib/gsap";

const SPEED = 30; // px per second, per row
const GAP = 12;

type StackSliderMotionProps = {
  label: string;
  className?: string;
  /** The rows, rendered on the server. Each track carries `data-track`. */
  children: ReactNode;
};

// Moves the rows of <StackSlider>. From the tablet breakpoint up GSAP drives
// them: opposite directions, a smooth reversal when the section passes the
// middle of the viewport, and a pause on hover. Mobile uses the CSS drift in
// globals.css. Nothing moves while the section is off screen.
export function StackSliderMotion({ label, className, children }: StackSliderMotionProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let onScreen = false;
    let dispose = () => {};
    let cancelled = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry?.isIntersecting ?? false;
        element.toggleAttribute("data-active", onScreen);
      },
      { rootMargin: "120px 0px" },
    );
    observer.observe(element);

    if (window.matchMedia(SLIDER_QUERY).matches) {
      void loadMotion().then(({ gsap, ScrollTrigger }) => {
        if (cancelled) return;
        const context = gsap.context(() => {
          const tracks = gsap.utils.toArray<HTMLElement>("[data-track]", element).filter(
            (track) => track.offsetParent !== null,
          );
          // flip: +1 before the middle of the viewport, -1 after. play: 1 running, 0 paused.
          const state = { flip: 1, play: 1 };
          const rows = tracks.map((track, index) => {
            const half = (track.scrollWidth - GAP) / 2 + GAP;
            const wrap = gsap.utils.wrap(-half, 0);
            const set = gsap.quickSetter(track, "x", "px") as (value: number) => void;
            const start = new DOMMatrixReadOnly(getComputedStyle(track).transform).m41;
            gsap.set(track, { x: start });
            return { set, wrap, x: start, direction: index === 0 ? 1 : -1 };
          });

          const tick = (_time: number, delta: number) => {
            if (!onScreen) return;
            const step = (SPEED * state.flip * state.play * delta) / 1000;
            for (const row of rows) {
              row.x = row.wrap(row.x + step * row.direction);
              row.set(row.x);
            }
          };
          gsap.ticker.add(tick);

          const flipTo = (value: number) =>
            gsap.to(state, { flip: value, duration: 0.8, ease: "power2.inOut", overwrite: "auto" });
          ScrollTrigger.create({
            trigger: element,
            start: "center center",
            onEnter: () => flipTo(-1),
            onLeaveBack: () => flipTo(1),
          });

          const pause = () => gsap.to(state, { play: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
          const resume = () => gsap.to(state, { play: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
          element.addEventListener("pointerenter", pause);
          element.addEventListener("pointerleave", resume);

          return () => {
            gsap.ticker.remove(tick);
            element.removeEventListener("pointerenter", pause);
            element.removeEventListener("pointerleave", resume);
          };
        }, element);
        dispose = () => context.revert();
      });
    }

    return () => {
      cancelled = true;
      observer.disconnect();
      dispose();
    };
  }, []);

  return (
    <div ref={root} role="group" aria-label={label} data-slider className={className}>
      {children}
    </div>
  );
}
