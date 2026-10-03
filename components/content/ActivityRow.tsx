import type { Activity } from "@/content/activities";
import { cn } from "@/lib/cn";

export function ActivityRow({ activity, last = false }: { activity: Activity; last?: boolean }) {
  return (
    <li className={cn("flex items-center gap-3.5 py-3.5", !last && "border-b border-line")}>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="t-strong text-fg">{activity.role}</span>
        <span className="t-body-sm text-dim">{activity.org}</span>
        <span className="t-mono-sm text-dim">{activity.dates}</span>
      </div>
      {/* Organisation logo slot: monogram until the real logo is added. */}
      <span
        aria-hidden="true"
        className="t-mono-sm flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-md border border-line bg-panel-2 text-dim"
      >
        {activity.logo}
      </span>
    </li>
  );
}
