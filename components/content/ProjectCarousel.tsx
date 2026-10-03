"use client";

import { useCallback, useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { a11y } from "@/content/site";
import { cn } from "@/lib/cn";
import { useLazyCarousel } from "@/lib/useLazyCarousel";

const DOT = 8;
const DOT_GAP = 8;

type ProjectCarouselProps = {
  /** One rendered card per slide. */
  slides: ReactNode[];
  label: string;
  className?: string;
};

// Mobile Home projects: 320px cards, 16px gap, snap, tappable pagination dots.
export function ProjectCarousel({ slides, label, className }: ProjectCarouselProps) {
  const { viewportRef, api, driver } = useLazyCarousel();
  const [selected, setSelected] = useState(0);
  const count = slides.length;

  const onSelect = useCallback(() => {
    if (api) setSelected(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    api.on("select", onSelect).on("reInit", onSelect);
    return () => {
      api.off("select", onSelect).off("reInit", onSelect);
    };
  }, [api, onSelect]);

  // The dots are one control, not six: 8px dots 16px apart cannot each be a
  // 24px touch target. A tap goes to the nearest dot; Enter or Space (no
  // pointer position) moves on to the next project.
  const onDots = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.detail === 0) {
      api?.scrollTo((selected + 1) % count);
      return;
    }
    const box = event.currentTarget.getBoundingClientRect();
    const dotsWidth = count * DOT + (count - 1) * DOT_GAP;
    const first = box.left + (box.width - dotsWidth) / 2 + DOT / 2;
    const index = Math.round((event.clientX - first) / (DOT + DOT_GAP));
    api?.scrollTo(Math.min(Math.max(index, 0), count - 1));
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} role="group" aria-roledescription={a11y.carousel} aria-label={label}>
      {driver}
      {/* Bleeds to the screen edge so the next card peeks in, as in the frame. */}
      <div ref={viewportRef} data-lenis-prevent className="-mx-(--page-x) overflow-hidden px-(--page-x)">
        <div className="flex touch-pan-y gap-4">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-80 shrink-0"
              role="group"
              aria-roledescription={a11y.slide}
              aria-label={a11y.slideOf(index + 1, count)}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* 24px tall for the thumb, 8px in the layout. */}
      <button
        type="button"
        onClick={onDots}
        aria-label={a11y.carouselDots(selected + 1, count)}
        className="-my-2 flex h-6 items-center gap-2 self-center rounded-full px-2"
      >
        {slides.map((_, index) => (
          <span
            key={index}
            aria-hidden="true"
            className={cn("size-2 rounded-full transition-colors duration-(--dur-ui)", index === selected ? "bg-blue" : "bg-line")}
          />
        ))}
      </button>
    </div>
  );
}
