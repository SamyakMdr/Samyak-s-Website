import { HistoryTerminal } from "@/components/terminal/HistoryTerminal";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { Button } from "@/components/ui/Button";
import { hero, site } from "@/content/site";

// README card: the first screen is a file you would open in an editor.
export function Hero() {
  return (
    // The mobile frame draws the card flat; the shadow starts at the tablet breakpoint.
    <div className="overflow-hidden rounded-card border border-line bg-panel tablet:rounded-lg tablet:shadow-readme">
      <div className="flex items-center gap-2.5 border-b border-line bg-panel-2 px-4 py-2.25 tablet:px-5 tablet:py-2.75">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="size-2 rounded-full bg-blue" />
          <span className="t-mono-label text-fg">{hero.file}</span>
        </span>
        <span className="t-mono-sm ml-auto text-dim max-tablet:hidden">{hero.fileMeta}</span>
        <span className="t-mono-sm ml-auto text-dim tablet:hidden">{hero.fileMetaMobile}</span>
      </div>

      <div className="flex flex-col gap-4.5 px-5 pt-6 pb-5.5 tablet:gap-8 tablet:p-12 desktop:flex-row desktop:items-center desktop:gap-12">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-4.5 tablet:gap-5.5">
          <AvailabilityBadge>{hero.badge}</AvailabilityBadge>
          <h1 className="t-hero text-fg">{hero.title}</h1>
          <p className="flex flex-col gap-0.5 tablet:flex-row tablet:items-center tablet:gap-2.5">
            <span className="t-strong text-fg">{site.role}</span>
            <span aria-hidden="true" className="size-1 rounded-full bg-dim max-tablet:hidden" />
            <span className="text-dim tablet:t-body max-tablet:t-body-sm">{site.location}</span>
          </p>
          <p className="t-body-lg text-dim max-tablet:hidden">{hero.intro}</p>
          <p className="t-body-lg text-dim tablet:hidden">{hero.introMobile}</p>
          <div className="flex flex-col gap-2.5 self-stretch tablet:flex-row tablet:items-start tablet:gap-3 tablet:self-auto">
            <Button href={hero.primary.href} variant="primary" icon="download" fullWidth="mobile">
              {hero.primary.label}
            </Button>
            <Button href={hero.secondary.href} variant="secondary" fullWidth="mobile">
              {hero.secondary.label}
            </Button>
          </div>
        </div>

        <HistoryTerminal className="w-full shrink-0 desktop:w-117.5" />
      </div>
    </div>
  );
}
