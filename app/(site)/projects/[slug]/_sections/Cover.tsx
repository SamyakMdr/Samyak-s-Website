import Image from "next/image";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";

// 1120 × 600 on desktop, 350 × 200 on mobile.
export function Cover({ project, className }: { project: Project; className?: string }) {
  return (
    <div
      className={cn(
        "relative h-50 overflow-hidden rounded-win border border-line tablet:aspect-1120/600 tablet:h-auto tablet:rounded-xl",
        className,
      )}
    >
      <Image
        src={project.cover}
        alt={project.coverAlt}
        fill
        preload
        sizes="(min-width: 1200px) 1120px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)"
        className="object-cover"
      />
    </div>
  );
}
