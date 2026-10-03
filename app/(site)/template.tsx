import type { ReactNode } from "react";

// Remounted on every navigation, so each page dissolves in (250ms).
export default function SiteTemplate({ children }: { children: ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
