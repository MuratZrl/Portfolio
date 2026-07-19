// src/components/ProjectCard.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { ExternalLink, Github, Lock } from "lucide-react";

import type { Project } from "@/constants/projects";
import { placeholder } from "@/lib/media";

const MAX_VISIBLE_TAGS = 4;

/**
 * Sector no longer carries a colour. The single accent is reserved for
 * primary actions, links and focus, so industry is communicated by the
 * `sectorLabel` text alone — which is what 1.4.1 wanted anyway.
 */

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
        // `relative` is load-bearing, not cosmetic: the title link below
        // stretches an ::after over the whole card to make it clickable. With
        // no positioned ancestor that pseudo-element resolves against the
        // initial containing block and covers the entire document, so every
        // click on the page lands on the last card in DOM order.
        // The focus shadow is NOT a utility here. Tailwind's utilities layer
        // outranks @layer components, so `focus-within:shadow-[…]` would beat
        // the hover and active shadows in globals.css and invert them. It
        // lives in the components layer alongside them instead.
        "plate interactive group relative flex flex-col overflow-hidden",
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--edge-soft)] bg-[var(--muted)]">
        <Image
          src={imgSrc}
          alt={imgAlt}
          fill
          draggable={false}
          unoptimized={isRemote}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {/* The non-colour channel for the sector edge. Without this the
              colour would be carrying industry on its own — WCAG 1.4.1. */}
          <span className="text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-[var(--text-muted)]">
            {project.sectorLabel}
          </span>
          {isPaid ? (
            <span className="flex items-center gap-2 text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-[var(--text-muted)]">
              <span aria-hidden className="h-px w-4 bg-[var(--edge)]" />
              Client work
            </span>
          ) : null}
        </div>

        <Heading className="text-[length:var(--text-display-xs)] font-bold leading-[1.2] text-[var(--text)]">
          <Link
            href={project.slug}
            draggable={false}
            className="after:absolute after:inset-0 after:content-[''] group-focus-within:underline group-hover:underline"
          >
            {project.title}
          </Link>
        </Heading>

        <p className="text-[length:var(--text-body-sm)] leading-[1.5] text-[var(--text-muted)]">
          {project.cardSummary ?? project.summary}
        </p>

        {/* The withheld note, or the caption that replaces it. A footnote,
            not a panel — the device works by being quiet. The reason string
            is the whole payload; the confidential values are never authored
            into data.ts, so there is nothing here to inspect. */}
        {project.withheld ? (
          <p className="withheld">
            <Lock className="size-3.5" aria-hidden />
            {project.withheld.reason}
          </p>
        ) : project.caption ? (
          <p className="text-[length:var(--text-body-sm)] text-[var(--text-muted)]">{project.caption}</p>
        ) : null}

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {visibleTags.map((tag) => (
            <li
              key={tag}
              className="chip px-2 py-0.5 text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-[var(--text-muted)]"
            >
              {tag}
            </li>
          ))}
          {hiddenCount > 0 ? (
            <li className="px-2 py-0.5 text-[length:var(--text-body-xs)] text-[var(--text-muted)]">
              +{hiddenCount} more
            </li>
          ) : null}
        </ul>

        <div className="relative z-10 flex flex-wrap items-center gap-4 border-t border-[var(--edge-soft)] pt-4 text-[length:var(--text-body-sm)]">
          {demo ? (
            <a
              href={demo.href}
              target="_blank"
              rel="noreferrer noopener"
              className="link-soft inline-flex items-center gap-1.5 font-medium text-[var(--accent)]"
              draggable={false}
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
              className="link-soft inline-flex items-center gap-1.5 font-medium text-[var(--accent)]"
              draggable={false}
            >
              <Github className="size-4" aria-hidden />
              {repo.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}

          {repoIsPrivate ? (
            <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)]">
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
