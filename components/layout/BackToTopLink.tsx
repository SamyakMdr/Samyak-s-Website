"use client";

import { cn } from "@/lib/cn";
import { scrollToTop } from "@/lib/scroll";

export function BackToTopLink({ label, className }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => scrollToTop()}
      className={cn("t-caption rounded-xs text-dim transition-colors duration-(--dur-ui) hover:text-fg", className)}
    >
      {label}
    </button>
  );
}
