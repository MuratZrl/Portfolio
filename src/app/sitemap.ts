// src/app/sitemap.ts
import type { MetadataRoute } from "next";

import { getAllProjects } from "@/constants/projects";
import { SITE_URL } from "@/lib/site";

const abs = (path: string): string => `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL;

/**
 * hreflang alternates for a page that exists in both locales: the bare path
 * is Turkish, /en is English, and x-default is the site default, Turkish.
 */
function shared(path: string) {
  return {
    languages: {
      tr: abs(path),
      en: abs(`/en${path === "/" ? "" : path}`),
      "x-default": abs(path),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.VERCEL_ENV !== "production") return [];

  // Deploy time, for the hand-written pages: their copy changes when the site
  // is rebuilt, and there is nothing more precise to point at.
  const lastModified = new Date();

  // Pages that exist in both locales. The bare URL is Turkish, /en English;
  // each entry lists the other as an alternate.
  const sharedRoutes: MetadataRoute.Sitemap = [
    { url: abs("/"), lastModified, changeFrequency: "monthly", priority: 1, alternates: shared("/") },
    { url: abs("/en"), lastModified, changeFrequency: "monthly", priority: 0.9, alternates: shared("/") },
    { url: abs("/contact"), lastModified, changeFrequency: "monthly", priority: 0.8, alternates: shared("/contact") },
    { url: abs("/en/contact"), lastModified, changeFrequency: "monthly", priority: 0.7, alternates: shared("/contact") },
  ];

  // Turkish only: the price list. /en/paketler redirects here.
  const turkishRoutes: MetadataRoute.Sitemap = [
    { url: abs("/paketler"), lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];

  // English only: the developer portfolio. The bare /about and /projects
  // URLs are permanent redirects to these, so only the /en form is listed.
  const englishRoutes: MetadataRoute.Sitemap = [
    { url: abs("/en/about"), lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: abs("/en/projects"), lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Every project detail page, English only.
  //
  // `slug` is authored as the full internal href ("/projects/salon-aura").
  // lastModified is the project's own createdAt rather than the deploy stamp:
  // a case study does not change because the site was rebuilt, and claiming
  // otherwise on every deploy teaches crawlers to distrust the dates.
  const projectRoutes: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: abs(`/en${project.slug}`),
    lastModified: project.createdAt ? new Date(project.createdAt) : lastModified,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...sharedRoutes, ...turkishRoutes, ...englishRoutes, ...projectRoutes];
}
