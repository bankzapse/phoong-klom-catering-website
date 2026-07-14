import { promises as fs } from "fs";
import path from "path";
import { unstable_cache } from "next/cache";
import { Redis } from "@upstash/redis";
import { defaultContent, type SiteContent } from "./content";

// ─────────────────────────────────────────────────────────────
//  Storage layer
//  • Production (Vercel): Upstash Redis  (env: UPSTASH_REDIS_REST_URL / _TOKEN)
//  • Local dev fallback : data/content.local.json
//  • No storage at all  : returns bundled default content (read-only)
//
//  Reads are wrapped in unstable_cache so:
//   1. static routes (sitemap/robots/not-found) can be generated without
//      hitting the Upstash no-store fetch at build (no DYNAMIC_SERVER_USAGE)
//   2. Redis is queried rarely instead of on every page view (cost + speed)
//  The cache is busted on save via revalidateTag(CONTENT_TAG).
// ─────────────────────────────────────────────────────────────

const REDIS_KEY = "phoong-klom:content";
const LOCAL_FILE = path.join(process.cwd(), "data", "content.local.json");

export const CONTENT_TAG = "site-content";

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  try {
    // new Redis() throws synchronously on a malformed URL — never let a
    // mistyped env var crash the whole build/render; fall back to defaults.
    return new Redis({ url, token });
  } catch (err) {
    console.error("Invalid Upstash config, falling back to defaults:", err);
    return null;
  }
}

/** Deep-merge stored content over the defaults so new fields never break old data. */
function mergeContent(stored: Partial<SiteContent> | null): SiteContent {
  if (!stored) return defaultContent;
  return {
    ...defaultContent,
    ...stored,
    brand: { ...defaultContent.brand, ...stored.brand },
    hero: { ...defaultContent.hero, ...stored.hero },
    about: { ...defaultContent.about, ...stored.about },
    services: { ...defaultContent.services, ...stored.services },
    packages: { ...defaultContent.packages, ...stored.packages },
    gallery: { ...defaultContent.gallery, ...stored.gallery },
    testimonials: { ...defaultContent.testimonials, ...stored.testimonials },
    contact: { ...defaultContent.contact, ...stored.contact },
    seo: { ...defaultContent.seo, ...stored.seo },
  };
}

export type StorageMode = "redis" | "local" | "default";

export function storageMode(): StorageMode {
  if (getRedis()) return "redis";
  if (process.env.NODE_ENV !== "production") return "local";
  return "default";
}

/** Raw, uncached read straight from the source. Use where freshness matters (admin editor). */
export async function readContent(): Promise<SiteContent> {
  const redis = getRedis();
  if (redis) {
    try {
      const stored = await redis.get<SiteContent>(REDIS_KEY);
      return mergeContent(stored);
    } catch (err) {
      console.error("Redis read failed, using defaults:", err);
      return defaultContent;
    }
  }

  // Local dev fallback
  if (process.env.NODE_ENV !== "production") {
    try {
      const raw = await fs.readFile(LOCAL_FILE, "utf-8");
      return mergeContent(JSON.parse(raw));
    } catch {
      return defaultContent;
    }
  }

  return defaultContent;
}

/**
 * Cached read for public pages, layout metadata, sitemap and robots.
 * Served from cache until a save calls revalidateTag(CONTENT_TAG); the 1h
 * revalidate is just a safety net.
 */
export const getContent = unstable_cache(readContent, ["site-content"], {
  tags: [CONTENT_TAG],
  revalidate: 3600,
});

export async function saveContent(content: SiteContent): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.set(REDIS_KEY, content);
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
    await fs.writeFile(LOCAL_FILE, JSON.stringify(content, null, 2), "utf-8");
    return;
  }

  throw new Error(
    "ยังไม่ได้ตั้งค่าที่จัดเก็บข้อมูล — กรุณาตั้งค่า UPSTASH_REDIS_REST_URL และ UPSTASH_REDIS_REST_TOKEN บน Vercel"
  );
}

export async function isStorageWritable(): Promise<boolean> {
  return storageMode() !== "default";
}
