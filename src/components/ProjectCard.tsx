// src/components/ProjectCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Gauge, Star, Lock } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

import type { Project } from "@/constants/projects";
import { placeholder } from "@/lib/media";

const MAX_VISIBLE_TAGS = 4;

export function ProjectCard({ project }: { project: Project }): React.JSX.Element {
  const [broken, setBroken] = React.useState(false);

  const desired = (project.image?.src ?? "").trim() || null;
  const imgSrc = broken || !desired ? placeholder(1280, 720, project.title) : desired;
  const imgAlt = project.image?.alt ?? `${project.title} placeholder`;
  const isRemote = typeof imgSrc === "string" && imgSrc.startsWith("http");

  const demo = project.links?.demo;
  const repo = project.links?.repo;
  const isInternalDemo = Boolean(demo?.href?.startsWith("/"));
  const repoIsPrivate = Boolean(repo?.isPrivate);

  const visibleTags = project.tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = project.tags.length - visibleTags.length;

  return (
    <Card className={cn(
      "group flex h-full flex-col overflow-hidden",
      "border-border/50 bg-card/80 backdrop-blur-sm",
      "transition-all duration-300 ease-out",
      "hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20",
      "focus-within:shadow-lg focus-within:border-primary/20",
    )}>

      {/* Media */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={imgSrc}
          alt={imgAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          unoptimized={isRemote}
          onError={() => setBroken(true)}
        />
        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

        {/* Category badge on image */}
        <div className="absolute left-3 top-3">
          <Badge className="bg-background/80 text-foreground backdrop-blur-sm border-border/50 text-[10px] font-medium shadow-sm">
            {project.category}
          </Badge>
        </div>
      </div>

      {/* Body */}
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold sm:text-lg">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">{project.summary}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pt-0">
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {visibleTags.map((t) => (
            <span
              key={t}
              className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {t}
            </span>
          ))}
          {hiddenCount > 0 ? (
            <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              +{hiddenCount}
            </span>
          ) : null}
        </div>

        {/* Metrics */}
        {project.metrics ? (
          <div className="flex items-center gap-4 text-sm">
            {project.metrics.lighthouse ? (
              <Metric icon={<Gauge className="h-3.5 w-3.5" aria-hidden />} label="Lighthouse" value={project.metrics.lighthouse} />
            ) : null}
            {project.metrics.stars ? (
              <Metric icon={<Star className="h-3.5 w-3.5" aria-hidden />} label="Stars" value={project.metrics.stars} />
            ) : null}
          </div>
        ) : null}
      </CardContent>

      <CardFooter className="mt-auto gap-2 pt-0" withDivider={false}>
        {demo ? (
          <Button asChild size="sm">
            {isInternalDemo ? (
              <Link href={demo.href} aria-label={demo.ariaLabel ?? `Open ${project.title} demo`}>
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                {demo.label}
              </Link>
            ) : (
              <a href={demo.href} target="_blank" rel="noreferrer" aria-label={demo.ariaLabel ?? `Open ${project.title} demo`}>
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                {demo.label}
              </a>
            )}
          </Button>
        ) : null}

        {repo ? (
          repoIsPrivate ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="ghost" disabled className="text-muted-foreground">
                    <Lock className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                    {repo.label}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Repository is private</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button asChild size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
              <a href={repo.href} target="_blank" rel="noreferrer" aria-label={repo.ariaLabel ?? `Open ${project.title} repository`}>
                <Github className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                {repo.label}
              </a>
            </Button>
          )
        ) : null}

        {/* Details — always right-aligned */}
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="ml-auto text-muted-foreground hover:text-foreground"
          aria-label={`View ${project.title} details`}
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
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}): React.JSX.Element {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-primary">{icon}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-semibold text-primary">{value}</span>
    </div>
  );
}
