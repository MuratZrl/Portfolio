// src/app/projects/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Page } from "@/components/layout/Page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLink, Github, ArrowLeft, Calendar, GitCommit,
  GitFork, Eye, CircleDot, Gauge, Star,
} from "lucide-react";

import { PROJECTS } from "@/constants/projects";
import {
  getGitHubRepos,
  getRepoDetails,
  extractRepoName,
  enrichWithCommitCounts,
} from "@/lib/github";
import { placeholder } from "@/lib/media";

type Props = {
  params: Promise<{ slug: string }>;
};

/** Resolve the project from curated list or GitHub repos. */
async function resolveProject(slug: string) {
  // Check curated projects first
  const curated = PROJECTS.find(
    (p) => p.slug === `/projects/${slug}`,
  );
  if (curated) {
    const enriched = await enrichWithCommitCounts([curated]);
    return enriched[0];
  }

  // Check GitHub auto-fetched projects
  if (slug.startsWith("gh-")) {
    const ghProjects = await getGitHubRepos();
    return ghProjects.find((p) => p.slug === `/projects/${slug}`) ?? null;
  }

  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await resolveProject(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await resolveProject(slug);
  if (!project) notFound();

  const repoName = extractRepoName(project);
  const details = repoName ? await getRepoDetails(repoName) : null;

  const imgSrc = project.image?.src || placeholder(1280, 720, project.title);
  const imgAlt = project.image?.alt ?? project.title;
  const isRemote = imgSrc.startsWith("http");
  const demo = project.links?.demo;
  const repo = project.links?.repo;

  // Language percentages
  const totalBytes = details
    ? Object.values(details.languages).reduce((a, b) => a + b, 0)
    : 0;
  const languageEntries = details
    ? Object.entries(details.languages)
        .sort(([, a], [, b]) => b - a)
        .map(([lang, bytes]) => ({
          lang,
          pct: Math.round((bytes / totalBytes) * 100),
        }))
    : [];

  return (
    <Page>
      {/* Back link */}
      <section>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        {/* Hero image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-muted">
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            priority
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-cover"
            unoptimized={isRemote}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

          {/* Category badge */}
          <div className="absolute left-4 top-4">
            <Badge className="bg-background/80 text-foreground backdrop-blur-sm border-border/50 shadow-sm">
              {project.category}
            </Badge>
          </div>
        </div>

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
              <Button asChild variant="outline">
                <a href={repo.href} target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  {repo.label}
                </a>
              </Button>
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
      </section>

      <Separator className="my-8" />

      {/* Stats grid */}
      <section>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {project.createdAt ? (
            <StatCard
              icon={<Calendar className="h-4 w-4" />}
              label="Created"
              value={formatDate(project.createdAt)}
            />
          ) : null}
          {details?.lastCommitDate ? (
            <StatCard
              icon={<GitCommit className="h-4 w-4" />}
              label="Last Commit"
              value={formatDate(details.lastCommitDate)}
            />
          ) : null}
          {project.commitCount ? (
            <StatCard
              icon={<GitCommit className="h-4 w-4" />}
              label="Commits"
              value={String(project.commitCount)}
            />
          ) : null}
          {details && details.forks > 0 ? (
            <StatCard
              icon={<GitFork className="h-4 w-4" />}
              label="Forks"
              value={String(details.forks)}
            />
          ) : null}
          {details && details.watchers > 0 ? (
            <StatCard
              icon={<Eye className="h-4 w-4" />}
              label="Watchers"
              value={String(details.watchers)}
            />
          ) : null}
          {details && details.openIssues > 0 ? (
            <StatCard
              icon={<CircleDot className="h-4 w-4" />}
              label="Open Issues"
              value={String(details.openIssues)}
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

      {/* Languages */}
      {languageEntries.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Languages</h2>

          {/* Color bar */}
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
            {languageEntries.map(({ lang, pct }) => (
              <div
                key={lang}
                className="h-full transition-all"
                style={{
                  width: `${pct}%`,
                  backgroundColor: getLanguageColor(lang),
                }}
                title={`${lang}: ${pct}%`}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {languageEntries.map(({ lang, pct }) => (
              <div key={lang} className="flex items-center gap-1.5 text-sm">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: getLanguageColor(lang) }}
                />
                <span className="text-muted-foreground">{lang}</span>
                <span className="font-medium">{pct}%</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* README */}
      {details?.readme ? (
        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-4">README</h2>
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardContent className="prose prose-sm dark:prose-invert max-w-none pt-6 overflow-x-auto whitespace-pre-wrap break-words font-mono text-sm text-muted-foreground leading-relaxed">
              {details.readme}
            </CardContent>
          </Card>
        </section>
      ) : null}
    </Page>
  );
}

/* -------------------------------- Helpers -------------------------------- */

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
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardContent className="flex flex-col items-center gap-1 py-4 px-3 text-center">
        <span className="text-primary">{icon}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm font-semibold">{value}</span>
      </CardContent>
    </Card>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Simple language → color mapping (GitHub-style). */
function getLanguageColor(lang: string): string {
  const colors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Python: "#3572A5",
    Go: "#00ADD8",
    Rust: "#dea584",
    Java: "#b07219",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Shell: "#89e051",
    Dockerfile: "#384d54",
    SCSS: "#c6538c",
    Prisma: "#2D3748",
  };
  return colors[lang] ?? "#8b8b8b";
}
