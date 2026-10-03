// Brand logo slots (doc/assets.md §3). Until the official SVG is added at
// public/logos/<slug>.svg, <TechLogo> shows the monogram on the tile colour.
// A dark mark can add public/logos/<slug>-dark.svg, shown on dark surfaces.
export interface Tech {
  slug: string;
  monogram: string;
  tile: string;
  ink: string;
}

export const tech = {
  TypeScript: { slug: "typescript", monogram: "TS", tile: "#3178C6", ink: "#FFFFFF" },
  JavaScript: { slug: "javascript", monogram: "JS", tile: "#F7DF1E", ink: "#1B1B1B" },
  React: { slug: "react", monogram: "Re", tile: "#149ECA", ink: "#FFFFFF" },
  "Next.js": { slug: "nextjs", monogram: "N", tile: "#111111", ink: "#FFFFFF" },
  NestJS: { slug: "nestjs", monogram: "Ne", tile: "#E0234E", ink: "#FFFFFF" },
  "Node.js": { slug: "nodejs", monogram: "No", tile: "#5FA04E", ink: "#FFFFFF" },
  PostgreSQL: { slug: "postgresql", monogram: "Pg", tile: "#4169E1", ink: "#FFFFFF" },
  TypeORM: { slug: "typeorm", monogram: "Or", tile: "#FE0803", ink: "#FFFFFF" },
  Prisma: { slug: "prisma", monogram: "Pr", tile: "#2D3748", ink: "#FFFFFF" },
  "Tailwind CSS": { slug: "tailwindcss", monogram: "Tw", tile: "#06B6D4", ink: "#FFFFFF" },
  Docker: { slug: "docker", monogram: "Dk", tile: "#2496ED", ink: "#FFFFFF" },
  Ubuntu: { slug: "ubuntu", monogram: "Ub", tile: "#E95420", ink: "#FFFFFF" },
  Git: { slug: "git", monogram: "Gi", tile: "#F05032", ink: "#FFFFFF" },
  GitHub: { slug: "github", monogram: "GH", tile: "#181717", ink: "#FFFFFF" },
  Figma: { slug: "figma", monogram: "Fi", tile: "#F24E1E", ink: "#FFFFFF" },
  Python: { slug: "python", monogram: "Py", tile: "#3776AB", ink: "#FFD43B" },
  FastAPI: { slug: "fastapi", monogram: "Fa", tile: "#009688", ink: "#FFFFFF" },
  Cloudflare: { slug: "cloudflare", monogram: "Cf", tile: "#F38020", ink: "#FFFFFF" },
  Nginx: { slug: "nginx", monogram: "Nx", tile: "#009639", ink: "#FFFFFF" },
  Redis: { slug: "redis", monogram: "Rd", tile: "#DC382D", ink: "#FFFFFF" },
  "React Native": { slug: "reactnative", monogram: "RN", tile: "#149ECA", ink: "#FFFFFF" },
  NativeWind: { slug: "nativewind", monogram: "Nw", tile: "#111111", ink: "#FFFFFF" },
  "Material UI": { slug: "materialui", monogram: "Mu", tile: "#007FFF", ink: "#FFFFFF" },
  Bootstrap: { slug: "bootstrap", monogram: "B", tile: "#7952B3", ink: "#FFFFFF" },
  PHP: { slug: "php", monogram: "Ph", tile: "#777BB4", ink: "#FFFFFF" },
  MySQL: { slug: "mysql", monogram: "My", tile: "#4479A1", ink: "#FFFFFF" },
  MongoDB: { slug: "mongodb", monogram: "Mg", tile: "#47A248", ink: "#FFFFFF" },
  GitLab: { slug: "gitlab", monogram: "GL", tile: "#FC6D26", ink: "#FFFFFF" },
  Linux: { slug: "linux", monogram: "Lx", tile: "#FCC624", ink: "#1B1B1B" },
  LinkedIn: { slug: "linkedin", monogram: "in", tile: "#0A66C2", ink: "#FFFFFF" },
  X: { slug: "x", monogram: "X", tile: "#000000", ink: "#FFFFFF" },
  Instagram: { slug: "instagram", monogram: "Ig", tile: "#E4405F", ink: "#FFFFFF" },
  WhatsApp: { slug: "whatsapp", monogram: "Wa", tile: "#25D366", ink: "#FFFFFF" },
} as const satisfies Record<string, Tech>;

export type TechName = keyof typeof tech;

// Stack slider rows (doc/pages-and-layout.md → Stack slider). The mobile frame
// shows six chips per row; its second row is in a different order.
export const stackRows: { forward: TechName[]; backward: TechName[] } = {
  forward: [
    "TypeScript", "React", "Next.js", "NestJS", "Node.js", "PostgreSQL",
    "Prisma", "Tailwind CSS", "Docker", "Git", "GitHub", "Linux",
  ],
  backward: [
    "Python", "FastAPI", "Redis", "TypeORM", "Nginx", "Cloudflare",
    "Figma", "JavaScript", "Docker", "PostgreSQL", "Next.js", "NestJS",
  ],
};

export const stackRowsMobile: { forward: TechName[]; backward: TechName[] } = {
  forward: ["TypeScript", "React", "Next.js", "NestJS", "Node.js", "PostgreSQL"],
  backward: ["Python", "FastAPI", "Redis", "Docker", "Cloudflare", "Figma"],
};
