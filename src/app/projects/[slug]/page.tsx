// src/app/projects/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Page } from "@/components/layout/Page";
import {
  ExternalLink, Github, ArrowLeft, Calendar, Gauge, Star, Lock,
} from "lucide-react";

import { PROJECTS } from "@/constants/projects";
import { placeholder } from "@/lib/media";

type Props = {
  params: Promise<{ slug: string }>;
};

function resolveProject(slug: string) {
  return PROJECTS.find((p) => p.slug === `/projects/${slug}`) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = resolveProject(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = resolveProject(slug);
  if (!project) notFound();

  const heroSrc = project.image?.src || placeholder(1280, 720, project.title);
  const heroAlt = project.image?.alt ?? project.title;
  const galleryImages = project.gallery ?? [];

  const demo = project.links?.demo;
  const repo = project.links?.repo;
  const repoIsPrivate = Boolean(repo?.isPrivate);

  return (
    <Page>
      <section>
        {/* .link-soft, the same inline-link recipe the home Projects heading
            uses. The old version paired `interactive` (a surface recipe that
            transitions box-shadow and transform) with a bare colour swap. */}
        <Link
          href="/projects"
          draggable={false}
          className="link-soft mb-6 inline-flex select-none items-center gap-1.5 text-[length:var(--text-body-sm)] font-medium text-[var(--accent)]"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to Projects
        </Link>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {/* Display face and weight arrive from the base layer; the size
                token is the only thing this needs. */}
            <h1 className="text-[length:var(--text-display-lg)] leading-[1.1] text-[var(--text)]">
              {project.title}
            </h1>
            <p className="mt-2 max-w-2xl text-[length:var(--text-body-lead)] leading-[1.55] text-[var(--text-muted)]">
              {project.summary}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {demo ? (
              <a
                href={demo.href}
                target="_blank"
                rel="noreferrer noopener"
                draggable={false}
                className="soft-btn soft-btn-primary inline-flex min-h-11 items-center gap-2 px-5 text-[length:var(--text-body-sm)] font-medium"
              >
                <ExternalLink className="size-4" aria-hidden />
                {demo.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}

            {repo ? (
              repoIsPrivate ? (
                <span className="inline-flex items-center gap-1.5 text-[length:var(--text-body-sm)] text-[var(--text-muted)]">
                  <Lock className="size-4" aria-hidden />
                  Private repo
                </span>
              ) : (
                <a
                  href={repo.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  draggable={false}
                  className="soft-btn soft-btn-ghost inline-flex min-h-11 items-center gap-2 px-5 text-[length:var(--text-body-sm)] font-medium"
                >
                  <Github className="size-4" aria-hidden />
                  {repo.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )
            ) : null}
          </div>
        </div>

        {/* Static labels: .chip, matching the project cards and the About
            intro. Replaces `rounded-md bg-muted`. */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="chip px-2.5 py-1 text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-[var(--text-muted)]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* All images: hero + gallery stacked as one uninterrupted sequence */}
        <div className="mt-8 space-y-6">
          <BrowserFrame src={heroSrc} alt={heroAlt} priority />
          {galleryImages.map((img, i) => (
            <BrowserFrame key={`${img.src}-${i}`} src={img.src} alt={img.alt} />
          ))}
        </div>
      </section>

      {/* Key technical decisions: only rendered when project data provides them */}
      {project.technicalDecisions && project.technicalDecisions.length > 0 ? (
        <section aria-labelledby="technical-decisions-heading">
          <h2
            id="technical-decisions-heading"
            className="text-[length:var(--text-display-sm)] leading-[1.2] text-[var(--text)]"
          >
            Key technical decisions
          </h2>
          <p className="mt-1 text-[length:var(--text-body-sm)] text-[var(--text-muted)]">
            Trade-offs that shaped the build: what was chosen, and why over the alternative.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {project.technicalDecisions.map((d, i) => (
              <article key={`${d.title}-${i}`} className="space-y-2">
                <h3 className="text-[length:var(--text-display-2xs)] leading-[1.3] text-[var(--text)]">
                  {d.title}
                </h3>
                <p className="text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--text-muted)]">
                  {d.body}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* Was a Radix <Separator>, a client component pulling JavaScript into
          the page to draw a one-pixel line. The rest of the system draws
          rules with a border on the element that needs one. */}
      <div aria-hidden className="my-8 border-t border-[var(--edge-soft)]" />

      {project.createdAt || project.metrics?.lighthouse || project.metrics?.stars ? (
        <section>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {project.createdAt ? (
              <StatCard
                icon={<Calendar className="size-4" aria-hidden />}
                label="Created"
                value={formatDate(project.createdAt)}
              />
            ) : null}
            {project.metrics?.lighthouse ? (
              <StatCard
                icon={<Gauge className="size-4" aria-hidden />}
                label="Lighthouse"
                value={project.metrics.lighthouse}
              />
            ) : null}
            {project.metrics?.stars ? (
              <StatCard
                icon={<Star className="size-4" aria-hidden />}
                label="Stars"
                value={project.metrics.stars}
              />
            ) : null}
          </div>
        </section>
      ) : null}
    </Page>
  );
}

/* -------------------------------- Helpers -------------------------------- */

/**
 * A raised window sitting in a recessed well: .plate inside .recessed, both
 * straight out of the system.
 *
 * The backdrop used to be `bg-gradient-to-br from-primary/15 via-muted/50
 * to-primary/5`, an accent-tinted gradient with no token behind any of its
 * three stops, and the window carried Tailwind's shadow-xl rather than a
 * shadow token. FinalCTA already records the position this contradicts:
 * a gradient wash is a different aesthetic from the flat one everything
 * else is cut to.
 */
function BrowserFrame({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const isRemote = src.startsWith("http");
  return (
    <div className="recessed p-4 sm:p-6 lg:p-8">
      <div className="plate overflow-hidden">
        {/* Traffic lights stay the literal macOS palette. They are a
            recognisable quotation of that chrome, not themed UI, and the
            system has no token for them - so they are flagged and left
            rather than mapped onto the accent. aria-hidden, decorative. */}
        <div
          aria-hidden
          className="flex h-7 items-center gap-1.5 border-b border-[var(--edge-soft)] bg-[var(--ground)] px-3"
        >
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>

        <div className="relative aspect-video w-full bg-[var(--ground)]">
          <Image
            src={src}
            alt={alt}
            fill
            draggable={false}
            priority={priority}
            sizes="(min-width: 1024px) 72vw, 92vw"
            className="object-cover"
            unoptimized={isRemote}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="plate flex flex-col items-center gap-1 px-3 py-4 text-center">
      <span className="text-[var(--accent)]">{icon}</span>
      <span className="text-[length:var(--text-body-xs)] text-[var(--text-muted)]">
        {label}
      </span>
      <span className="text-[length:var(--text-body-sm)] font-semibold text-[var(--text)]">
        {value}
      </span>
    </div>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
