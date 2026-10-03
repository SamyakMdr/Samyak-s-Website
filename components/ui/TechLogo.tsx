import Image from "next/image";
import { tech, type Tech, type TechName } from "@/content/tech";
import { cn } from "@/lib/cn";

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
  const entry: Tech = tech[name];
  const { slug, monogram, tile, ink } = entry;
  const a11y = labelled ? { role: "img", "aria-label": name } : { "aria-hidden": true };

  if (entry.logo) {
    const src = `/logos/${slug}.${entry.logo === "png" ? "png" : "svg"}`;
    // Marks drawn in black or navy come with a light version for dark surfaces.
    const dark = entry.darkLogo ? `/logos/${slug}-dark.svg` : null;
    return (
      <span
        {...a11y}
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-btn",
          // Stacked logos overlap, so they sit on the card colour.
          ring && "border-2 border-panel bg-panel",
          className,
        )}
        style={{ width: size, height: size }}
      >
        <Image src={src} alt="" width={size} height={size} unoptimized className={cn("size-full object-contain", dark && "logo-light")} />
        {dark && (
          <Image src={dark} alt="" width={size} height={size} unoptimized className="logo-dark size-full object-contain" />
        )}
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
