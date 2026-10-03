"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import type { RoomScreen } from "@/content/types";

// Mobile gallery: 310 × 175 screenshots, 12px apart, swiped by hand.
export function GallerySwipe({ screens, label, className }: { screens: RoomScreen[]; label: string; className?: string }) {
  const [viewport] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });

  return (
    <div role="group" aria-roledescription="carousel" aria-label={label} className={className}>
      {/* Bleeds to the screen edge so the next screenshot peeks in, as in the frame. */}
      <div ref={viewport} data-lenis-prevent className="-mx-(--page-x) min-h-52.5 overflow-hidden px-(--page-x)">
        <ul className="flex touch-pan-y gap-3">
          {screens.map((screen, index) => (
            <li
              key={screen.src}
              className="w-77.5 shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${screens.length}`}
            >
              <figure className="flex flex-col gap-2">
                <div className="relative h-43.75 overflow-hidden rounded-md border border-line">
                  <Image src={screen.src} alt={screen.alt} fill sizes="310px" className="object-cover" />
                </div>
                <figcaption className="t-body-sm text-dim">{screen.captionMobile ?? screen.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
