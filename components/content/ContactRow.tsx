import { GlobeIcon, LocationIcon, MailIcon, PhoneIcon } from "@/components/icons";
import type { ContactDetail } from "@/content/contact";
import { cn } from "@/lib/cn";

const ICONS = {
  mail: MailIcon,
  phone: PhoneIcon,
  location: LocationIcon,
  website: GlobeIcon,
} as const;

export function ContactRow({ detail, className }: { detail: ContactDetail; className?: string }) {
  const Icon = ICONS[detail.icon];
  const value = <span className="t-strong text-fg">{detail.value}</span>;

  return (
    // The row is as tall as the tile (40px); the two text lines overhang it evenly.
    <div className={cn("flex h-10 items-center gap-3.5", className)}>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-btn border border-line bg-panel-2 text-fg">
        <Icon size={18} />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5 leading-normal">
        <span className="t-caption text-dim">{detail.label}</span>
        {detail.href ? (
          <a href={detail.href} className="rounded-xs hover:text-blue-t">
            {value}
          </a>
        ) : (
          value
        )}
      </span>
    </div>
  );
}
