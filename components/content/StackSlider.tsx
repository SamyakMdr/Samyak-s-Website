import type { CSSProperties } from "react";
import { stackSlider } from "@/content/site";
import { stackRows, stackRowsMobile, type TechName } from "@/content/tech";
import { cn } from "@/lib/cn";
import { StackChip } from "./StackChip";
import { StackSliderMotion } from "./StackSliderMotion";

type RowProps = {
  items: TechName[];
  /** Resting position of the track, in px. */
  offset: number;
  /** Mobile rows drift with CSS (see globals.css) so phones never load GSAP. */
  drift?: "left" | "right";
  className?: string;
};

function Row({ items, offset, drift, className }: RowProps) {
  // The list is rendered twice so the loop never shows a gap.
  return (
    <div className={cn("no-scrollbar flex overflow-x-auto tablet:overflow-visible", className)}>
      <div
        data-track
        className={cn("flex w-max shrink-0 gap-3 pr-3", drift && `stack-drift-${drift}`)}
        style={{ transform: `translate3d(${offset}px, 0, 0)`, "--stack-offset": `${offset}px` } as CSSProperties}
      >
        {[...items, ...items].map((tech, index) => (
          <StackChip key={`${tech}-${index}`} tech={tech} aria-hidden={index >= items.length} />
        ))}
      </div>
    </div>
  );
}

// Two infinite rows of tools drifting in opposite directions (motion lives in
// StackSliderMotion). Reduced motion: no movement. Mobile: the rows can also
// be swiped by hand.
export function StackSlider() {
  return (
    <StackSliderMotion
      label={stackSlider.label}
      className="relative flex flex-col gap-2.5 overflow-hidden border-y border-line bg-panel py-5.25 tablet:gap-3.5 tablet:py-7"
    >
      <Row items={stackRows.forward} offset={-60} className="max-tablet:hidden" />
      <Row items={stackRows.backward} offset={-260} className="max-tablet:hidden" />
      {/* Resting offsets from the Mobile / Home frame. */}
      <Row items={stackRowsMobile.forward} offset={-40} drift="right" className="tablet:hidden" />
      <Row items={stackRowsMobile.backward} offset={-157} drift="left" className="tablet:hidden" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-linear-to-r from-panel to-transparent max-tablet:hidden" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-linear-to-l from-panel to-transparent max-tablet:hidden" />
    </StackSliderMotion>
  );
}
