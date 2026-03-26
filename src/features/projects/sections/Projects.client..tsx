// src/features/projects/sections/Projects.client.tsx
"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  getAllProjects,
  getFeaturedProjects,
  type Project,
  type ProjectCategory,
} from "@/constants/projects";
import { ProjectCard } from "@/components/ProjectCard";

const PER_PAGE = 6;

type ProjectsProps = {
  source?: "all" | "featured";
  limit?: number;
  className?: string;
  /** Pre-enriched local projects (with commit counts). */
  localProjects?: Project[];
  /** Extra projects (e.g. from GitHub API) to append after local ones. */
  extraProjects?: Project[];
};

export default function Projects({
  source = "all",
  limit,
  className,
  localProjects,
  extraProjects = [],
}: ProjectsProps): React.JSX.Element {
  // Use pre-enriched local projects if provided, otherwise fall back to static imports
  const local: readonly Project[] = localProjects
    ? localProjects
    : source === "featured" ? getFeaturedProjects(limit) : getAllProjects();

  // Merge local + extra, dedup by slug and repo URL
  const seenSlugs = new Set(local.map((p) => p.slug));
  const seenRepos = new Set(
    local.map((p) => p.links?.repo?.href?.toLowerCase()).filter(Boolean),
  );
  const extra = extraProjects.filter(
    (p) =>
      !seenSlugs.has(p.slug) &&
      !seenRepos.has(p.links?.repo?.href?.toLowerCase() ?? ""),
  );

  // Sort: live demo projects first, then by commit count descending
  const merged = [...local, ...extra].sort((a, b) => {
    const aHasDemo = a.links?.demo ? 1 : 0;
    const bHasDemo = b.links?.demo ? 1 : 0;
    if (bHasDemo !== aHasDemo) return bHasDemo - aHasDemo;
    return (b.commitCount ?? 0) - (a.commitCount ?? 0);
  });
  const allProjects = merged;

  // Derive categories from the merged list
  const catSet = new Set<ProjectCategory>();
  allProjects.forEach((p) => catSet.add(p.category));
  const categories = [...catSet].sort();

  const [activeFilter, setActiveFilter] = React.useState<ProjectCategory | "All">("All");
  const [currentPage, setCurrentPage] = React.useState(1);

  const filteredProjects = activeFilter === "All"
    ? allProjects
    : allProjects.filter((p) => p.category === activeFilter);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProjects = filteredProjects.slice(
    (safePage - 1) * PER_PAGE,
    safePage * PER_PAGE,
  );

  const handleFilterChange = (filter: ProjectCategory | "All") => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className={cn(className)}>
      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by category">
        <button
          type="button"
          onClick={() => handleFilterChange("All")}
          aria-pressed={activeFilter === "All"}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            activeFilter === "All"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
          )}
        >
          All
          <span className="text-[11px] opacity-60">{allProjects.length}</span>
        </button>
        {categories.map((cat) => {
          const count = allProjects.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => handleFilterChange(cat)}
              aria-pressed={activeFilter === cat}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                activeFilter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
              )}
            >
              {cat}
              <span className="text-[11px] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {paginatedProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginatedProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No projects found for this category.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 ? (
        <nav
          aria-label="Projects pagination"
          className="mt-8 flex items-center justify-center gap-1"
        >
          <Button
            variant="outline"
            size="icon"
            disabled={safePage <= 1}
            onClick={() => goToPage(safePage - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === safePage ? "default" : "outline"}
              size="icon"
              onClick={() => goToPage(page)}
              aria-label={`Page ${page}`}
              aria-current={page === safePage ? "page" : undefined}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            disabled={safePage >= totalPages}
            onClick={() => goToPage(safePage + 1)}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </nav>
      ) : null}
    </section>
  );
}
