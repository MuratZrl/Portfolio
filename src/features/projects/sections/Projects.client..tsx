// src/features/projects/sections/Projects.client.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Gauge, Star, Lock, ChevronLeft, ChevronRight } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

import {
  getAllProjects,
  getFeaturedProjects,
  getAllCategories,
  type Project,
  type ProjectCategory,
} from "@/constants/projects";
import { placeholder } from "@/lib/media";

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

/* --------------------------------- Card --------------------------------- */

const MAX_VISIBLE_TAGS = 4;

function ProjectCard({ project }: { project: Project }): React.JSX.Element {

  const desired = (project.image?.src ?? "").trim() || null;

  const [src, setSrc] = React.useState<string>(
    desired ?? placeholder(1280, 720, project.title)
  );

  const alt = project.image?.alt ?? `${project.title} placeholder`;
  const isRemote = src.startsWith("http");

  const demo = project.links?.demo;
  const repo = project.links?.repo;
  const isInternal = demo?.href?.startsWith("/");
  const repoIsPrivate = Boolean(repo?.isPrivate);

  const visibleTags = project.tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = project.tags.length - visibleTags.length;

  return (
    <Card className={cn(
      "group flex h-full flex-col overflow-hidden",
      "border-border/50 bg-card/80 backdrop-blur-sm",
      "transition-all duration-300 ease-out",
      "hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20",
      "focus-within:shadow-lg focus-within:border-primary/20",
    )}>

      {/* Media */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          unoptimized={isRemote}
          onError={() => {
            if (!src.startsWith("http")) {
              setSrc(placeholder(1280, 720, project.title));
            }
          }}
        />
        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

        {/* Category badge on image */}
        <div className="absolute left-3 top-3">
          <Badge className="bg-background/80 text-foreground backdrop-blur-sm border-border/50 text-[10px] font-medium shadow-sm">
            {project.category}
          </Badge>
        </div>
      </div>

      {/* Body */}
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold sm:text-lg">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">{project.summary}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pt-0">
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {visibleTags.map((t) => (
            <span
              key={t}
              className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {t}
            </span>
          ))}
          {hiddenCount > 0 ? (
            <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              +{hiddenCount}
            </span>
          ) : null}
        </div>

        {/* Metrics */}
        {project.metrics ? (
          <div className="flex items-center gap-4 text-sm">
            {project.metrics.lighthouse ? (
              <Metric icon={<Gauge className="h-3.5 w-3.5" aria-hidden />} label="Lighthouse" value={project.metrics.lighthouse} />
            ) : null}
            {project.metrics.stars ? (
              <Metric icon={<Star className="h-3.5 w-3.5" aria-hidden />} label="Stars" value={project.metrics.stars} />
            ) : null}
          </div>
        ) : null}
      </CardContent>

      <CardFooter className="mt-auto gap-2 pt-0" withDivider={false}>
        {demo ? (
          <Button asChild size="sm">
            {isInternal ? (
              <Link href={demo.href} aria-label={demo.ariaLabel ?? `Open ${project.title} demo`}>
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                {demo.label}
              </Link>
            ) : (
              <a href={demo.href} target="_blank" rel="noreferrer" aria-label={demo.ariaLabel ?? `Open ${project.title} demo`}>
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                {demo.label}
              </a>
            )}
          </Button>
        ) : null}

        {repo ? (
          repoIsPrivate ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="ghost" disabled className="text-muted-foreground">
                    <Lock className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                    {repo.label}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Repository is private</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button asChild size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
              <a href={repo.href} target="_blank" rel="noreferrer" aria-label={repo.ariaLabel ?? `Open ${project.title} repository`}>
                <Github className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                {repo.label}
              </a>
            </Button>
          )
        ) : null}
      </CardFooter>
    </Card>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}): React.JSX.Element {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-primary">{icon}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-semibold text-primary">{value}</span>
    </div>
  );
}
