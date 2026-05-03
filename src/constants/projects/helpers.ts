// src/constants/projects/helpers.ts
import { PROJECTS } from "./data";
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

export function getAllCategories(): readonly ProjectCategory[] {
  const set = new Set<ProjectCategory>();
  PROJECTS.forEach(p => set.add(p.category));
  return [...set].sort();
}
