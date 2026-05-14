// src/app/sitemap.ts
import type { MetadataRoute } from "next";

const BASE_URL = "https://muratzorlu.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.VERCEL_ENV !== "production") return [];

  const lastModified = new Date();

  return [
    { url: `${BASE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
