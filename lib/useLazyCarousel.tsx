"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { CarouselApi } from "@/components/content/CarouselDriver";

const CarouselDriver = dynamic(() => import("@/components/content/CarouselDriver"), { ssr: false });

/**
 * Swipe carousel that starts late: Embla measures every slide when it starts,
 * so it is loaded and attached only once the carousel is near the screen (and
 * never where the carousel is hidden). Render `driver` anywhere in the tree.
 */
export function useLazyCarousel() {
  const [viewport, setViewport] = useState<HTMLElement | null>(null);
  const [near, setNear] = useState(false);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!viewport) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setNear(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [viewport]);

  const driver = near && viewport ? <CarouselDriver viewport={viewport} onApi={setApi} /> : null;

  return { viewportRef: setViewport, api, driver };
}
