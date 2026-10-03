import Image from "next/image";
import { tech, type TechName } from "@/content/tech";
import { cn } from "@/lib/cn";
import { hasLogo } from "@/lib/logos";

type TechLogoProps = {
  name: TechName;
  /** 40 slots and socials · 32 stack chip · 30/28 room facts · 26/24 card stacks. */
  size?: number;
  /** Card stacks overlap, so each tile gets a 2px ring in the card colour. */
  ring?: boolean;
  /** Set when the logo stands alone and needs an accessible name. */
  labelled?: boolean;
  className?: string;
};

export function TechLogo({ name, size = 40, ring = false, labelled = false, className }: TechLogoProps) {
  const { slug, monogram, tile, ink } = tech[name];
  const a11y = labelled ? { role: "img", "aria-label": name } : { "aria-hidden": true };

  if (hasLogo(slug)) {
    return (
      <span
        {...a11y}
        className={cn(
          "relative inline-flex shrink-0 overflow-hidden rounded-btn",
          ring && "border-2 border-panel",
          className,
        )}
        style={{ width: size, height: size }}
      >
        <Image src={`/logos/${slug}.svg`} alt="" width={size} height={size} unoptimized />
      </span>
    );
  }

  return (
    <span
      {...a11y}
      className={cn(
        "t-monogram inline-flex shrink-0 items-center justify-center rounded-btn whitespace-nowrap",
        ring ? "border-2 border-panel" : "border border-on-accent/12",
        className,
      )}
      style={{ width: size, height: size, background: tile, color: ink }}
    >
      {monogram}
    </span>
  );
}
