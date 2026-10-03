import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { projectsPage } from "@/content/site";

export function ProjectsHeader() {
  const crumbs = projectsPage.breadcrumb.map((label, index, all) => ({
    label,
    href: index < all.length - 1 ? "/" : undefined,
  }));

  return (
    <header className="page-x flex flex-col gap-3 pt-8 pb-5 tablet:gap-4 tablet:pt-18 tablet:pb-8">
      <Breadcrumb items={crumbs} />
      <h1 className="t-h1 text-fg">{projectsPage.title}</h1>
      <p className="t-body-lg max-w-160 text-dim max-tablet:hidden">{projectsPage.intro}</p>
      <p className="t-body-lg text-dim tablet:hidden">{projectsPage.introMobile}</p>
    </header>
  );
}
