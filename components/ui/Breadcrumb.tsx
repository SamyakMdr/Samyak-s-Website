import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { a11y } from "@/content/site";
import { cn } from "@/lib/cn";

export type Crumb = {
  label: ReactNode;
  /** Omit for the current page (last item). */
  href?: string;
};

// Path-style breadcrumb: `~/ home / projects`. Links take the blue text colour,
// the current page the main one. Mono/Label on desktop, Mono/Small on mobile.
export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label={a11y.breadcrumb} className={cn("min-w-0", className)}>
      <ol className="flex items-start gap-1.5 whitespace-nowrap tablet:gap-2 tablet:t-mono-label max-tablet:t-mono-sm">
        <li aria-hidden="true" className="text-dim">
          ~/
        </li>
        {items.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && (
              <li aria-hidden="true" className="text-dim">
                /
              </li>
            )}
            <li>
              {item.href ? (
                <Link href={item.href} className="rounded-xs text-blue-t hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-fg">
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
