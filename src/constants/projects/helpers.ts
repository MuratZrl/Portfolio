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
 * The counts the site's copy quotes, read off PROJECTS rather than typed into
 * a sentence. Several pages used to spell these out by hand ("Three built for
 * paying clients", "All eight projects", "Three of the eight projects have
 * public repos"), which meant every entry added here silently falsified copy
 * on three other pages until someone noticed.
 *
 * Provenance comes from `sector`, the field that already encodes paid against
 * unpaid, so a project cannot be counted as client work without also being
 * labelled as client work on its own card.
 */
export type ProjectStats = {
  /** Every entry, whatever its provenance. */
  total: number;
  /** Paid work: every sector except the two unpaid ones. */
  client: number;
  /** Unpaid, built for myself. */
  personal: number;
  /**
   * Unpaid, built to show a prospective client what they would get. Zero
   * today: the sample sites moved to /ornekler, which reads its own data.
   * The field stays because the sector it counts still exists on the type.
   */
  demo: number;
  /** Client builds with no public URL a visitor can open for themselves. */
  clientPrivate: number;
  /** Projects whose repo link is public rather than withheld. */
  publicRepos: number;
};

function isClientWork(p: Project): boolean {
  return p.sector !== "personal" && p.sector !== "demo";
}

export function getProjectStats(): ProjectStats {
  return {
    total: PROJECTS.length,
    client: PROJECTS.filter(isClientWork).length,
    personal: PROJECTS.filter(p => p.sector === "personal").length,
    demo: PROJECTS.filter(p => p.sector === "demo").length,
    clientPrivate: PROJECTS.filter(p => isClientWork(p) && !p.links?.demo).length,
    publicRepos: PROJECTS.filter(p => p.links?.repo && !p.links.repo.isPrivate).length,
  };
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
