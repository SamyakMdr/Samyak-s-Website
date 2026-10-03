"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, type MouseEvent } from "react";
import { Button } from "@/components/ui/Button";
import { room } from "@/content/site";
import { returnTo, roomOrigin } from "@/lib/trail";

// Close button and the Esc key. Both return to where the visitor came from, or
// to `href` when the room was opened directly. The link itself points at `href`
// so it still works without JavaScript.
export function RoomClose({ href }: { href: string }) {
  const router = useRouter();

  const close = useCallback(() => {
    const origin = roomOrigin();
    if (origin) returnTo(origin);
    else router.push(href);
  }, [router, href]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const { target } = event;
      // A form field or the mobile menu may be using the key.
      if (target instanceof Element && target.closest("input, textarea, select, [contenteditable=true]")) return;
      if (document.getElementById("mobile-menu")) return;
      close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Leave new-tab and modified clicks to the browser.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    close();
  };

  return (
    <Button
      href={href}
      onClick={onClick}
      variant="secondary"
      // The mobile button is 33px tall in Figma; the pseudo-element keeps a 44px tap target.
      className="relative max-tablet:py-2 max-tablet:before:absolute max-tablet:before:-inset-1.5 max-tablet:before:content-['']"
    >
      {room.close} <span className="max-tablet:hidden">{room.closeKey}</span>
    </Button>
  );
}
