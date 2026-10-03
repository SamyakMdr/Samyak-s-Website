import { Stat } from "@/components/content/Stat";
import { room } from "@/content/site";
import type { ProjectRoom } from "@/content/types";

// Four boxes in a row; 2 × 2 with the shorter labels on mobile.
export function Outcome({ outcome }: { outcome: ProjectRoom["outcome"] }) {
  return (
    <section aria-labelledby="room-outcome" className="flex flex-col gap-3 tablet:gap-5">
      <h2 id="room-outcome" className="t-h2 text-fg">
        {room.outcome}
      </h2>
      <ul className="grid grid-cols-2 gap-3 tablet:grid-cols-4 tablet:gap-5">
        {outcome.stats.map((stat) => (
          <li key={stat.label} className="rounded-win border border-line bg-panel p-4 tablet:rounded-card tablet:p-5.5">
            <Stat value={stat.value} label={stat.label} className={stat.labelMobile ? "max-tablet:hidden" : undefined} />
            {stat.labelMobile && <Stat value={stat.value} label={stat.labelMobile} className="tablet:hidden" />}
          </li>
        ))}
      </ul>
      <p className="t-caption text-dim">
        {outcome.noteMobile ? (
          <>
            <span className="max-tablet:hidden">{outcome.note}</span>
            <span className="tablet:hidden">{outcome.noteMobile}</span>
          </>
        ) : (
          outcome.note
        )}
      </p>
    </section>
  );
}
