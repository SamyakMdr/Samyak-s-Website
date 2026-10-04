import { BranchTag } from "@/components/ui/BranchTag";
import { Button } from "@/components/ui/Button";
import { room } from "@/content/site";
import type { Project } from "@/content/types";

// Real demo and repository URLs open in a new tab; placeholders stay in place.
function external(href: string) {
  return /^https?:\/\//.test(href) ? { target: "_blank", rel: "noreferrer" } : {};
}

const realLink = (href?: string) => (href && href !== "#" ? href : null);

export function Intro({ project }: { project: Project }) {
  // Projects without their own room content yet lead with the card summary.
  const lead = project.room?.lead ?? project.summary;
  const demo = realLink(project.links.demo);
  const github = realLink(project.links.github);

  return (
    <div className="flex min-w-0 flex-col items-start gap-4 tablet:gap-4.5">
      <BranchTag color={project.color} label={project.branch} />
      <h1 className="t-room max-w-160 text-fg">{project.title}</h1>
      <p className="t-body-lg max-w-150 text-dim">{lead}</p>
      {/* A button only shows for a real address: "#" and a missing link both hide it. */}
      {(demo || github) && (
        <div className="flex flex-col gap-4 self-stretch tablet:flex-row tablet:gap-3 tablet:self-auto">
          {demo && (
            <Button href={demo} variant="primary" fullWidth="mobile" {...external(demo)}>
              {room.demo}
            </Button>
          )}
          {github && (
            <Button href={github} variant={demo ? "secondary" : "primary"} fullWidth="mobile" {...external(github)}>
              {room.github}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
