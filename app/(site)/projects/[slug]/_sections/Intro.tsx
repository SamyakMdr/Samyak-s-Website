import { BranchTag } from "@/components/ui/BranchTag";
import { Button } from "@/components/ui/Button";
import { room } from "@/content/site";
import type { Project } from "@/content/types";

// Real demo and repository URLs open in a new tab; placeholders stay in place.
function external(href: string) {
  return /^https?:\/\//.test(href) ? { target: "_blank", rel: "noreferrer" } : {};
}

export function Intro({ project }: { project: Project }) {
  // Projects without their own room content yet lead with the card summary.
  const lead = project.room?.lead ?? project.summary;

  return (
    <div className="flex min-w-0 flex-col items-start gap-4 tablet:gap-4.5">
      <BranchTag tone={project.tone} label={project.branch} />
      <h1 className="t-room max-w-160 text-fg">{project.title}</h1>
      <p className="t-body-lg max-w-150 text-dim">{lead}</p>
      <div className="flex flex-col gap-4 self-stretch tablet:flex-row tablet:gap-3 tablet:self-auto">
        <Button href={project.links.demo} variant="primary" fullWidth="mobile" {...external(project.links.demo)}>
          {room.demo}
        </Button>
        <Button href={project.links.github} variant="secondary" fullWidth="mobile" {...external(project.links.github)}>
          {room.github}
        </Button>
      </div>
    </div>
  );
}
