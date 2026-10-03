import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        "t-mono-xs inline-flex shrink-0 items-start rounded-sm border border-b-2 border-line bg-panel-2 px-1.5 py-0.75 whitespace-nowrap text-dim",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
