import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/layout/JsonLd";
import { getAdjacentProjects, getProject, projectHref, projects } from "@/content/projects";
import { seo, site } from "@/content/site";
import { breadcrumbJsonLd, creativeWorkJsonLd, pageMetadata } from "@/lib/seo";
import { Cover } from "./_sections/Cover";
import { Facts } from "./_sections/Facts";
import { Gallery } from "./_sections/Gallery";
import { Intro } from "./_sections/Intro";
import { NextProject } from "./_sections/NextProject";
import { Outcome } from "./_sections/Outcome";
import { RequestFlow } from "./_sections/RequestFlow";
import { RoomBar } from "./_sections/RoomBar";
import { Story } from "./_sections/Story";

type RoomPageProps = { params: Promise<{ slug: string }> };

// Every room is known at build time; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: RoomPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const copy = seo.rooms[slug] ?? { title: `${project.title} | ${site.name}`, description: project.summary };
  return pageMetadata({
    ...copy,
    path: projectHref(project),
    // Covers are 1200 × 675.
    image: { url: project.cover, width: 1200, height: 675, alt: project.coverAlt },
  });
}

// One template for every project. Only heli-booking has room content so far;
// the others show the bar, intro, facts, cover and next project.
export default async function ProjectRoomPage({ params }: RoomPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { previous, next } = getAdjacentProjects(slug);
  const { room } = project;

  return (
    <main id="main" className="pt-(--header-h)">
      <JsonLd data={creativeWorkJsonLd(project)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: seo.breadcrumbs.home, path: "/" },
          { name: seo.breadcrumbs.projects, path: "/projects" },
          { name: project.title, path: projectHref(project) },
        ])}
      />
      <article className="page-x flex flex-col gap-9 pt-5 pb-24 tablet:gap-14 tablet:pt-10">
        <RoomBar project={project} previous={previous} next={next} />

        {/* Desktop: intro and facts side by side, cover below. Mobile and tablet:
            intro, cover, then facts. */}
        <div className="grid gap-9 tablet:gap-14 desktop:grid-cols-[minmax(0,1fr)_380px] desktop:items-start">
          <Intro project={project} />
          <Facts project={project} className="max-desktop:order-3" />
          <Cover project={project} className="max-desktop:order-2 desktop:col-span-2" />
        </div>

        {room && (
          <>
            <Story story={room.story} />
            <Gallery screens={room.screens} />
            <RequestFlow flow={room.flow} />
            <Outcome outcome={room.outcome} />
          </>
        )}

        <NextProject project={next} />
      </article>
    </main>
  );
}
