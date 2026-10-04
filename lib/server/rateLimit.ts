import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type Unit = "m" | "h" | "d";
interface Rule {
  name: string;
  limit: number;
  window: `${number} ${Unit}`;
}

// Per visitor, per address written into the form, and for the whole site.
// The address rule stops the automatic reply being used to flood someone
// else's inbox; the site rule keeps a burst well under Gmail's daily quota.
const RULES = {
  ip: { name: "ip", limit: 3, window: "10 m" },
  email: { name: "email", limit: 2, window: "1 h" },
  site: { name: "site", limit: 100, window: "1 d" },
} satisfies Record<string, Rule>;

const UNIT_MS: Record<Unit, number> = { m: 60_000, h: 3_600_000, d: 86_400_000 };

function windowMs(window: Rule["window"]) {
  const [amount, unit] = window.split(" ") as [string, Unit];
  return Number(amount) * UNIT_MS[unit];
}

type Check = (key: string) => Promise<boolean>;

// Upstash Redis holds the counters, because serverless functions share no
// memory. The KV_* names are what Vercel's Upstash integration sets.
function redisLimiters(): Record<keyof typeof RULES, Check> | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  const redis = new Redis({ url, token });
  const build = (rule: Rule): Check => {
    const limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(rule.limit, rule.window),
      prefix: `contact:${rule.name}`,
      // Give up on a slow Redis instead of hanging the form.
      timeout: 3000,
    });
    return async (key) => (await limiter.limit(key)).success;
  };
  return { ip: build(RULES.ip), email: build(RULES.email), site: build(RULES.site) };
}

// Fallback for local development and single-server hosting: counters in this
// process's memory. On serverless it only slows a burst that lands on one
// warm instance, so production there needs Redis.
const hits = new Map<string, number[]>();

function memoryCheck(rule: Rule): Check {
  const span = windowMs(rule.window);
  return async (key) => {
    const now = Date.now();
    const id = `${rule.name}:${key}`;
    const recent = (hits.get(id) ?? []).filter((time) => now - time < span);
    const allowed = recent.length < rule.limit;
    if (allowed) recent.push(now);
    hits.set(id, recent);
    if (hits.size > 5000) {
      for (const [other, times] of hits) {
        if (times.every((time) => now - time >= UNIT_MS.d)) hits.delete(other);
      }
    }
    return allowed;
  };
}

type Limiters = Record<keyof typeof RULES, Check>;

const memory: Limiters = { ip: memoryCheck(RULES.ip), email: memoryCheck(RULES.email), site: memoryCheck(RULES.site) };
let redis: Limiters | null | undefined;

function getRedis() {
  if (redis !== undefined) return redis;
  redis = redisLimiters();
  if (!redis && process.env.NODE_ENV === "production") {
    console.warn("[contact] Upstash Redis is not configured, rate limiting falls back to memory");
  }
  return redis;
}

async function check({ ip: byIp, email: byEmail, site }: Limiters, ip: string | null, email: string) {
  // In order, and stopping at the first refusal, so a blocked visitor does
  // not use up the address's or the site's allowance.
  if (!(await byIp(ip ?? "unknown"))) return false;
  if (!(await byEmail(email.toLowerCase()))) return false;
  return site("all");
}

/** False when this visitor, this address or the whole site is over its limit. */
export async function allowContactMessage(ip: string | null, email: string): Promise<boolean> {
  const shared = getRedis();
  if (!shared) return check(memory, ip, email);
  try {
    return await check(shared, ip, email);
  } catch (error) {
    // Redis being down must not open the form wide: count in memory instead.
    console.error("[contact] rate limit check failed, using memory:", error);
    return check(memory, ip, email);
  }
}
