import type { Tone } from "./types";

export const servicesSection = {
  id: "services",
  title: "How I can help",
  branch: "services",
  tone: "blue" satisfies Tone as Tone,
  intro: "If one of these sounds like your project, I'd be glad to talk.",
};

export interface Service {
  title: string;
  text: string;
  /** Shorter text on mobile cards. */
  textMobile: string;
  icon: "web" | "api" | "server";
  accent: "blue" | "green" | "violet";
}

export const services: Service[] = [
  {
    title: "Web apps and websites",
    text: "From a single landing page to a full dashboard, built responsive and quick to load.",
    textMobile: "From a landing page to a full dashboard, responsive and quick to load.",
    icon: "web",
    accent: "blue",
  },
  {
    title: "APIs and backends",
    text: "REST APIs with sign-in, roles and a well-structured PostgreSQL database.",
    textMobile: "REST APIs with sign-in, roles and a well-structured PostgreSQL database.",
    icon: "api",
    accent: "green",
  },
  {
    title: "Deployment and upkeep",
    text: "Server setup, domains, SSL and automatic backups so the site keeps running.",
    textMobile: "Server setup, domains, SSL and automatic backups.",
    icon: "server",
    accent: "violet",
  },
];
