// Brand logo slots (doc/assets.md §3). <TechLogo> shows the official SVG when
// `logo` is set, and the monogram on the tile colour otherwise.
export interface Tech {
  slug: string;
  monogram: string;
  tile: string;
  ink: string;
  /** public/logos/<slug>.svg exists, or <slug>.png for a mark only published as an image. */
  logo?: boolean | "png";
  /** public/logos/<slug>-dark.svg also exists: the drawing for dark surfaces, for marks whose colour only suits one theme. */
  darkLogo?: boolean;
}

export const tech = {
  TypeScript: { slug: "typescript", monogram: "TS", tile: "#3178C6", ink: "#FFFFFF", logo: true },
  JavaScript: { slug: "javascript", monogram: "JS", tile: "#F7DF1E", ink: "#1B1B1B", logo: true },
  React: { slug: "react", monogram: "Re", tile: "#149ECA", ink: "#FFFFFF", logo: true, darkLogo: true },
  "Next.js": { slug: "nextjs", monogram: "N", tile: "#111111", ink: "#FFFFFF", logo: true, darkLogo: true },
  NestJS: { slug: "nestjs", monogram: "Ne", tile: "#E0234E", ink: "#FFFFFF", logo: true },
  "Node.js": { slug: "nodejs", monogram: "No", tile: "#5FA04E", ink: "#FFFFFF", logo: true },
  PostgreSQL: { slug: "postgresql", monogram: "Pg", tile: "#4169E1", ink: "#FFFFFF", logo: true },
  TypeORM: { slug: "typeorm", monogram: "Or", tile: "#FE0803", ink: "#FFFFFF", logo: true },
  Prisma: { slug: "prisma", monogram: "Pr", tile: "#2D3748", ink: "#FFFFFF", logo: true, darkLogo: true },
  "Tailwind CSS": { slug: "tailwindcss", monogram: "Tw", tile: "#06B6D4", ink: "#FFFFFF", logo: true },
  Docker: { slug: "docker", monogram: "Dk", tile: "#2496ED", ink: "#FFFFFF", logo: true },
  Ubuntu: { slug: "ubuntu", monogram: "Ub", tile: "#E95420", ink: "#FFFFFF", logo: true },
  Git: { slug: "git", monogram: "Gi", tile: "#F05032", ink: "#FFFFFF", logo: true },
  GitHub: { slug: "github", monogram: "GH", tile: "#181717", ink: "#FFFFFF", logo: true, darkLogo: true },
  Figma: { slug: "figma", monogram: "Fi", tile: "#F24E1E", ink: "#FFFFFF", logo: true },
  Python: { slug: "python", monogram: "Py", tile: "#3776AB", ink: "#FFD43B", logo: true },
  FastAPI: { slug: "fastapi", monogram: "Fa", tile: "#009688", ink: "#FFFFFF", logo: true },
  Cloudflare: { slug: "cloudflare", monogram: "Cf", tile: "#F38020", ink: "#FFFFFF", logo: true },
  Nginx: { slug: "nginx", monogram: "Nx", tile: "#009639", ink: "#FFFFFF", logo: true },
  Redis: { slug: "redis", monogram: "Rd", tile: "#DC382D", ink: "#FFFFFF", logo: true },
  "React Native": { slug: "reactnative", monogram: "RN", tile: "#149ECA", ink: "#FFFFFF", logo: true, darkLogo: true },
  NativeWind: { slug: "nativewind", monogram: "Nw", tile: "#111111", ink: "#FFFFFF", logo: true },
  "Material UI": { slug: "materialui", monogram: "Mu", tile: "#007FFF", ink: "#FFFFFF", logo: true },
  Bootstrap: { slug: "bootstrap", monogram: "B", tile: "#7952B3", ink: "#FFFFFF", logo: true },
  TanStack: { slug: "tanstack", monogram: "Tk", tile: "#111111", ink: "#FFFFFF", logo: "png" },
  jQuery: { slug: "jquery", monogram: "jQ", tile: "#0769AD", ink: "#FFFFFF", logo: true },
  Vite: { slug: "vite", monogram: "Vi", tile: "#646CFF", ink: "#FFFFFF", logo: true },
  "Redux Toolkit": { slug: "redux-toolkit", monogram: "Rx", tile: "#764ABC", ink: "#FFFFFF", logo: true },
  pgvector: { slug: "pgvector", monogram: "pv", tile: "#4169E1", ink: "#FFFFFF" },
  Ollama: { slug: "ollama", monogram: "Ol", tile: "#111111", ink: "#FFFFFF" },
  Whisper: { slug: "whisper", monogram: "Wh", tile: "#10A37F", ink: "#FFFFFF" },
  HTML: { slug: "html", monogram: "H5", tile: "#E34F26", ink: "#FFFFFF" },
  Laravel: { slug: "laravel", monogram: "La", tile: "#FF2D20", ink: "#FFFFFF" },
  CSS: { slug: "css", monogram: "C3", tile: "#1572B6", ink: "#FFFFFF" },
  PokeAPI: { slug: "pokeapi", monogram: "Pk", tile: "#EF5350", ink: "#FFFFFF" },
  PHP: { slug: "php", monogram: "Ph", tile: "#777BB4", ink: "#FFFFFF", logo: true },
  MySQL: { slug: "mysql", monogram: "My", tile: "#4479A1", ink: "#FFFFFF", logo: true, darkLogo: true },
  MongoDB: { slug: "mongodb", monogram: "Mg", tile: "#47A248", ink: "#FFFFFF", logo: true },
  GitLab: { slug: "gitlab", monogram: "GL", tile: "#FC6D26", ink: "#FFFFFF", logo: true },
  Linux: { slug: "linux", monogram: "Lx", tile: "#FCC624", ink: "#1B1B1B", logo: true },
  Facebook: { slug: "facebook", monogram: "f", tile: "#0866FF", ink: "#FFFFFF" },
  LinkedIn: { slug: "linkedin", monogram: "in", tile: "#0A66C2", ink: "#FFFFFF", logo: true },
  X: { slug: "x", monogram: "X", tile: "#000000", ink: "#FFFFFF", logo: true, darkLogo: true },
  Instagram: { slug: "instagram", monogram: "Ig", tile: "#E4405F", ink: "#FFFFFF", logo: true },
  // Only a one-colour mark (public/logos/mono), used by the social row.
  Behance: { slug: "behance", monogram: "Be", tile: "#1769FF", ink: "#FFFFFF" },
  WhatsApp: { slug: "whatsapp", monogram: "Wa", tile: "#25D366", ink: "#FFFFFF", logo: true },
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
