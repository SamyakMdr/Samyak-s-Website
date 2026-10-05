import { StackChip } from "@/components/content/StackChip";
import { SectionHead } from "@/components/layout/SectionHead";
import { skillGroups, skillsSection } from "@/content/skills";

export function Skills() {
  return (
    <section
      id={skillsSection.id}
      aria-labelledby="skills-title"
      className="page-x section-top flex flex-col gap-5 tablet:gap-8"
    >
      <SectionHead
        title={skillsSection.title}
        tone={skillsSection.tone}
        branch={skillsSection.branch}
        intro={skillsSection.intro}
        introMobile={skillsSection.introMobile}
        titleId="skills-title"
        reveal
      />
      <ul className="grid gap-5 tablet:grid-cols-2">
        {skillGroups.map((group) => (
          <li
            key={group.title}
            data-reveal=""
            className="flex flex-col gap-3 overflow-hidden rounded-lg border border-line bg-panel p-4.5 tablet:p-6"
          >
            <h3 className="t-h3 text-fg">{group.title}</h3>
            {/* The mobile cards drop the description. */}
            <p className="t-body-sm text-dim max-tablet:hidden">{group.description}</p>
            <ul className="flex flex-wrap gap-x-2.5 gap-y-2 tablet:gap-y-2.5 tablet:pt-1.5">
              {group.tools.map((tool) => (
                <li key={tool} className="flex">
                  <StackChip tech={tool} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
