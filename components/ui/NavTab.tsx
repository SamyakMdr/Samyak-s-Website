import Link from "next/link";
import { GitBranchIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

type NavTabProps = {
  label: string;
  href: string;
  active?: boolean;
  className?: string;
};

export function NavTab({ label, href, active = false, className }: NavTabProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "t-mono-label inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 whitespace-nowrap",
        "transition-[background-color,border-color,color] duration-(--dur-ui) ease-ui",
        active
          ? "border-blue bg-blue/12 text-fg"
          : "border-transparent text-dim hover:text-fg",
        className,
      )}
    >
      <GitBranchIcon size={14} />
      {label}
    </Link>
  );
}
