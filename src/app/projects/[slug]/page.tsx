// src/app/projects/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Page } from "@/components/layout/Page";
import { cn } from "@/lib/utils";
import {
  ExternalLink, Github, ArrowLeft, ArrowRight, Lock,
} from "lucide-react";

import { getAllProjects, type Project, type ProjectVariant } from "@/constants/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Listing order, not authoring order: the same sort /projects uses, so
 * previous/next at the foot of the page walks the list the visitor came from.
 */
function resolveProject(slug: string) {
  const list = getAllProjects();
  const index = list.findIndex((p) => p.slug === `/projects/${slug}`);
  if (index === -1) return null;
  const n = list.length;
  return {
    project: list[index],
    // Circular. Eight projects, and the last one should still have a way
    // forward that is not the footer.
    prev: n > 1 ? list[(index - 1 + n) % n] : null,
    next: n > 1 ? list[(index + 1) % n] : null,
  };
}

/**
 * Prerender every project page at build. Without this the route is rendered on
 * demand for each visit, which bought nothing: the data is a static array in
 * src/constants/projects/data.ts, fully known at build time.
 *
 * `Project.slug` is authored as the whole internal href ("/projects/teamboard")
 * rather than the bare segment, so it is trimmed back to what the [slug]
 * placeholder actually matches. resolveProject re-adds the prefix on the way in.
 */
export function generateStaticParams(): Array<{ slug: string }> {
  return getAllProjects().map((project) => ({
    slug: project.slug.replace(/^\/projects\//, ""),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hit = resolveProject(slug);
  if (!hit) return { title: "Project Not Found" };

  return {
    title: hit.project.title,
    // `summary` runs past the SERP limit on the longer entries, so the type
    // carries an optional truncation-safe override for exactly this slot.
    description: hit.project.metaDescription ?? hit.project.summary,
  };
}

/**
 * Server component, like the card. The withheld note renders here from the
 * same `reason` string; the confidential values are never authored into
 * data.ts, and nothing on this page crosses to the client.
 *
 * Layout: a two-column header (title, lead and the Live/Repo actions on the
 * left, the spec sheet on the right at lg), the hero at full container width
 * beneath both, then the
 * sections that only exist when their data does (variants, technical
 * decisions, more screens), and previous/next at the foot. Every block below the hero is
 * conditional on the data behind it, so a sparse project ends at the spec
 * sheet and the exit, and never at an empty heading.
 */
export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const hit = resolveProject(slug);
  if (!hit) notFound();
  const { project, prev, next } = hit;

  // Every project ships a local screenshot, but `image` is optional on the
  // type: without one the hero frame is dropped rather than filled from a
  // remote placeholder service.
  const heroSrc = (project.image?.src ?? "").trim() || null;
  const heroAlt = project.image?.alt ?? project.title;
  const gallery = project.gallery ?? [];
  const decisions = project.technicalDecisions ?? [];
  const variants = project.variants && project.variants.items.length > 0 ? project.variants : null;

  const demo = project.links?.demo;
  const repo = project.links?.repo;
  const repoIsPrivate = Boolean(repo?.isPrivate);
  const hasActions = Boolean(demo || repo);

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

        {/* DOM order is the mobile order: title, hero, spec sheet. At lg the
            spec sheet moves up beside the title and the hero takes the full
            second row. Explicit placement rather than `order`, so reading
            order and tab order match the small-screen layout everywhere. */}
        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-x-10">
          <div className="lg:col-start-1 lg:row-start-1">
            {/* Display face and weight arrive from the base layer; the size
                token is the only thing this needs. One step above the shared
                page title, a documented exception, not an oversight. */}
            <h1 className="text-[length:var(--text-display-lg)] leading-[1.1] text-[var(--text)]">
              {project.title}
            </h1>
            <p className="mt-3 max-w-2xl text-[length:var(--text-body-lead)] leading-[1.55] text-[var(--text-muted)]">
              {project.summary}
            </p>

            {/* The page's only Live and Repo controls, in the reading flow
                under the lead. Not repeated in the spec sheet: one place for
                the action, and the sheet stays a sheet of facts. */}
            {hasActions ? (
              <div className="mt-6 flex flex-wrap items-center gap-3">
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
                    <span className="inline-flex min-h-11 items-center gap-1.5 text-[length:var(--text-body-sm)] text-[var(--text-muted)]">
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
            ) : null}
          </div>

          {heroSrc ? (
            <div className="lg:col-span-2 lg:row-start-2">
              <BrowserFrame src={heroSrc} alt={heroAlt} priority />
            </div>
          ) : null}

          {/* self-start: a grid item stretches to its row by default, and a
              long lead beside a short sheet would leave the plate with an
              empty foot. It ends where its rows end. */}
          <SpecSheet project={project} className="lg:col-start-2 lg:row-start-1 lg:self-start" />
        </div>
      </section>

      {/* Variants: the same project in more than one presentation. Sits
          directly under the hero because it is more screens of the same
          build, framed. Heading and body come from the data; the template
          only lays them out, so another project can carry its own set. */}
      {variants ? (
        <section aria-labelledby="variants-heading">
          <h2
            id="variants-heading"
            className="text-[length:var(--text-display-sm)] leading-[1.2] text-[var(--text)]"
          >
            {variants.title}
          </h2>
          <p className="mt-2 max-w-3xl text-[length:var(--text-body-base)] leading-[1.6] text-[var(--text-muted)]">
            {variants.body}
          </p>

          <div className={cn("mt-6 grid gap-6", variants.items.length > 1 && "md:grid-cols-2")}>
            {variants.items.map((v, i) => (
              <VariantFigure key={`${v.name}-${i}`} variant={v} twoUp={variants.items.length > 1} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Key technical decisions: only rendered when project data provides them */}
      {decisions.length > 0 ? (
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
            {decisions.map((d, i) => (
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

      {/* The rest of the screenshots. Two up when there are two or more; a
          single extra shot takes the full width rather than half of it. */}
      {gallery.length > 0 ? (
        <section aria-labelledby="gallery-heading">
          <h2
            id="gallery-heading"
            className="text-[length:var(--text-display-sm)] leading-[1.2] text-[var(--text)]"
          >
            More screens
          </h2>
          <div className={cn("mt-6 grid gap-6", gallery.length > 1 && "md:grid-cols-2")}>
            {gallery.map((img, i) => (
              <BrowserFrame
                key={`${img.src}-${i}`}
                src={img.src}
                alt={img.alt}
                compact={gallery.length > 1}
                sizes={gallery.length > 1 ? "(min-width: 1024px) 36vw, 92vw" : undefined}
              />
            ))}
          </div>
        </section>
      ) : null}

      {prev && next ? (
        <section
          aria-labelledby="more-projects-heading"
          className="border-t border-[var(--edge-soft)] pt-8"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              id="more-projects-heading"
              className="text-[length:var(--text-display-sm)] leading-[1.2] text-[var(--text)]"
            >
              More projects
            </h2>
            <Link
              href="/projects"
              draggable={false}
              className="link-soft text-[length:var(--text-body-sm)] font-medium text-[var(--accent)]"
            >
              All projects
            </Link>
          </div>

          <nav aria-label="Previous and next project" className="mt-6 grid gap-6 sm:grid-cols-2">
            {prev.slug === next.slug ? (
              <NavCard direction="next" project={next} className="sm:col-span-2" />
            ) : (
              <>
                <NavCard direction="prev" project={prev} />
                <NavCard direction="next" project={next} />
              </>
            )}
          </nav>
        </section>
      ) : null}
    </Page>
  );
}

/* -------------------------------- Helpers -------------------------------- */

/**
 * The spec sheet. One plate, one definition list, every row conditional on
 * its data. Type comes from `badge.label`, the string authored for exactly
 * this job; the card derives the same word from `sector` instead, so the two
 * agree today by authoring rather than by construction. Sector is skipped
 * for personal work, where `sectorLabel` would only repeat the Type row.
 * Links are not here: the Live and Repo controls sit under the lead, once.
 */
function SpecSheet({ project, className }: { project: Project; className?: string }) {
  const showSector = project.sector !== "personal";

  return (
    <aside aria-labelledby="spec-heading" className={cn("plate p-5 sm:p-6", className)}>
      <h2
        id="spec-heading"
        className="text-[length:var(--text-display-2xs)] leading-[1.3] text-[var(--text)]"
      >
        Details
      </h2>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">
        <Fact label="Type" value={project.badge.label} />
        {showSector ? <Fact label="Sector" value={project.sectorLabel} /> : null}
        <Fact label="Category" value={project.category} />
        {project.createdAt ? <Fact label="Created" value={formatDate(project.createdAt)} /> : null}
        {project.metrics?.lighthouse ? <Fact label="Lighthouse" value={project.metrics.lighthouse} /> : null}
        {project.metrics?.stars ? <Fact label="Stars" value={project.metrics.stars} /> : null}

        {project.tags.length > 0 ? (
          <div className="col-span-2 border-t border-[var(--edge-soft)] pt-4">
            <dt className="text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-[var(--text-muted)]">
              Stack
            </dt>
            <dd className="mt-2">
              {/* Static labels: .chip, matching the project cards and the
                  About intro. */}
              <ul className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <li
                    key={t}
                    className="chip px-2 py-0.5 text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-[var(--text-muted)]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ) : null}

        {/* The withheld note, or the caption that replaces it: the same
            footnote the card carries, so what the card promised about the
            screenshots holds on the page that shows them large. */}
        {project.withheld ? (
          <div className="col-span-2 border-t border-[var(--edge-soft)] pt-4">
            <dt className="sr-only">What is shown</dt>
            <dd>
              <p className="withheld">
                <Lock className="size-3.5" aria-hidden />
                {project.withheld.reason}
              </p>
            </dd>
          </div>
        ) : project.caption ? (
          <div className="col-span-2 border-t border-[var(--edge-soft)] pt-4">
            <dt className="sr-only">What is shown</dt>
            <dd className="text-[length:var(--text-body-sm)] leading-[1.5] text-[var(--text-muted)]">
              {project.caption}
            </dd>
          </div>
        ) : null}
      </dl>
    </aside>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-[var(--text-muted)]">
        {label}
      </dt>
      <dd className="mt-0.5 text-[length:var(--text-body-sm)] font-semibold text-[var(--text)]">
        {value}
      </dd>
    </div>
  );
}

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
 *
 * `compact` narrows the well for frames that share a row; the hero keeps
 * the full padding.
 */
function BrowserFrame({
  src,
  alt,
  priority = false,
  compact = false,
  sizes = "(min-width: 1024px) 72vw, 92vw",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  compact?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("recessed", compact ? "p-3 sm:p-4" : "p-4 sm:p-6 lg:p-8")}>
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
            sizes={sizes}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * One presentation in the variants grid: the same browser frame the gallery
 * uses, with a caption underneath instead of a bare image. The caption is a
 * chip for the tag, the name as an h3, one line on what changes, and the
 * variant's own Live link in the card's inline-link recipe. The link's
 * accessible name carries the variant, since two "Live" links in one section
 * would otherwise be indistinguishable to a screen reader.
 */
function VariantFigure({ variant, twoUp }: { variant: ProjectVariant; twoUp: boolean }) {
  const { tag, name, summary, image, link } = variant;
  return (
    <figure>
      <BrowserFrame
        src={image.src}
        alt={image.alt}
        compact={twoUp}
        sizes={twoUp ? "(min-width: 1024px) 36vw, 92vw" : undefined}
      />
      <figcaption className="mt-4 flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div className="min-w-0 flex-1">
          <h3 className="flex flex-wrap items-center gap-2 text-[length:var(--text-display-2xs)] leading-[1.3] text-[var(--text)]">
            {tag ? (
              <span className="chip px-2 py-0.5 font-sans text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-[var(--text-muted)]">
                {tag}
              </span>
            ) : null}
            {name}
          </h3>
          {summary ? (
            <p className="mt-1 text-[length:var(--text-body-sm)] leading-[1.5] text-[var(--text-muted)]">
              {summary}
            </p>
          ) : null}
        </div>
        <a
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
          draggable={false}
          className="link-soft inline-flex shrink-0 items-center gap-1.5 text-[length:var(--text-body-sm)] font-medium text-[var(--accent)]"
        >
          <ExternalLink className="size-4" aria-hidden />
          {link.label}
          <span className="sr-only">
            : {tag ? `${tag} ` : ""}{name} (opens in a new tab)
          </span>
        </a>
      </figcaption>
    </figure>
  );
}

/**
 * Previous/next card. The card pattern from the system: .plate.interactive
 * with a stretched title link, so the whole surface is the target and focus
 * lands on the heading. `direction="next"` mirrors it: thumbnail on the
 * right, text ranged right, arrow after the label.
 */
function NavCard({
  direction,
  project,
  className,
}: {
  direction: "prev" | "next";
  project: Project;
  className?: string;
}) {
  const isNext = direction === "next";
  const thumbSrc = (project.image?.src ?? "").trim() || null;
  const thumbAlt = project.image?.alt ?? `${project.title} screenshot`;
  const provenance =
    project.sector === "demo" ? "Demo site" : project.sector === "personal" ? null : "Client work";

  return (
    <article
      className={cn(
        "plate interactive group relative flex items-center gap-4 p-4 sm:p-5",
        isNext && "flex-row-reverse text-right",
        className,
      )}
    >
      <div className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-[var(--radius-sm)] border border-[var(--edge-soft)] bg-[var(--ground)] sm:w-32">
        {thumbSrc ? (
          <Image
            src={thumbSrc}
            alt={thumbAlt}
            fill
            draggable={false}
            sizes="(min-width: 640px) 128px, 112px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "flex items-center gap-1.5 text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-[var(--text-muted)]",
            isNext && "justify-end",
          )}
        >
          {isNext ? null : <ArrowLeft className="size-3.5" aria-hidden />}
          {isNext ? "Next project" : "Previous project"}
          {isNext ? <ArrowRight className="size-3.5" aria-hidden /> : null}
        </p>
        <h3 className="mt-1 text-[length:var(--text-display-2xs)] leading-[1.3] text-[var(--text)]">
          <Link
            href={project.slug}
            draggable={false}
            className="after:absolute after:inset-0 after:content-[''] group-focus-within:underline group-hover:underline"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 text-[length:var(--text-body-xs)] text-[var(--text-muted)]">
          {project.sectorLabel}
          {provenance ? ` · ${provenance}` : ""}
        </p>
      </div>
    </article>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
