// src/features/home/sections/Projects.tsx

import React from "react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { getFeaturedProjects, type Project } from "@/constants/projects";
import { ProjectCard } from "@/components/ProjectCard";

type FeaturedProjectsProps = {
  /** Stable anchor id, so old in-page links keep working. */
  id?: string;
  projects?: readonly Project[];
  className?: string;
  /** Optional preview cap. Whatever you pass, hard cap stays 3. */
  maxVisible?: number;
};

const HARD_CAP = 3;

/** Server component — nothing here is interactive. */
export default function FeaturedProjects({
  id,
  projects,
  className,
  maxVisible = HARD_CAP,
}: FeaturedProjectsProps): React.JSX.Element {
  const t = useTranslations("home.projects");
  const list = (projects ?? getFeaturedProjects(6)).slice(0, Math.min(maxVisible, HARD_CAP));

  return (
    <section id={id} aria-labelledby="featured-projects-heading" className={cn("py-10 sm:py-12", className)}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2
            id="featured-projects-heading"
            className="text-[length:var(--text-display-md)] font-bold leading-[1.05] text-[var(--text)]"
          >
            {t("heading")}
          </h2>
          <p className="mt-2 text-[length:var(--text-body-base)] text-[var(--text-muted)]">{t("subheading")}</p>
        </div>

        {/* A text link, not a bordered button — a raised button beside a row of
            raised cards is depth noise. */}
        <Link
          href="/projects"
          className="link-soft text-[length:var(--text-body-sm)] font-medium text-[var(--accent)]"
          draggable={false}
        >
          {t("all")}
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
