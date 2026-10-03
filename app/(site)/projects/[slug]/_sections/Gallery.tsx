import Image from "next/image";
import { room } from "@/content/site";
import type { RoomScreen } from "@/content/types";
import { GallerySwipe } from "./GallerySwipe";

// Two columns from tablet up; a swipe row on mobile, which also gets the
// screenshots marked mobileOnly.
export function Gallery({ screens }: { screens: RoomScreen[] }) {
  const columns = screens.filter((screen) => !screen.mobileOnly);

  return (
    <section aria-labelledby="room-screens" className="flex flex-col gap-3 tablet:gap-4">
      <h2 id="room-screens" className="t-h2 text-fg">
        {room.screens}
      </h2>

      <ul className="flex gap-5 max-tablet:hidden">
        {columns.map((screen) => (
          <li key={screen.src} className="min-w-0 flex-1">
            <figure className="flex flex-col gap-2.5">
              <div className="relative aspect-550/304 overflow-hidden rounded-card border border-line">
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  fill
                  sizes="(min-width: 1200px) 550px, 50vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="t-body-sm text-dim">{screen.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <GallerySwipe screens={screens} label={room.screens} className="tablet:hidden" />
    </section>
  );
}
