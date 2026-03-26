// src/features/home/sections/Projects.tsx
"use client";

import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { getFeaturedProjects, type Project } from "@/constants/projects";
import { ProjectCard } from "@/components/ProjectCard";

type FeaturedProjectsProps = {
  heading?: string;
  subheading?: string;
  projects?: readonly Project[];
  className?: string;
  /** Optional preview cap. Whatever you pass, hard cap stays 3. */
  maxVisible?: number;
};

const HARD_CAP = 3;

export default function FeaturedProjects({
  heading = "Featured projects",
  subheading = "Built for real workloads, tested and reliable.",
  projects,
  className,
  maxVisible = HARD_CAP,
}: FeaturedProjectsProps): React.JSX.Element {
  const list = (projects ?? getFeaturedProjects(6)).slice(
    0,
    Math.min(maxVisible, HARD_CAP)
  );

  return (
    <section
      aria-labelledby="featured-projects-heading"
      className={cn("py-12 sm:py-16", className)}
    >
      <div className="mb-6 flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h2
            id="featured-projects-heading"
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            {heading}
          </h2>
          <p className="text-sm text-muted-foreground">{subheading}</p>
        </div>
        <Button asChild variant="outline" size="sm" aria-label="View all projects">
          <Link href="/projects">View all</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
