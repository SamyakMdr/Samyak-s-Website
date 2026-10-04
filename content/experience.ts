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
    dates: "July 2026 – Present",
    place:
      "Mountain Helicopters Nepal Pvt. Ltd. · Pepsicola, Kathmandu, Nepal · Full-time",
    placeMobile:
      "Mountain Helicopters Nepal Pvt. Ltd. · Pepsicola, Kathmandu, Nepal",
    summaryMobile:
      "Internal tools and client web apps with Next.js, NestJS and PostgreSQL. Leading the role-based booking system and CMS Website.",
    summary:
      "Building internal tools and client web apps with Next.js, NestJS and PostgreSQL. Leading the role-based booking system from database design to deployment.",
    hash: "a3f9c21",
    commit: "feat: Role-based dispatch System and CMS Website",
  },
  {
    title: "Front End Developer Trainee",
    dates: "Feb 2026 – August 2026",
    place: "Rewa Soft Pvt. Ltd. · Lumbini Marg, Kathmandu, Nepal · Internship",
    placeMobile: "Rewa Soft Pvt. Ltd. · Lumbini Marg, Kathmandu, Nepal",
    summaryMobile: "Frontend development, REST APIs and CMS Dashboards.",
    summary: "Frontend development, REST APIs and CMS Dashboards.",
    hash: "7be04d2",
    commit: "chore: Frontend Development, REST APIs, CMS Dashboards and CRM.",
  },
];

export const cvCard = {
  title: "The full picture",
  text: "My CV has every role, project and course in one place, on two pages.",
  textMobile: "Every role, project and course on two pages.",
  action: "Download CV (PDF)",
};
