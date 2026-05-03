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
  ExternalLink, Github, ArrowLeft, Calendar, Gauge, Star,
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

  const imgSrc = project.image?.src || placeholder(1280, 720, project.title);
  const imgAlt = project.image?.alt ?? project.title;
  const isRemote = imgSrc.startsWith("http");
  const demo = project.links?.demo;
  const repo = project.links?.repo;

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
