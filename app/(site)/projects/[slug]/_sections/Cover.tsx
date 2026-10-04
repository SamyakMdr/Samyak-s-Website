import Image from "next/image";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";

// 16:9 at every width, the shape of a 1920 × 1080 screenshot: 1120 × 630 on
// desktop, about 350 × 197 on mobile.
export function Cover({ project, className }: { project: Project; className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-win border border-line tablet:rounded-xl",
        className,
      )}
    >
      <Image
        src={project.cover}
        alt={project.coverAlt}
        fill
        preload
        fetchPriority="high"
        sizes="(min-width: 1200px) 1120px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)"
        className="object-cover"
      />
    </div>
  );
}
