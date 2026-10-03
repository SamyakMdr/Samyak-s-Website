// Finds where the visitor was before entering the project rooms, so Close and Esc
// can put them back there (prototype link map: Room · Close → Back).
const ROOM = /^\/projects\/[^/]+$/;

/** The tab's history, in browsers that have the Navigation API. */
function tabHistory(): Navigation | undefined {
  // Typed as always present, but older browsers do not have it.
  return (window as { navigation?: Navigation }).navigation;
}

/**
 * The key of the nearest earlier history entry that is not a room, skipping any
 * rooms browsed with Previous / Next. Null when there is none (the room was
 * opened directly) or the browser cannot tell.
 */
export function roomOrigin(): string | null {
  const history = tabHistory();
  const current = history?.currentEntry;
  if (!history || !current) return null;
  const entries = history.entries();
  for (let index = current.index - 1; index >= 0; index--) {
    const entry = entries[index];
    if (!entry?.url) return null;
    if (!ROOM.test(new URL(entry.url).pathname)) return entry.key;
  }
  return null;
}

/** Steps back to that entry, which also restores its scroll position. */
export function returnTo(key: string): void {
  tabHistory()?.traverseTo(key);
}
