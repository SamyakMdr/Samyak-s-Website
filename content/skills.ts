import type { TechName } from "./tech";
import type { Tone } from "./types";

export const skillsSection = {
  id: "skills",
  title: "Skills",
  branch: "skills",
  tone: "violet" satisfies Tone as Tone,
  intro: "The tools I reach for most, grouped by where they sit in a project.",
  introMobile: "The tools I reach for most.",
};

export interface SkillGroup {
  title: string;
  description: string;
  tools: TechName[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Interfaces that load fast and work on any screen size.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "Figma"],
  },
  {
    title: "Backend",
    description: "APIs with clear rules for who can do what.",
    tools: ["NestJS", "Node.js", "FastAPI", "Python"],
  },
  {
    title: "Databases",
    description: "Data models, migrations and queries that stay quick.",
    tools: ["PostgreSQL", "Prisma", "TypeORM", "Redis"],
  },
  {
    title: "DevOps and tools",
    description: "Servers, deployments and backups I can rely on.",
    tools: ["Docker", "Ubuntu", "Nginx", "Cloudflare", "Git", "GitHub"],
  },
];
