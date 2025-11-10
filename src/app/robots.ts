// src/app/robots.ts
import type { MetadataRoute } from "next";

function getBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "https://murat-zorlu-dev.vercel.app";
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

export default function robots(): MetadataRoute.Robots {
  const shouldIndex = process.env.NEXT_PUBLIC_SITE_INDEXING === "true";
  const base = getBaseUrl();

  if (!shouldIndex) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      // When not indexing, it's fine to omit host/sitemap entirely
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    host: base,
    sitemap: [`${base}/sitemap.xml`],
  };
}
