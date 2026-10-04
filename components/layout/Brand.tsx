import Link from "next/link";
import { a11y, site } from "@/content/site";
import { cn } from "@/lib/cn";

/** `samyak@dev` wordmark; the @ takes the green text colour. */
export function Brand({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={a11y.home(`${site.brand.user}@${site.brand.host}`)}
      className={cn("t-h3 shrink-0 rounded-xs text-fg", className)}
    >
      {site.brand.user}
      <span className="text-green-t">@</span>
      {site.brand.host}
    </Link>
  );
}
