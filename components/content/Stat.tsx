import { cn } from "@/lib/cn";

export function Stat({ value, label, className }: { value: string; label: string; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="t-stat text-fg">{value}</span>
      <span className="t-body-sm text-dim">{label}</span>
    </div>
  );
}
