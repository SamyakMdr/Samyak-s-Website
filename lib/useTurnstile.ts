"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
// Long enough to solve a visible challenge, short enough not to hang forever.
const TIMEOUT = 120_000;

interface TurnstileOptions {
  sitekey: string;
  action?: string;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "flexible" | "compact";
  appearance?: "always" | "execute" | "interaction-only";
  execution?: "render" | "execute";
  callback?: (token: string) => void;
  "error-callback"?: (code: string) => boolean | void;
  "expired-callback"?: () => void;
  "timeout-callback"?: () => void;
  "before-interactive-callback"?: () => void;
  "after-interactive-callback"?: () => void;
}

interface TurnstileApi {
  render: (container: HTMLElement, options: TurnstileOptions) => string | undefined;
  execute: (widgetId: string) => void;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let script: Promise<TurnstileApi> | undefined;

function loadTurnstile() {
  script ??= new Promise<TurnstileApi>((resolve, reject) => {
    const tag = document.createElement("script");
    tag.src = SCRIPT_URL;
    tag.async = true;
    tag.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile did not load")));
    tag.onerror = () => {
      tag.remove();
      // Let the next attempt try again, e.g. once the visitor is back online.
      script = undefined;
      reject(new Error("Turnstile did not load"));
    };
    document.head.append(tag);
  });
  return script;
}

// Cloudflare Turnstile for one form. The widget stays out of sight and only
// shows itself when Cloudflare wants the visitor to click (`interactive`).
// `getToken` runs a fresh challenge per submission, because the server can
// redeem a token only once. Without a site key (local development) it
// resolves to undefined and the server skips the check.
export function useTurnstile(action: string) {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const used = useRef(false);
  const pending = useRef<{ resolve: (token: string) => void; reject: (error: Error) => void } | null>(null);
  const [interactive, setInteractive] = useState(false);

  const settle = useCallback((token: string | null, error?: string) => {
    const waiting = pending.current;
    pending.current = null;
    if (token) waiting?.resolve(token);
    else waiting?.reject(new Error(error ?? "Turnstile failed"));
  }, []);

  /** Loads the script and places the widget; safe to call more than once. */
  const prepare = useCallback(async () => {
    if (!SITE_KEY) return null;
    const turnstile = await loadTurnstile();
    if (widget.current === null && container.current) {
      const theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
      widget.current =
        turnstile.render(container.current, {
          sitekey: SITE_KEY,
          action,
          theme,
          size: "flexible",
          appearance: "interaction-only",
          execution: "execute",
          callback: (token) => settle(token),
          "error-callback": (code) => {
            settle(null, `Turnstile error ${code}`);
            return true;
          },
          "timeout-callback": () => settle(null, "Turnstile challenge timed out"),
          "before-interactive-callback": () => setInteractive(true),
          "after-interactive-callback": () => setInteractive(false),
        }) ?? null;
    }
    return turnstile;
  }, [action, settle]);

  const getToken = useCallback(async () => {
    if (!SITE_KEY) return undefined;
    const turnstile = await prepare();
    const id = widget.current;
    if (!turnstile || id === null) throw new Error("Turnstile is not ready");

    settle(null, "Superseded by a newer submission");
    if (used.current) turnstile.reset(id);
    used.current = true;

    return new Promise<string>((resolve, reject) => {
      const timer = window.setTimeout(() => settle(null, "Turnstile took too long"), TIMEOUT);
      pending.current = {
        resolve: (token) => {
          window.clearTimeout(timer);
          resolve(token);
        },
        reject: (error) => {
          window.clearTimeout(timer);
          setInteractive(false);
          reject(error);
        },
      };
      turnstile.execute(id);
    });
  }, [prepare, settle]);

  useEffect(
    () => () => {
      if (widget.current !== null) window.turnstile?.remove(widget.current);
      widget.current = null;
    },
    [],
  );

  return { enabled: Boolean(SITE_KEY), container, interactive, prepare, getToken };
}
