import Image from "next/image";
import type { Activity } from "@/content/activities";
import { cn } from "@/lib/cn";

export function ActivityRow({ activity, last = false }: { activity: Activity; last?: boolean }) {
  const { href, org } = activity;

  return (
    <li
      className={cn(
        "group/row relative flex items-center gap-3.5 py-3.5",
        !last && "border-b border-line",
        href && "cursor-pointer",
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="t-strong text-fg">{activity.role}</span>
        {href ? (
          // One link per row: its ::after stretches over the whole row, so the
          // role, dates and logo are all part of the click target.
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${org} (opens website in a new tab)`}
            className="t-body-sm self-start rounded-xs text-dim transition-colors duration-(--dur-ui) ease-ui after:absolute after:inset-0 after:content-[''] group-hover/row:text-blue-t focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
          >
            {org}
          </a>
        ) : (
          <span className="t-body-sm text-dim">{org}</span>
        )}
        <span className="t-mono-sm text-dim">{activity.dates}</span>
      </div>
      {/* object-contain keeps wide logos whole; the white backing suits logos drawn on white. */}
      <Image
        src={activity.logo}
        alt={href ? "" : `${org} logo`}
        width={44}
        height={44}
        sizes="44px"
        loading="lazy"
        className={cn(
          "size-11 shrink-0 rounded-md border border-line bg-white object-contain",
          href &&
            "transition-[border-color,box-shadow] duration-(--dur-ui) ease-ui group-hover/row:border-blue group-hover/row:shadow-[0_0_14px_var(--blue)]",
        )}
      />
    </li>
  );
}
