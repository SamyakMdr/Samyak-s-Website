"use client";

import dynamic from "next/dynamic";
import { TerminalOutputSkeleton } from "@/components/ui/LoadingSkeletons";

// Output only exists after a command has run, so its code (and the animation
// library it uses) is fetched when a prompt is first focused.
export const loadOutput = () => import("./TerminalOutput").then((module) => module.TerminalOutput);
export const TerminalOutput = dynamic(loadOutput, {
  ssr: false,
  loading: TerminalOutputSkeleton,
});
