// src/constants/projects/helpers.ts
import { PROJECTS } from "./data";
import { CATEGORY_ORDER } from "./types";
import type { Project, InternalHref, ProjectCategory } from "./types";

export function getAllProjects(): readonly Project[] {
  // Sort by explicit `order` first (ascending), then by createdAt descending.
  // Projects without `order` sort after those with one.
  return [...PROJECTS].sort((a, b) => {
    const ao = a.order ?? Number.POSITIVE_INFINITY;
    const bo = b.order ?? Number.POSITIVE_INFINITY;
    if (ao !== bo) return ao - bo;
    const ad = a.createdAt ?? "1970-01-01";
    const bd = b.createdAt ?? "1970-01-01";
    return bd.localeCompare(ad);
  });
}

export function getFeaturedProjects(limit?: number): readonly Project[] {
  const list = getAllProjects().filter(p => p.featured !== false);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function findProjectBySlug(slug: InternalHref): Project | undefined {
  return PROJECTS.find(p => p.slug === slug);
}

export function getAllTags(): readonly string[] {
  const set = new Set<string>();
  PROJECTS.forEach(p => p.tags.forEach(t => set.add(t)));
  return [...set].sort();
}

/**
 * Categories that at least one project carries, in CATEGORY_ORDER rather
 * than alphabetically: the filter row opens with the small business entry
 * point, and alphabetical order would bury it behind "Frontend build".
 * A category with no projects is dropped, so an empty pill cannot render.
 */
export function getAllCategories(): readonly ProjectCategory[] {
  const present = new Set<ProjectCategory>();
  PROJECTS.forEach(p => present.add(p.category));
  return CATEGORY_ORDER.filter(c => present.has(c));
}
