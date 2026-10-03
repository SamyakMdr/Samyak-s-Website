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
    title: "Frontend and mobile",
    description: "Interfaces that load fast and work on any screen size.",
    tools: [
      "React", "Next.js", "React Native", "TypeScript", "JavaScript",
      "Tailwind CSS", "NativeWind", "Material UI", "Bootstrap", "Figma",
    ],
  },
  {
    title: "Backend",
    description: "APIs with clear rules for who can do what.",
    tools: ["Node.js", "Python", "FastAPI", "PHP"],
  },
  {
    title: "Databases",
    description: "Data models, migrations and queries that stay quick.",
    tools: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "TypeORM"],
  },
  {
    title: "DevOps and tools",
    description: "Servers, deployments and backups I can rely on.",
    tools: ["Docker", "Nginx", "Linux", "Cloudflare", "Git", "GitHub", "GitLab"],
  },
];
