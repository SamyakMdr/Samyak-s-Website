"use client";

import { useEffect, useRef } from "react";
import { stackSlider } from "@/content/site";
import { stackRows, stackRowsMobile, type TechName } from "@/content/tech";
import { cn } from "@/lib/cn";
import { loadMotion, MOTION_QUERY } from "@/lib/gsap";
import { StackChip } from "./StackChip";

const SPEED = 30; // px per second, per row
const GAP = 12;

function Row({ items, offset, className }: { items: TechName[]; offset: number; className?: string }) {
  // The list is rendered twice so the loop never shows a gap.
  return (
    <div className={cn("no-scrollbar flex overflow-x-auto tablet:overflow-visible", className)}>
      <div
        data-track
        className="flex w-max shrink-0 gap-3 pr-3 will-change-transform"
        style={{ transform: `translate3d(${offset}px, 0, 0)` }}
      >
        {[...items, ...items].map((tech, index) => (
          <StackChip key={`${tech}-${index}`} tech={tech} aria-hidden={index >= items.length} />
        ))}
      </div>
    </div>
  );
}

// Two infinite rows drifting in opposite directions. Both reverse (smoothly)
// when the section passes the middle of the viewport, and pause on hover.
// Reduced motion: no movement. Touch: rows can be swiped by hand.
export function StackSlider() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element || !window.matchMedia(MOTION_QUERY).matches) return;
    let dispose = () => {};
    let cancelled = false;

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
          const step = (SPEED * state.flip * state.play * delta) / 1000;
          for (const row of rows) {
            row.x = row.wrap(row.x + step * row.direction);
            row.set(row.x);
          }
        };
        gsap.ticker.add(tick);

        const flipTo = (value: number) => gsap.to(state, { flip: value, duration: 0.8, ease: "power2.inOut", overwrite: "auto" });
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

    return () => {
      cancelled = true;
      dispose();
    };
  }, []);

  return (
    <div
      ref={root}
      role="group"
      aria-label={stackSlider.label}
      data-slider
      className="relative flex flex-col gap-2.5 overflow-hidden border-y border-line bg-panel py-5.25 tablet:gap-3.5 tablet:py-7"
    >
      <Row items={stackRows.forward} offset={-60} className="max-tablet:hidden" />
      <Row items={stackRows.backward} offset={-260} className="max-tablet:hidden" />
      {/* Resting offsets from the Mobile / Home frame. */}
      <Row items={stackRowsMobile.forward} offset={-40} className="tablet:hidden" />
      <Row items={stackRowsMobile.backward} offset={-157} className="tablet:hidden" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-linear-to-r from-panel to-transparent max-tablet:hidden" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-linear-to-l from-panel to-transparent max-tablet:hidden" />
    </div>
  );
}
