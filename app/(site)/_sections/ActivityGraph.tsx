import { CommitGraph } from "@/components/content/CommitGraph";
import { activityGraph } from "@/content/site";

// Recent work as a commit graph: horizontal with hover tooltips from the tablet
// breakpoint up, vertical with inline commands on mobile.
export function ActivityGraph() {
  return (
    <section
      id={activityGraph.id}
      aria-label={activityGraph.label}
      className="page-x flex flex-col gap-2.5 py-6 tablet:pt-14 tablet:pb-14"
    >
      <p className="t-body-sm text-dim max-tablet:hidden">
        {activityGraph.caption}
      </p>
      <p className="t-body-sm text-dim tablet:hidden">
        {activityGraph.captionMobile}
      </p>
      {/* Below 1120px the graph scales down, so the labels above main need room. */}
      <CommitGraph
        orientation="horizontal"
        className="max-tablet:hidden max-desktop:mt-6"
      />
      <CommitGraph orientation="vertical" className="tablet:hidden" />
    </section>
  );
}
