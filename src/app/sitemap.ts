// src/app/sitemap.ts
import type { MetadataRoute } from "next";

import { getAllProjects } from "@/constants/projects";

const BASE_URL = "https://muratzorlu.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.VERCEL_ENV !== "production") return [];

  // Deploy time, for the hand-written pages: their copy changes when the site
  // is rebuilt, and there is nothing more precise to point at.
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/paketler`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];

  // Every project detail page. These were missing entirely, which left the
  // deepest content on the site out of the sitemap.
  //
  // `slug` is authored as the full internal href ("/projects/salon-aura"), so
  // it appends to the origin as-is. lastModified is the project's own
  // createdAt rather than the deploy stamp: a case study does not change
  // because the site was rebuilt, and claiming otherwise on every deploy
  // teaches crawlers to distrust the dates. The field is optional on the type,
  // so it falls back to the deploy stamp when absent.
  const projectRoutes: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${BASE_URL}${project.slug}`,
    lastModified: project.createdAt ? new Date(project.createdAt) : lastModified,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
