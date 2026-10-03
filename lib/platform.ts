"use client";

import { useSyncExternalStore } from "react";

const subscribeNever = () => () => {};
const isApple = () => /Mac|iPhone|iPad/.test(navigator.platform);

/** True on Apple keyboards, where the shortcut is ⌘ K instead of Ctrl K. */
export function useIsApple(): boolean {
  return useSyncExternalStore(subscribeNever, isApple, () => false);
}

/** False during server render and hydration, true afterwards. */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}
