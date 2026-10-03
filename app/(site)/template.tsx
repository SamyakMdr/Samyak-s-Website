"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

// False until the first page has mounted in this tab.
let navigated = false;

// Every navigation dissolves the new page in (250ms). The first load is left
// alone: content that starts transparent would paint late. The key covers moves
// that keep this template mounted (the project list to a room, room to room).
export default function SiteTemplate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mount] = useState(() => ({ afterNavigation: navigated, pathname }));
  const dissolve = mount.afterNavigation || pathname !== mount.pathname;

  useEffect(() => {
    navigated = true;
  }, []);

  return (
    <div key={pathname} className={dissolve ? "animate-page-in" : undefined}>
      {children}
    </div>
  );
}
