import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { projectHref } from "@/content/projects";
import { room } from "@/content/site";
import type { Project } from "@/content/types";
import { CloseOnEscape } from "./CloseOnEscape";

type RoomBarProps = {
  project: Project;
  previous: Project;
  next: Project;
};

const PROJECTS = "/projects";

// Desktop: breadcrumb · Previous · Next · Close (Esc). Mobile keeps the
// breadcrumb (with the short alias) and Close only.
export function RoomBar({ project, previous, next }: RoomBarProps) {
  return (
    <div className="flex items-center gap-3">
      <Breadcrumb
        items={[
          { label: room.breadcrumb, href: PROJECTS },
          {
            label: (
              <>
                <span className="max-tablet:hidden">{project.slug}</span>
                <span className="tablet:hidden">{project.alias}</span>
              </>
            ),
          },
        ]}
      />
      <span className="flex-1" />
      <Button href={projectHref(previous)} variant="ghost" className="max-tablet:hidden">
        {room.previous}
      </Button>
      <Button href={projectHref(next)} variant="ghost" className="max-tablet:hidden">
        {room.next}
      </Button>
      <Button
        href={PROJECTS}
        variant="secondary"
        // The mobile button is 33px tall in Figma; the pseudo-element keeps a 44px tap target.
        className="relative max-tablet:py-2 max-tablet:before:absolute max-tablet:before:-inset-1.5 max-tablet:before:content-['']"
      >
        {room.close}{" "}
        <span className="max-tablet:hidden">{room.closeKey}</span>
      </Button>
      <CloseOnEscape href={PROJECTS} />
    </div>
  );
}
