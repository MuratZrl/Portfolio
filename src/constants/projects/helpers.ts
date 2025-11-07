// src/constants/projects/helpers.ts
import { PROJECTS } from "./data";
import type { Project, InternalHref } from "./types";

export function getAllProjects(): readonly Project[] {
  // PROJECTS readonly, kopyalayıp sıralıyoruz
  return [...PROJECTS].sort((a, b) => {
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
