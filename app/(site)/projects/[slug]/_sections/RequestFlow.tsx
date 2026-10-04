import { Fragment } from "react";
import { room } from "@/content/site";
import type { ProjectRoom } from "@/content/types";
import { cn } from "@/lib/cn";

type Flow = ProjectRoom["flow"];

// Geometry of the 1080 × 220 Figma diagram: three 280 × 120 boxes at x = 10,
// 400 and 790, joined by 110px connectors that start at x = 290 and 680.
const BOX_LEFT = ["left-2.5", "left-100", "left-197.5"] as const;
const LINK_LEFT = ["left-72.5", "left-170"] as const;

// Each packet rests where Figma draws it. With motion allowed it runs along
// its connector instead: the request goes out left to right, then the
// response comes back, one leg at a time (see "Project room" in globals.css).
const PACKETS = [
  {
    out: "translate-x-8.75",
    outDelay: "[animation-delay:0ms]",
    back: "translate-x-16.25",
    backDelay: "[animation-delay:2400ms]",
  },
  {
    out: "translate-x-13.75",
    outDelay: "[animation-delay:800ms]",
    back: "translate-x-8.75",
    backDelay: "[animation-delay:1600ms]",
  },
] as const;

const LINE = "absolute inset-x-0 h-[1.5px] bg-dim";
const LABEL =
  "t-caption absolute inset-x-0 text-center whitespace-nowrap text-dim";
const PACKET = "absolute left-0 size-2.5 rounded-full";

function Diagram({ flow }: { flow: Flow }) {
  return (
    <div className="relative h-55 w-270 max-desktop:hidden">
      {flow.nodes.map((node, index) => (
        <div
          key={node.title}
          className={cn(
            // Centred, so a one-line title and caption sit where Figma draws them
            // and longer copy wraps inside the box instead of running out of it.
            "absolute top-12.5 flex h-30 w-70 flex-col justify-center gap-1.75 rounded-win border-[1.5px] border-line bg-panel-2 px-5.75",
            BOX_LEFT[index],
          )}
        >
          <h4 className="t-h4 text-fg">{node.title}</h4>
          <p className="t-caption text-pretty text-dim">{node.text}</p>
        </div>
      ))}

      {LINK_LEFT.map((left, index) => {
        const packet = PACKETS[index]!;
        return (
          <div key={left} className={cn("absolute top-0 h-full w-27.5", left)}>
            <span className={cn(LABEL, "top-18")}>
              {flow.labels.request[index]}
            </span>
            <span aria-hidden="true" className={cn(LINE, "top-[95.25px]")} />
            <span
              aria-hidden="true"
              className={cn(
                PACKET,
                "room-packet-out top-[91px] bg-blue",
                packet.out,
                packet.outDelay,
              )}
            />
            <span aria-hidden="true" className={cn(LINE, "top-[125.25px]")} />
            <span
              aria-hidden="true"
              className={cn(
                PACKET,
                "room-packet-back top-[121px] bg-green",
                packet.back,
                packet.backDelay,
              )}
            />
            <span className={cn(LABEL, "top-34.5")}>
              {flow.labels.response[index]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// Mobile and tablet: the boxes stack and only the request labels are shown.
function Stack({ flow }: { flow: Flow }) {
  return (
    <ol className="flex flex-col gap-2.5 desktop:hidden">
      {flow.nodes.map((node, index) => (
        <Fragment key={node.title}>
          {index > 0 && (
            <li className="t-mono-sm text-center whitespace-pre text-blue-t">{`${flow.labels.request[index - 1]}  ↓`}</li>
          )}
          <li className="flex flex-col gap-0.5 rounded-btn border border-line bg-panel-2 px-3.5 py-3">
            <h4 className="t-h4 text-fg">{node.title}</h4>
            <p className="t-caption text-dim">{node.text}</p>
          </li>
        </Fragment>
      ))}
    </ol>
  );
}

export function RequestFlow({ flow }: { flow: Flow }) {
  return (
    <section
      aria-labelledby="room-flow"
      className="flex flex-col gap-2.5 rounded-win border border-line bg-panel p-4.5 desktop:gap-1.5"
    >
      <h3 id="room-flow" className="t-h4 text-fg">
        {room.flow}
      </h3>
      <p className="t-body-sm text-dim max-tablet:hidden">{flow.description}</p>
      <Diagram flow={flow} />
      <Stack flow={flow} />
    </section>
  );
}
