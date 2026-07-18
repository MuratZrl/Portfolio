// src/app/projects/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
        {/* Back link */}
        <Link
          href="/projects"
          draggable={false}
          className="inline-flex select-none items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        {/* Title & actions */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {project.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
              {project.summary}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {demo ? (
              <Button asChild>
                <a href={demo.href} target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {demo.label}
                </a>
              </Button>
            ) : null}
            {repo ? (
              repoIsPrivate ? (
                <span className="inline-flex items-center gap-1.5 text-[length:var(--text-body-sm)] text-[var(--text-muted)]">
                  <Lock className="size-4" aria-hidden />
                  Private repo
                </span>
              ) : (
                <Button asChild variant="outline">
                  <a href={repo.href} target="_blank" rel="noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    {repo.label}
                  </a>
                </Button>
              )
            ) : null}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
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

      {/* Key technical decisions — only rendered when project data provides them */}
      {project.technicalDecisions && project.technicalDecisions.length > 0 ? (
        <section aria-labelledby="technical-decisions-heading">
          <h2
            id="technical-decisions-heading"
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            Key technical decisions
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Trade-offs that shaped the build — what was chosen, and why over the alternative.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {project.technicalDecisions.map((d, i) => (
              <article key={`${d.title}-${i}`} className="space-y-2">
                <h3 className="text-base font-semibold tracking-tight">{d.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{d.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <Separator className="my-8" />

      {/* Stats grid */}
      {project.createdAt || project.metrics?.lighthouse || project.metrics?.stars ? (
        <section>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
            {project.createdAt ? (
              <StatCard
                icon={<Calendar className="h-4 w-4" />}
                label="Created"
                value={formatDate(project.createdAt)}
              />
            ) : null}
            {project.metrics?.lighthouse ? (
              <StatCard
                icon={<Gauge className="h-4 w-4" />}
                label="Lighthouse"
                value={project.metrics.lighthouse}
              />
            ) : null}
            {project.metrics?.stars ? (
              <StatCard
                icon={<Star className="h-4 w-4" />}
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
    // Desktop layer: subtle gradient backdrop, modest padding so the window
    // reads as floating without shrinking the screenshot too much.
    <div className="rounded-2xl bg-gradient-to-br from-primary/15 via-muted/50 to-primary/5 p-3 sm:p-6 lg:p-8">
      {/* Window layer: Mac-style chrome + screenshot */}
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-xl">
        {/* Title bar with macOS-style traffic-light dots */}
        <div
          aria-hidden
          className="flex h-7 items-center gap-1.5 border-b border-border/50 bg-muted/60 px-3"
        >
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        {/* Image area — stays 16:9 for the screenshots */}
        <div className="relative aspect-video w-full bg-muted">
          <Image
            src={src}
            alt={alt}
            fill
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
        <span className="text-primary">{icon}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm font-semibold">{value}</span>
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
