// src/app/sitemap.ts
import type { MetadataRoute } from "next";

import { SITE_URL } from "@/constants/site";
import { getAllProjects } from "@/constants/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  // Preview and development deployments get an empty sitemap, matching
  // robots.ts, which disallows everything off production. A preview host that
  // publishes a full sitemap invites a *.vercel.app URL into the index as a
  // duplicate of the real page.
  if (process.env.VERCEL_ENV !== "production") return [];

  // Deploy time, for the hand-written pages: their copy changes when the site
  // is rebuilt, and there is nothing more precise to point at.
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/projects`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/paketler`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];

  // Every project detail page, from the same getAllProjects() the /projects
  // listing renders and the same array generateStaticParams prerenders from.
  // One data source, so a new entry in data.ts cannot ship a page that is
  // absent from the sitemap.
  //
  // `slug` is authored as the full internal href ("/projects/salon-aura"), so
  // it appends to the origin as-is and matches the page's own canonical byte
  // for byte. lastModified is the project's own createdAt rather than the
  // deploy stamp: a case study does not change because the site was rebuilt,
  // and claiming otherwise on every deploy teaches crawlers to distrust the
  // dates. The field is optional on the type, so it falls back to the deploy
  // stamp when absent.
  const projectRoutes: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${SITE_URL}${project.slug}`,
    lastModified: project.createdAt ? new Date(project.createdAt) : lastModified,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
