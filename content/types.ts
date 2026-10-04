import type { TechName } from "./tech";

export type Tone = "blue" | "green" | "violet" | "cyan" | "pink";
export type ProjectType = "web" | "backend" | "devops" | "ai" | "mobile" | "ui";

export interface RoomFact {
  label: string;
  value: string;
  /** Shorter value used on the mobile facts card. */
  valueMobile?: string;
}

export interface RoomScreen {
  src: string;
  alt: string;
  caption: string;
  /** Shorter caption under the mobile swipe gallery. */
  captionMobile?: string;
  /** Extra slide that only the mobile swipe gallery shows. */
  mobileOnly?: boolean;
}

export interface RoomFlowNode {
  title: string;
  /** One caption line, as drawn in the Figma diagram. */
  text: string;
}

export interface ProjectRoom {
  lead: string;
  facts: RoomFact[];
  stack: TechName[];
  /** `bodyMobile` is the shorter copy in the Mobile / Project room frame. */
  story: { title: string; body: string; bodyMobile?: string }[];
  screens: RoomScreen[];
  flow: {
    description: string;
    nodes: [RoomFlowNode, RoomFlowNode, RoomFlowNode];
    /** Request labels left to right, then response labels right to left. */
    labels: { request: [string, string]; response: [string, string] };
  };
  outcome: {
    stats: { value: string; label: string; labelMobile?: string }[];
    note: string;
    noteMobile?: string;
  };
}

export interface Project {
  slug: string;
  /** Short name accepted by `/open <name>`. */
  alias: string;
  title: string;
  summary: string;
  /** Shorter summary used on mobile cards where Figma defines one. */
  summaryMobile?: string;
  /** Shown on the cover pill. */
  category: string;
  /** Used by filters and `/projects --type`. */
  type: ProjectType;
  year: number;
  /** No longer read: the branch tag takes `color`. Accepted so older entries still type-check. */
  tone?: string;
  branch: string;
  /** CSS colour for the graph, branch tag, hover border and glow: a --p-* token from globals.css. */
  color: string;
  /** The first three are shown as logos on cards. */
  stack: TechName[];
  cover: string;
  coverAlt: string;
  command: string;
  /** Shown on Home (6). */
  featured?: boolean;
  /** Short label on the commit graph. */
  graphLabel?: string;
  /** `github` is left out when the repository is private. */
  links: { demo: string; github?: string };
  room?: ProjectRoom;
}
