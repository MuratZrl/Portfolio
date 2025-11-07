// src/features/home/sections/Projects.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Gauge, Star, Lock } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

import { getFeaturedProjects, type Project } from "@/constants/projects";
import { placeholder } from "@/lib/media";

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
  // Listeyi her koşulda en fazla 3’e kırp
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

      {/* 3 sütun tavan: md=2, lg=3 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Card --------------------------------- */

function ProjectCard({ project }: { project: Project }): React.JSX.Element {
  const [broken, setBroken] = React.useState(false);

  const desired = project.image?.src ?? null;
  const imgSrc = broken || !desired ? placeholder(1280, 720, project.title) : desired;
  const imgAlt = project.image?.alt ?? `${project.title} placeholder`;
  const isRemote = typeof imgSrc === "string" && imgSrc.startsWith("http");

  const demo = project.links?.demo;
  const repo = project.links?.repo;

  const isInternalDemo = Boolean(demo?.href?.startsWith("/"));
  const repoIsPrivate = Boolean(repo?.isPrivate);

  return (
    <Card className="group h-full overflow-hidden transition-shadow hover:shadow-md focus-within:shadow-md">

      {/* Media */}
      <div className="relative aspect-video w-full bg-muted">
        <Image
          src={imgSrc}
          alt={imgAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
          unoptimized={isRemote}
          onError={() => setBroken(true)}  // ← 404’te placeholder’a geç
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Body */}
      <CardHeader className="pb-0">
        <CardTitle className="text-base sm:text-lg">{project.title}</CardTitle>
        <CardDescription>{project.summary}</CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>

        {project.metrics ? (
          <div className="grid grid-cols-2 gap-3 text-sm">
            {project.metrics.lighthouse ? (
              <Metric
                icon={<Gauge className="h-4 w-4" aria-hidden />}
                label="Lighthouse"
                value={project.metrics.lighthouse}
              />
            ) : null}
            {project.metrics.stars ? (
              <Metric
                icon={<Star className="h-4 w-4" aria-hidden />}
                label="Stars"
                value={project.metrics.stars}
              />
            ) : null}
          </div>
        ) : null}
      </CardContent>

      <CardFooter className="mt-auto">
        <div className="flex items-center gap-2">
          {demo ? (
            <Button asChild size="sm">
              {isInternalDemo ? (
                <Link
                  href={demo.href}
                  aria-label={demo.ariaLabel ?? `Open ${project.title} demo`}
                >
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden />
                  {demo.label}
                </Link>
              ) : (
                <a
                  href={demo.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={demo.ariaLabel ?? `Open ${project.title} demo`}
                >
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden />
                  {demo.label}
                </a>
              )}
            </Button>
          ) : null}

          {repo ? (
            // Private repo ise disabled + tooltip
            repoIsPrivate ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="outline" disabled>
                      <Lock className="mr-2 h-4 w-4" aria-hidden />
                      {repo.label}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Repository is private</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Button asChild size="sm" variant="outline">
                <a
                  href={repo.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={repo.ariaLabel ?? `Open ${project.title} repository`}
                >
                  <Github className="mr-2 h-4 w-4" aria-hidden />
                  {repo.label}
                </a>
              </Button>
            )
          ) : null}
        </div>

        <Button
          asChild
          variant="ghost"
          size="sm"
          className="ml-auto"
          aria-label={`Go to ${project.title} project detail page`}
        >
          <Link href={project.slug}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function Metric({
  icon,
  label,
  value,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}): React.JSX.Element {
  return (
    <div className={cn("flex items-center gap-2 rounded-md border px-3 py-2", className)}>
      <span className="inline-flex items-center">{icon}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="ml-auto font-medium">{value}</span>
    </div>
  );
}
