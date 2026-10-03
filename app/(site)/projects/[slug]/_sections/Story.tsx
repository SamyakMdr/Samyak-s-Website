import { room } from "@/content/site";
import type { ProjectRoom } from "@/content/types";

export function Story({ story }: { story: ProjectRoom["story"] }) {
  return (
    <section aria-labelledby="room-story" className="flex flex-col gap-9 tablet:flex-row tablet:gap-10">
      <h2 id="room-story" className="sr-only">
        {room.story}
      </h2>
      {story.map((part) => (
        <div key={part.title} className="flex min-w-0 flex-1 flex-col gap-2 tablet:gap-2.5">
          <h3 className="t-h3 text-fg">{part.title}</h3>
          <p className="t-body text-dim">
            {part.bodyMobile ? (
              <>
                <span className="max-tablet:hidden">{part.body}</span>
                <span className="tablet:hidden">{part.bodyMobile}</span>
              </>
            ) : (
              part.body
            )}
          </p>
        </div>
      ))}
    </section>
  );
}
