// src/app/robots.ts
import type { MetadataRoute } from "next";

import { SITE_URL } from "@/constants/site";

export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV !== "production") {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    host: SITE_URL,
    sitemap: [`${SITE_URL}/sitemap.xml`],
  };
}
