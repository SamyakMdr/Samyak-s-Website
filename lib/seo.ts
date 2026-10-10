import type { Metadata } from "next";
import { contactCard, socials } from "@/content/contact";
import { projectHref } from "@/content/projects";
import { seo, site } from "@/content/site";
import type { Project } from "@/content/types";

/** The one public origin used by canonicals, structured data and crawler files. */
export const siteUrl = site.url.replace(/\/+$/, "");

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteUrl}/`).toString();
}

type PageSeo = {
  title: string;
  description: string;
  /** Route path, used for the canonical URL. */
  path: string;
  /** Share image; defaults to the site-wide one. */
  image?: { url: string; width: number; height: number; alt: string };
};

/** Title, description, canonical, Open Graph and Twitter tags for one route. */
export function pageMetadata({ title, description, path, image }: PageSeo): Metadata {
  const share = image ?? { url: seo.ogImage, width: 1200, height: 630, alt: seo.ogImageAlt };
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: { type: "website", siteName: site.fullName, locale: "en", url: path, title, description, images: [share] },
    twitter: { card: "summary_large_image", title, description, images: [share.url] },
  };
}

const author = { "@type": "Person", name: site.fullName, url: siteUrl };

/** schema.org Person for Home. Social links are added once they are real URLs. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.fullName,
    jobTitle: site.jobTitle,
    url: siteUrl,
    image: absoluteUrl(contactCard.avatar.src),
    address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: site.country },
    sameAs: socials.filter((social) => social.profile && /^https?:/.test(social.href)).map((social) => social.href),
  };
}

export function creativeWorkJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: absoluteUrl(projectHref(project)),
    image: absoluteUrl(project.cover),
    dateCreated: String(project.year),
    genre: project.category,
    keywords: project.stack.join(", "),
    author,
  };
}

/** Mirrors the visible `~/ home / projects / slug` breadcrumb. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
