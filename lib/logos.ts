const available = new Set((process.env.NEXT_PUBLIC_LOGOS ?? "").split(",").filter(Boolean));

/** True when public/logos/<slug>.svg exists (see next.config.ts). */
export function hasLogo(slug: string): boolean {
  return available.has(slug);
}
