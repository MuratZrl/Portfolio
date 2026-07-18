// src/components/ProjectCard.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { ExternalLink, Github, Lock } from "lucide-react";

import type { Project } from "@/constants/projects";
import { placeholder } from "@/lib/media";

const MAX_VISIBLE_TAGS = 4;

/** Sector drives the top edge only. A two-sided override destroys the bevel read. */
const SECTOR_EDGE: Record<Project["sector"], string> = {
  metal: "border-t-[var(--eloksal)]",
  property: "border-t-[var(--jade)]",
  commerce: "border-t-[var(--azure)]",
  personal: "", // no chromatic edge — a coloured edge means somebody paid for this
};

type ProjectCardProps = {
  project: Project;
  /**
   * Required. On `/` the cards sit under a section h2, so they are h3.
   * On `/projects` the page h1 is the only ancestor, so they are h2.
   */
  headingLevel: 2 | 3;
};

/**
 * Server component. This matters: the withheld slab's claim that the
 * confidential data "is not sent to your browser" is only true if nothing
 * serialises it. The values are never authored into `data.ts` at all, and
 * keeping this component off the client means the props are not in the
 * flight payload either.
 */
export function ProjectCard({ project, headingLevel }: ProjectCardProps): React.JSX.Element {
  const Heading = (headingLevel === 2 ? "h2" : "h3") as "h2" | "h3";

  const desired = (project.image?.src ?? "").trim() || null;
  const imgSrc = desired ?? placeholder(1280, 720, project.title);
  const imgAlt = project.image?.alt ?? `${project.title} screenshot`;
  const isRemote = imgSrc.startsWith("http");

  const demo = project.links?.demo;
  const repo = project.links?.repo;
  const repoIsPrivate = Boolean(repo?.isPrivate);

  const visibleTags = project.tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = project.tags.length - visibleTags.length;
  const isPaid = project.sector !== "personal";

  return (
    <article
      className={cn(
        "plate group flex flex-col overflow-hidden transition-colors duration-[var(--dur-base)] ease-[var(--ease-standard)]",
        "hover:bg-[var(--accent-surface)] focus-within:bg-[var(--accent-surface)]",
        SECTOR_EDGE[project.sector],
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b-2 border-[var(--edge-hi)] bg-[var(--muted)]">
        <Image
          src={imgSrc}
          alt={imgAlt}
          fill
          unoptimized={isRemote}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {/* The non-colour channel for the sector edge. Without this the
              colour would be carrying industry on its own — WCAG 1.4.1. */}
          <span className="text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-patina">
            {project.sectorLabel}
          </span>
          {isPaid ? (
            <span className="flex items-center gap-2 text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-patina">
              <span aria-hidden className="h-0.5 w-4 bg-[var(--brass)]" />
              Client work
            </span>
          ) : null}
        </div>

        <Heading className="text-[length:var(--text-display-xs)] font-bold leading-[1.2] text-scribe">
          <Link
            href={project.slug}
            className="outline-none after:absolute after:inset-0 after:content-[''] group-focus-within:underline group-hover:underline"
          >
            {project.title}
          </Link>
        </Heading>

        <p className="text-[length:var(--text-body-sm)] leading-[1.5] text-patina">
          {project.cardSummary ?? project.summary}
        </p>

        {/* The withheld slab, or the caption that replaces it. */}
        {project.withheld ? (
          <p
            className="withheld"
            style={{ "--wh-rows": project.withheld.rows } as React.CSSProperties}
          >
            {project.withheld.reason}
          </p>
        ) : project.caption ? (
          <p className="text-[length:var(--text-body-sm)] text-patina">{project.caption}</p>
        ) : null}

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {visibleTags.map((tag) => (
            <li
              key={tag}
              className="recessed px-2 py-0.5 text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-patina"
            >
              {tag}
            </li>
          ))}
          {hiddenCount > 0 ? (
            <li className="px-2 py-0.5 text-[length:var(--text-body-xs)] text-patina">
              +{hiddenCount} more
            </li>
          ) : null}
        </ul>

        <div className="relative z-10 flex flex-wrap items-center gap-4 border-t-2 border-[var(--edge-hi)] pt-4 text-[length:var(--text-body-sm)]">
          {demo ? (
            <a
              href={demo.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 font-medium text-eloksal underline-offset-4 hover:underline"
            >
              <ExternalLink className="size-4" aria-hidden />
              {demo.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}

          {repo && !repoIsPrivate ? (
            <a
              href={repo.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 font-medium text-eloksal underline-offset-4 hover:underline"
            >
              <Github className="size-4" aria-hidden />
              {repo.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}

          {repoIsPrivate ? (
            <span className="inline-flex items-center gap-1.5 text-patina">
              <Lock className="size-4" aria-hidden />
              Private repo
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
