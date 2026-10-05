import { TimelineItem } from "@/components/content/TimelineItem";
import { Glow } from "@/components/layout/Glow";
import { SectionHead } from "@/components/layout/SectionHead";
import { Button } from "@/components/ui/Button";
import { cvCard, experience, experienceSection } from "@/content/experience";
import { site } from "@/content/site";

function CvCard() {
  return (
    <aside data-reveal="" className="flex flex-col gap-3 overflow-hidden rounded-lg border border-line bg-panel p-4.5 tablet:w-90 tablet:shrink-0 tablet:gap-3.5 tablet:p-6">
      <h3 className="t-h3 text-fg">{cvCard.title}</h3>
      <p className="t-body-sm text-dim max-tablet:hidden">{cvCard.text}</p>
      <p className="t-body-sm text-dim tablet:hidden">{cvCard.textMobile}</p>
      <Button
        href={site.cv.href}
        download={site.cv.file}
        variant="secondary"
        icon="download"
        fullWidth
        className="max-tablet:py-3.5"
      >
        {cvCard.action}
      </Button>
      <p className="t-mono-sm text-dim max-tablet:hidden">{site.cv.updated}</p>
    </aside>
  );
}

export function Experience() {
  return (
    <section
      id={experienceSection.id}
      aria-labelledby="experience-title"
      className="page-x section-top relative isolate flex flex-col gap-5 overflow-x-clip tablet:gap-8"
    >
      <Glow />
      <SectionHead
        title={experienceSection.title}
        tone={experienceSection.tone}
        branch={experienceSection.branch}
        intro={experienceSection.intro}
        introMobile={experienceSection.introMobile}
        titleId="experience-title"
        reveal
      />
      <div className="flex flex-col gap-5 desktop:flex-row desktop:items-start desktop:gap-10">
        <ol data-reveal="" className="flex min-w-0 flex-col desktop:w-180 desktop:shrink-0">
          {experience.map((entry, index) => (
            <TimelineItem
              key={entry.hash}
              entry={entry}
              tone="green"
              current={index === 0}
              last={index === experience.length - 1}
            />
          ))}
        </ol>
        <CvCard />
      </div>
    </section>
  );
}
