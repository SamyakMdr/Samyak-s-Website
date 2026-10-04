"use client";

import Image from "next/image";
import { a11y } from "@/content/site";
import type { RoomScreen } from "@/content/types";
import { useLazyCarousel } from "@/lib/useLazyCarousel";

// Mobile gallery: 310 × 175 screenshots, 12px apart, swiped by hand.
export function GallerySwipe({ screens, label, className }: { screens: RoomScreen[]; label: string; className?: string }) {
  const { viewportRef, driver } = useLazyCarousel();

  return (
    <div role="group" aria-roledescription={a11y.carousel} aria-label={label} className={className}>
      {/* Bleeds to the screen edge so the next screenshot peeks in, as in the frame. */}
      {driver}
      <div ref={viewportRef} data-lenis-prevent className="-mx-(--page-x) min-h-52.5 overflow-hidden px-(--page-x)">
        <div className="flex touch-pan-y gap-3">
          {screens.map((screen, index) => (
            <div
              key={screen.src}
              className="w-77.5 shrink-0"
              role="group"
              aria-roledescription={a11y.slide}
              aria-label={a11y.slideOf(index + 1, screens.length)}
            >
              <figure className="flex flex-col gap-2">
                <div className="relative h-43.75 overflow-hidden rounded-md border border-line">
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    fill
                    sizes="310px"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <figcaption className="t-body-sm text-dim">{screen.captionMobile ?? screen.caption}</figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
