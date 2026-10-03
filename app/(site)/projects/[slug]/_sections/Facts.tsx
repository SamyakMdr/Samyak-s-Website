import { TechLogo } from "@/components/ui/TechLogo";
import { room } from "@/content/site";
import type { Project, RoomFact } from "@/content/types";
import { cn } from "@/lib/cn";

const ROW = "flex justify-between gap-4 py-2.75 tablet:py-3";

export function Facts({ project, className }: { project: Project; className?: string }) {
  // Projects without room content show the facts their card already has.
  const facts: RoomFact[] = project.room?.facts ?? [
    { label: room.year, value: String(project.year) },
    { label: room.type, value: project.category },
  ];
  const stack = project.room?.stack ?? project.stack;

  return (
    <dl
      className={cn(
        "flex flex-col rounded-win border border-line bg-panel px-4.5 py-1.5 tablet:rounded-card tablet:px-5.5 tablet:py-2",
        className,
      )}
    >
      {facts.map((fact) => (
        <div key={fact.label} className={cn(ROW, "items-start border-b border-line")}>
          <dt className="t-body-sm text-dim">{fact.label}</dt>
          <dd className="t-strong text-right text-fg">
            {fact.valueMobile ? (
              <>
                <span className="max-tablet:hidden">{fact.value}</span>
                <span className="tablet:hidden">{fact.valueMobile}</span>
              </>
            ) : (
              fact.value
            )}
          </dd>
        </div>
      ))}
      <div className={cn(ROW, "items-center")}>
        <dt className="t-body-sm text-dim">{room.stack}</dt>
        <dd className="flex items-start gap-1.5">
          {stack.map((name) => (
            // 30px slots, 28px on mobile (the size prop is an inline style, hence the !).
            <TechLogo key={name} name={name} size={30} labelled className="max-tablet:size-7!" />
          ))}
        </dd>
      </div>
    </dl>
  );
}
