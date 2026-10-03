import type { TimelineEntry } from "@/content/experience";
import { cn } from "@/lib/cn";

type TimelineItemProps = {
  entry: TimelineEntry;
  /** green = experience, violet = education. */
  tone: "green" | "violet";
  /** The newest item: its ring takes the tone colour. */
  current?: boolean;
  /** Hides the rail below the dot. */
  last?: boolean;
  /** Force the mobile layout (role on its own line, dates pill below). */
  compact?: boolean;
};

const TONES = {
  green: { ring: "border-green", place: "text-blue-t", hash: "text-green-t" },
  violet: { ring: "border-violet", place: "text-violet-t", hash: "text-violet-t" },
} as const;

// The mobile frame uses a shorter place line and summary for some items.
function Responsive({ desktop, mobile, compact }: { desktop: string; mobile?: string; compact: boolean }) {
  if (!mobile) return desktop;
  if (compact) return mobile;
  return (
    <>
      <span className="max-tablet:hidden">{desktop}</span>
      <span className="tablet:hidden">{mobile}</span>
    </>
  );
}

export function TimelineItem({ entry, tone, current = false, last = false, compact = false }: TimelineItemProps) {
  const colors = TONES[tone];
  // Below the mobile breakpoint every item is compact.
  const stack = compact ? "flex-col items-start gap-2" : "max-tablet:flex-col max-tablet:items-start max-tablet:gap-2";

  return (
    <li className={cn("flex items-stretch", compact ? "gap-3.5" : "gap-3.5 tablet:gap-4.5")}>
      <div aria-hidden="true" className="flex shrink-0 flex-col items-center gap-1.5 pt-1.5">
        <span className={cn("size-3.5 rounded-full border-3 bg-bg", current ? colors.ring : "border-dim")} />
        {!last && <span className="w-0.5 flex-1 bg-line" />}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 pb-8">
        <div className={cn("flex items-center gap-2.5", stack)}>
          <h3 className={cn("t-h3 text-fg", compact ? "text-[18px]" : "max-tablet:text-[18px]")}>{entry.title}</h3>
          <span className={cn("t-mono-sm shrink-0 rounded-full bg-panel-2 px-2.5 py-1 whitespace-nowrap text-dim", !compact && "tablet:ml-auto")}>
            {entry.dates}
          </span>
        </div>
        <p className={cn("t-body-sm", colors.place)}>
          <Responsive desktop={entry.place} mobile={entry.placeMobile} compact={compact} />
        </p>
        <p className="t-body text-dim">
          <Responsive desktop={entry.summary} mobile={entry.summaryMobile} compact={compact} />
        </p>
        <p className="t-mono-sm flex flex-wrap items-start gap-x-2">
          <span className={colors.hash}>{entry.hash}</span>
          <span className="text-dim">{entry.commit}</span>
        </p>
      </div>
    </li>
  );
}
