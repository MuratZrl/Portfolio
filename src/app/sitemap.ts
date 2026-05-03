// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { PROJECTS } from "@/constants/projects/data";

function getBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "https://murat-zorlu-dev.vercel.app";
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

function parseDate(input?: string): Date {
  // Fallback to now if not provided or invalid
  if (!input) return new Date();
  const d = new Date(input);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const shouldIndex = process.env.NEXT_PUBLIC_SITE_INDEXING === "true";
  if (!shouldIndex) return [];

  const base = getBaseUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map(p => {
    const slug = p.slug; // e.g. "/projects/admin-panel"
    const modified = "createdAt" in p ? parseDate((p as { createdAt?: string }).createdAt) : now;

    return {
      url: `${base}${slug}`,
      lastModified: modified,
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...projectRoutes];
}
