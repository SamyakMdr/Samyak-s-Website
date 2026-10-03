"use client";

import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { useEffect } from "react";

export type CarouselApi = NonNullable<UseEmblaCarouselType[1]>;

type CarouselDriverProps = {
  /** The scroll viewport; its first child is the row of slides. */
  viewport: HTMLElement;
  onApi: (api: CarouselApi | undefined) => void;
};

// Attaches Embla to markup that is already on the page. It lives in its own
// file so the library only loads when a carousel is about to be seen.
export default function CarouselDriver({ viewport, onApi }: CarouselDriverProps) {
  const [attach, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", dragFree: false });

  useEffect(() => {
    attach(viewport);
  }, [attach, viewport]);

  useEffect(() => {
    onApi(api);
    return () => onApi(undefined);
  }, [api, onApi]);

  return null;
}
