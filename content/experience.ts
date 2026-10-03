import type { Tone } from "./types";

export interface TimelineEntry {
  title: string;
  dates: string;
  /** Company or school line. */
  place: string;
  summary: string;
  /** Shorter place line and summary shown on mobile (Mobile / Home frame). */
  placeMobile?: string;
  summaryMobile?: string;
  hash: string;
  commit: string;
}

export const experienceSection = {
  id: "experience",
  title: "Experience",
  branch: "experience",
  tone: "green" satisfies Tone as Tone,
  intro: "Where I've worked and what I shipped, newest first.",
  introMobile: "Where I've worked, newest first.",
};

// Company names, cities, dates, summaries and commits are placeholders. TODO: real data
export const experience: TimelineEntry[] = [
  {
    title: "Junior Full-Stack Developer",
    dates: "Jan 2025 – Present",
    place: "Company name · City, Country · Full-time",
    placeMobile: "Company name · City, Country",
    summaryMobile:
      "Internal tools and client web apps with Next.js, NestJS and PostgreSQL. Leading the role-based booking system.",
    summary:
      "Building internal tools and client web apps with Next.js, NestJS and PostgreSQL. Leading the role-based booking system from database design to deployment.",
    hash: "a3f9c21",
    commit: "feat: role-based dispatch board",
  },
  {
    title: "Full-Stack Developer Intern",
    dates: "Jun 2024 – Dec 2024",
    place: "Company name · City, Country · Internship",
    placeMobile: "Company name · City, Country",
    summaryMobile: "REST APIs and admin dashboards. Set up nightly database backups to Cloudflare R2.",
    summary:
      "Worked on REST APIs and admin dashboards. Set up nightly database backups to Cloudflare R2 for the team's servers.",
    hash: "7be04d2",
    commit: "chore: nightly backups to R2",
  },
  {
    title: "Freelance Web Developer",
    dates: "2023 – 2024",
    place: "Self-employed · Remote",
    summaryMobile: "Small business websites, with hosting, DNS and basic SEO for each client.",
    summary:
      "Built and launched small business websites. Handled hosting, DNS and basic SEO for each client.",
    hash: "19c5e80",
    commit: "release: first client site live",
  },
];

export const cvCard = {
  title: "The full picture",
  text: "My CV has every role, project and course in one place, on two pages.",
  textMobile: "Every role, project and course on two pages.",
  action: "Download CV (PDF)",
};
