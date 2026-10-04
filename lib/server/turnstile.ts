const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TIMEOUT = 8000;

type Verdict = "human" | "bot" | "unavailable";

interface SiteVerifyResponse {
  success: boolean;
  action?: string;
  "error-codes"?: string[];
}

/** True when the Turnstile secret is set, so tokens can be checked. */
export const turnstileConfigured = () => Boolean(process.env.TURNSTILE_SECRET_KEY);

// Asks Cloudflare whether the token the browser sent is a solved challenge.
// A token can be redeemed once and expires after five minutes, so a replayed
// or made-up one comes back as "bot". "unavailable" means Cloudflare could not
// be reached or the secret is wrong; the caller must not treat that as a pass.
export async function verifyTurnstile(token: string | undefined, ip: string | null, action: string): Promise<Verdict> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return "unavailable";
  if (!token) return "bot";

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(TIMEOUT),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("[contact] Turnstile siteverify answered", response.status);
      return "unavailable";
    }
    const result = (await response.json()) as SiteVerifyResponse;
    if (result.success) {
      // A token earned on another form of this widget is not for this one.
      return result.action && result.action !== action ? "bot" : "human";
    }

    const codes = result["error-codes"] ?? [];
    // These point at this site's configuration, not at the visitor.
    if (codes.some((code) => code === "missing-input-secret" || code === "invalid-input-secret" || code === "internal-error")) {
      console.error("[contact] Turnstile could not verify:", codes.join(", "));
      return "unavailable";
    }
    return "bot";
  } catch (error) {
    console.error("[contact] Turnstile siteverify failed:", error);
    return "unavailable";
  }
}
