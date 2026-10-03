import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function AvailabilityBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "t-body-sm inline-flex shrink-0 items-center gap-2 rounded-full border border-green/40 bg-green/12 py-1.5 pr-3 pl-2.5 whitespace-nowrap text-fg",
        className,
      )}
    >
      <span aria-hidden="true" className="size-2 rounded-full bg-green" />
      {children}
    </span>
  );
}
