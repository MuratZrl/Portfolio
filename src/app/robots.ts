// src/app/robots.ts
import type { MetadataRoute } from "next";

const BASE_URL = "https://muratzorlu.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    host: BASE_URL,
    sitemap: [`${BASE_URL}/sitemap.xml`],
  };
}
