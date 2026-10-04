import { GlobeIcon, LocationIcon, MailIcon, PhoneIcon } from "@/components/icons";
import type { ContactDetail } from "@/content/contact";
import { cn } from "@/lib/cn";

const ICONS = {
  mail: MailIcon,
  phone: PhoneIcon,
  location: LocationIcon,
  website: GlobeIcon,
} as const;

export function ContactRow({
  detail,
  className,
}: {
  detail: ContactDetail;
  className?: string;
}) {
  const Icon = ICONS[detail.icon];
  // The row is as tall as the tile (40px); the two text lines overhang it evenly.
  const row = cn("flex h-10 items-center gap-3.5", className);
  const content = (
    <>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-btn border border-line bg-panel-2 text-fg transition-colors duration-(--dur-ui) ease-ui group-hover:border-blue-t group-hover:text-blue-t group-active:border-blue-t group-active:text-blue-t">
        <Icon size={18} />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5 leading-normal">
        <span className="t-caption text-dim">{detail.label}</span>
        <span className="t-strong text-fg transition-colors duration-(--dur-ui) ease-ui group-hover:text-blue-t group-active:text-blue-t">
          {detail.value}
        </span>
      </span>
    </>
  );

  // The tile and the value are one link, so they light up together.
  return detail.href ? (
    <a
      href={detail.href}
      target={detail.external ? "_blank" : undefined}
      rel={detail.external ? "noopener noreferrer" : undefined}
      className={cn(row, "group rounded-btn")}
    >
      {content}
    </a>
  ) : (
    <div className={row}>{content}</div>
  );
}
