import Link from "next/link";
import { footer, site } from "@/content/site";
import { cn } from "@/lib/cn";
// import { BackToTopLink } from "./BackToTopLink";

function FooterLink({ href, label }: { href: string; label: string }) {
  const className =
    "t-body-sm rounded-xs text-dim transition-colors duration-(--dur-ui) hover:text-fg";
  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {label}
    </Link>
  ) : (
    <a href={href} className={className}>
      {label}
    </a>
  );
}

export function Footer() {
  return (
    // Mobile is a single column with a 24px gap throughout.
    <footer className="page-x flex flex-col gap-6 border-t border-line pt-10 pb-24 tablet:gap-10 tablet:pt-16 tablet:pb-10">
      <div className="flex flex-col gap-6 tablet:flex-row tablet:gap-16">
        <div className="flex flex-col gap-6 tablet:flex-1 tablet:gap-2.5">
          <p className="t-h2 text-fg max-tablet:t-m-display">
            {site.brand.user}
            <span className="text-green-t">@</span>
            {site.brand.host}
          </p>
          <p className="t-body-sm max-w-80 text-dim max-tablet:hidden">
            {footer.description}
          </p>
          <p className="t-body-sm text-dim tablet:hidden">
            {footer.descriptionMobile}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 tablet:flex tablet:gap-16">
          {footer.columns.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className={cn(
                "flex flex-col gap-2.5",
                "desktopOnly" in column &&
                  column.desktopOnly &&
                  "max-tablet:hidden",
              )}
            >
              <h2 className="t-h4 text-fg">{column.title}</h2>
              {column.links.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </nav>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="t-caption text-dim">{footer.copyright}</p>
        {/* <BackToTopLink label={footer.backToTop} className="max-tablet:hidden" /> */}
      </div>
    </footer>
  );
}
