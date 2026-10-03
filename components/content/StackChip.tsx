import { TechLogo } from "@/components/ui/TechLogo";
import type { TechName } from "@/content/tech";
import { cn } from "@/lib/cn";

type StackChipProps = { tech: TechName; className?: string; "aria-hidden"?: boolean };

export function StackChip({ tech, className, "aria-hidden": ariaHidden }: StackChipProps) {
  return (
    <span
      aria-hidden={ariaHidden}
      className={cn(
        "inline-flex shrink-0 items-center gap-2.5 rounded-md border border-line bg-panel-2 py-1.5 pr-3.5 pl-1.5",
        className,
      )}
    >
      <TechLogo name={tech} size={32} />
      <span className="t-strong whitespace-nowrap text-fg">{tech}</span>
    </span>
  );
}
