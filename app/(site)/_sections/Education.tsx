import { ActivityRow } from "@/components/content/ActivityRow";
import { TimelineItem } from "@/components/content/TimelineItem";
import { SectionHead } from "@/components/layout/SectionHead";
import { activities, activitiesBox } from "@/content/activities";
import { education, educationSection } from "@/content/education";

export function Education() {
  return (
    <section
      id={educationSection.id}
      aria-labelledby="education-title"
      className="page-x section-top flex flex-col gap-5 tablet:gap-8"
    >
      <SectionHead
        title={educationSection.title}
        tone={educationSection.tone}
        branch={educationSection.branch}
        intro={educationSection.intro}
        introMobile={educationSection.introMobile}
        titleId="education-title"
      />
      <div className="flex flex-col gap-5 desktop:flex-row desktop:items-start desktop:gap-10">
        <ol className="flex min-w-0 flex-col desktop:flex-1">
          {education.map((entry, index) => (
            <TimelineItem
              key={entry.hash}
              entry={entry}
              tone="violet"
              current={index === 0}
              last={index === education.length - 1}
            />
          ))}
        </ol>

        <aside className="rounded-card border border-line bg-panel p-4.5 tablet:px-6 tablet:pt-5 tablet:pb-2 desktop:w-100 desktop:shrink-0">
          <div className="flex flex-col gap-1 pb-1.5">
            <h3 className="t-h4 text-fg">{activitiesBox.title}</h3>
            <p className="t-body-sm text-dim">{activitiesBox.text}</p>
          </div>
          <ul>
            {activities.map((activity, index) => (
              <ActivityRow key={activity.role} activity={activity} last={index === activities.length - 1} />
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
