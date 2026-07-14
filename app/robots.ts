import type { MetadataRoute } from "next";
import { getContent } from "@/lib/storage";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const c = await getContent();
  const base = c.seo.siteUrl.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
