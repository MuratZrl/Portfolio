// src/features/home/sections/Projects.tsx

import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
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

/** Server component — nothing here is interactive. */
export default function FeaturedProjects({
  heading = "Projects",
  subheading = "Three built for paying clients, two built for me. The client ones are in daily use.",
  projects,
  className,
  maxVisible = HARD_CAP,
}: FeaturedProjectsProps): React.JSX.Element {
  const list = (projects ?? getFeaturedProjects(6)).slice(0, Math.min(maxVisible, HARD_CAP));

  return (
    <section aria-labelledby="featured-projects-heading" className={cn("py-12 sm:py-16", className)}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2
            id="featured-projects-heading"
            className="text-[length:var(--text-display-md)] font-bold leading-[1.05] text-[var(--text)]"
          >
            {heading}
          </h2>
          <p className="mt-2 text-[length:var(--text-body-base)] text-[var(--text-muted)]">{subheading}</p>
        </div>

        {/* A text link, not a bordered button — a raised button beside a row of
            raised cards is depth noise. */}
        <Link
          href="/projects"
          className="text-[length:var(--text-body-sm)] font-medium text-[var(--accent)] underline-offset-4 hover:underline"
        >
          All five projects
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProjectCard key={p.slug} project={p} headingLevel={3} />
        ))}
      </div>
    </section>
  );
}
