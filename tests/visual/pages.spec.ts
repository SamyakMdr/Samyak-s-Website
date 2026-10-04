import { expect, test } from "@playwright/test";

// Full-page screenshots of every designed route in both themes, saved to
// test-results/screens/ for side-by-side comparison with the Figma frames.
const ROUTES = [
  { name: "home", path: "/" },
  { name: "projects", path: "/projects" },
  { name: "room-mountain-helicopter-system", path: "/projects/mountain-helicopter-system" },
] as const;

const THEMES = ["dark", "light"] as const;

for (const route of ROUTES) {
  for (const theme of THEMES) {
    test(`${route.name} · ${theme}`, async ({ page }, testInfo) => {
      await page.addInitScript((value) => {
        window.localStorage.setItem("theme", value);
        // Keep the one-time hint toast out of the screenshots.
        window.localStorage.setItem("terminal-hint-seen", "1");
      }, theme);
      await page.emulateMedia({ reducedMotion: "reduce" });

      const response = await page.goto(route.path, { waitUntil: "networkidle" });
      expect(response?.ok()).toBe(true);
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await page.evaluate(() => document.fonts.ready);

      await page.screenshot({
        path: `test-results/screens/${testInfo.project.name}-${theme}-${route.name}.png`,
        fullPage: true,
        animations: "disabled",
      });
    });
  }
}
