import { cva } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Only used by the v1 dispatch board; kept for future project rooms.
const statusPill = cva("t-mono-sm inline-flex shrink-0 items-center rounded-full px-2.25 py-0.75 whitespace-nowrap", {
  variants: {
    status: {
      ready: "bg-green/16 text-green-t",
      pending: "bg-warn/16 text-warn",
      over: "bg-bad/16 text-bad",
    },
  },
  defaultVariants: { status: "ready" },
});

type StatusPillProps = {
  status: "ready" | "pending" | "over";
  children: ReactNode;
  className?: string;
};

export function StatusPill({ status, children, className }: StatusPillProps) {
  return <span className={cn(statusPill({ status }), className)}>{children}</span>;
}
