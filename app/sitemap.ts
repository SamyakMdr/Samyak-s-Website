import type { MetadataRoute } from "next";
import { projectHref, projects } from "@/content/projects";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/projects"), changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((project) => ({
      url: absoluteUrl(projectHref(project)),
      changeFrequency: "yearly" as const,
      priority: project.featured ? 0.7 : 0.5,
    })),
  ];
}
