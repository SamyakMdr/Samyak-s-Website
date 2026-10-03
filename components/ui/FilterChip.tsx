import { cn } from "@/lib/cn";

type FilterChipProps = {
  label: string;
  count: number;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

export function FilterChip({ label, count, selected = false, onClick, className }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 whitespace-nowrap",
        "transition-[background-color,border-color,color] duration-(--dur-ui) ease-ui",
        selected
          ? "border-fg bg-fg text-bg"
          : "border-line bg-panel text-fg hover:bg-panel-hover",
        className,
      )}
    >
      <span className="t-btn-sm">{label}</span>
      <span className={cn("t-mono-sm", selected ? "text-bg" : "text-dim")}>{count}</span>
    </button>
  );
}
