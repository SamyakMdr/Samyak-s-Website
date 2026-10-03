import { cn } from "@/lib/cn";

// Soft violet → pink light from the right edge, behind Experience and Contact.
// Figma: a 1526 × 1011 ellipse centred 56px past the right edge and vertically
// on the section, layer blur 60 (= CSS 30px). Mobile: 520 × 520, blur 50 (= 25px).
export function Glow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "glow pointer-events-none absolute top-1/2 -z-10 -translate-y-1/2",
        className,
      )}
    />
  );
}
