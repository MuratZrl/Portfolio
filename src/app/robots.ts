// src/app/robots.ts
import type { MetadataRoute } from "next";

const BASE_URL = "https://muratzorlu.dev";

export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV !== "production") {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    host: BASE_URL,
    sitemap: [`${BASE_URL}/sitemap.xml`],
  };
}
