"use client";

import { useEffect, useState, type ReactNode } from "react";

// False until the first page has mounted in this tab.
let navigated = false;

// Remounted on every navigation, so each page dissolves in (250ms). The first
// load is left alone: content that starts transparent would paint late.
export default function SiteTemplate({ children }: { children: ReactNode }) {
  const [dissolve] = useState(() => navigated);

  useEffect(() => {
    navigated = true;
  }, []);

  return <div className={dissolve ? "animate-page-in" : undefined}>{children}</div>;
}
