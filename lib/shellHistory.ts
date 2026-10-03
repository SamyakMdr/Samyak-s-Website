// Commands typed this session, shared by every terminal on the page: ↑ recalls
// them and `history` prints them. Kept in sessionStorage (doc/interactions.md §1.2).

const HISTORY_KEY = "terminal-history";
const HISTORY_LIMIT = 50;

// Storage can be unavailable (private mode); the list then lasts until a reload.
let memory: string[] | null = null;

export function readHistory(): string[] {
  if (memory) return memory;
  try {
    const stored: unknown = JSON.parse(window.sessionStorage.getItem(HISTORY_KEY) ?? "[]");
    memory = Array.isArray(stored) ? stored.filter((item) => typeof item === "string") : [];
  } catch {
    memory = [];
  }
  return memory;
}

/** Adds a command as the newest entry; a repeat moves up instead of doubling. */
export function recordHistory(command: string): void {
  memory = [...readHistory().filter((item) => item !== command), command].slice(-HISTORY_LIMIT);
  try {
    window.sessionStorage.setItem(HISTORY_KEY, JSON.stringify(memory));
  } catch {
    // History is a convenience; ignore storage failures.
  }
}
