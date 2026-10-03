import type { ReactNode } from "react";
import { ActivityRow } from "@/components/content/ActivityRow";
import { CommitGraph } from "@/components/content/CommitGraph";
import { ContactRow } from "@/components/content/ContactRow";
import { ProjectCard } from "@/components/content/ProjectCard";
import { StackChip } from "@/components/content/StackChip";
import { Stat } from "@/components/content/Stat";
import { TimelineItem } from "@/components/content/TimelineItem";
import { SectionHead } from "@/components/layout/SectionHead";
import { HistoryTerminal } from "@/components/terminal/HistoryTerminal";
import { InteractiveTerminal } from "@/components/terminal/InteractiveTerminal";
import { ShortcutsCard } from "@/components/terminal/ShortcutsCard";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { BranchTag } from "@/components/ui/BranchTag";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { HintChip } from "@/components/ui/HintChip";
import { Kbd } from "@/components/ui/Kbd";
import { NavTab } from "@/components/ui/NavTab";
import { StatusPill } from "@/components/ui/StatusPill";
import { TechLogo } from "@/components/ui/TechLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { activities } from "@/content/activities";
import { contactCard, contactForm } from "@/content/contact";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { featuredProjects } from "@/content/projects";
import { skillsSection } from "@/content/skills";
import { tech, type TechName } from "@/content/tech";
import type { Tone } from "@/content/types";
import { PromptDemo } from "./PromptDemo";

const TONES: Tone[] = ["blue", "green", "violet", "cyan", "pink"];
const LOGO_SIZES = [40, 32, 30, 28, 26, 24];

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="t-h2">{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="t-mono-sm text-dim">{label}</span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

// Every shared component with its variants, in the order of the Figma
// Components page (sections 02–06). Hover, pressed and focus are live states.
export function Components() {
  const [heli] = featuredProjects;

  return (
    <>
      <Group title="02 Actions and controls">
        {(["primary", "secondary", "ghost"] as const).map((variant) => (
          <Row key={variant} label={`Button / ${variant}`}>
            <Button variant={variant}>Default</Button>
            <Button variant={variant} icon="download">
              With icon
            </Button>
            <Button variant={variant} size="sm" icon="download">
              Small
            </Button>
            <Button variant={variant} disabled>
              Disabled
            </Button>
          </Row>
        ))}
        <Row label="Filter Chip · Terminal Prompt">
          <div className="w-full">
            <PromptDemo />
          </div>
        </Row>
        <Row label="Hint Chip · Kbd · Availability Badge · Status Pill · Theme toggle">
          <HintChip command="goto projects" />
          <Kbd>Ctrl K</Kbd>
          <AvailabilityBadge>{contactCard.badge}</AvailabilityBadge>
          <StatusPill status="ready">Ready</StatusPill>
          <StatusPill status="pending">Pending</StatusPill>
          <StatusPill status="over">Over</StatusPill>
          <ThemeToggle />
        </Row>
      </Group>

      <Group title="03 Navigation">
        <Row label="Nav Tab">
          <NavTab label="main" href="/dev/ui" active />
          <NavTab label="experience" href="/dev/ui" />
        </Row>
        <Row label="Branch Tag">
          {TONES.map((tone) => (
            <BranchTag key={tone} tone={tone} label={`feature/${tone}`} />
          ))}
        </Row>
      </Group>

      <Group title="04 Cards and content">
        <Row label="Section Head">
          <SectionHead
            title={skillsSection.title}
            tone={skillsSection.tone}
            branch={skillsSection.branch}
            intro={skillsSection.intro}
          />
        </Row>
        {heli && (
          <div className="grid gap-5 desktop:grid-cols-[776fr_326fr]">
            <ProjectCard project={heli} layout="feature" width="wide" highlight />
            <ProjectCard project={heli} layout="grid" />
          </div>
        )}
        <Row label="Stack Chip · Logo Slot sizes">
          <StackChip tech="TypeScript" />
          <StackChip tech="PostgreSQL" />
          {LOGO_SIZES.map((size) => (
            <TechLogo key={size} name="React" size={size} labelled />
          ))}
        </Row>
        <Row label="Logo Slots">
          {(Object.keys(tech) as TechName[]).map((name) => (
            <TechLogo key={name} name={name} labelled />
          ))}
        </Row>
        <Row label="Stat · Contact Row">
          <Stat value="40+" label="API endpoints with tests" />
          {contactCard.details.slice(0, 2).map((detail) => (
            <ContactRow key={detail.label} detail={detail} />
          ))}
        </Row>
        <ul className="max-w-100 rounded-card border border-line bg-panel px-6">
          {activities.map((activity, index) => (
            <ActivityRow key={activity.role} activity={activity} last={index === activities.length - 1} />
          ))}
        </ul>
      </Group>

      <Group title="05 Terminal">
        <div className="grid items-start gap-6 desktop:grid-cols-[470px_1fr]">
          <HistoryTerminal />
          <div className="flex flex-col gap-6">
            <Field label={contactForm.fields.name.label} name="demo-name" placeholder={contactForm.fields.name.placeholder} />
            <Field
              label={contactForm.fields.title.label}
              name="demo-title"
              placeholder={contactForm.fields.title.placeholder}
              error={contactForm.errors.title}
            />
            <Field
              multiline
              label={contactForm.fields.description.label}
              name="demo-description"
              placeholder={contactForm.fields.description.placeholder}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 desktop:flex-row desktop:items-start">
          <InteractiveTerminal className="min-w-0 desktop:h-125.75 desktop:flex-1" />
          <ShortcutsCard className="desktop:h-125.75 desktop:w-85 desktop:shrink-0" />
        </div>
      </Group>

      <Group title="06 Timeline and graph">
        <div className="grid gap-10 desktop:grid-cols-2">
          <ol>
            {experience.slice(0, 2).map((entry, index) => (
              <TimelineItem key={entry.hash} entry={entry} tone="green" current={index === 0} last={index === 1} />
            ))}
          </ol>
          <ol>
            {education.map((entry, index) => (
              <TimelineItem key={entry.hash} entry={entry} tone="violet" current={index === 0} last={index === 1} compact />
            ))}
          </ol>
        </div>
        <CommitGraph orientation="horizontal" className="mt-6 max-desktop:hidden" />
        <CommitGraph orientation="vertical" className="max-w-87.5" />
      </Group>
    </>
  );
}
