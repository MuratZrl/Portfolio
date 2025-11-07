// src/features/projects/sections/Projects.client.tsx
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

import { getAllProjects, getFeaturedProjects, type Project } from "@/constants/projects";
import { placeholder } from "@/lib/media";

type ProjectsProps = {
  source?: "all" | "featured";
  limit?: number;
  className?: string;
};

export default function Projects({
  source = "all",
  limit,
  className,
}: ProjectsProps): React.JSX.Element {
  // Küçük statik data -> client’ta direkt import OK
  const projects: readonly Project[] =
    source === "featured" ? getFeaturedProjects(limit) : getAllProjects();

  return (
    <section className={cn(className)}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Card --------------------------------- */

function ProjectCard({ project }: { project: Project }): React.JSX.Element {

  // 1) İstenen kaynak (varsa)
  const desired = (project.image?.src ?? "").trim() || null;

  // 2) İlk değer: varsa desired, yoksa placeholder
  const [src, setSrc] = React.useState<string>(
    desired ?? placeholder(1280, 720, project.title)
  );

  // 3) Alt metin
  const alt = project.image?.alt ?? `${project.title} placeholder`;

  // 4) Uzak mı? (placeholder ise evet)
  const isRemote = src.startsWith("http");

  const demo = project.links?.demo;
  const repo = project.links?.repo;
  const isInternal = demo?.href?.startsWith("/");
  const repoIsPrivate = Boolean(repo?.isPrivate);

  return (
    <Card className="group h-full overflow-hidden transition-shadow hover:shadow-md focus-within:shadow-md">
      
      {/* Media */}
      <div className="relative aspect-video w-full bg-muted">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
          // Yerel 404'lerde <img> onError tetiklenir → placeholder'a geç
          unoptimized={isRemote}                 // remote (placeholder) için optimize kapalı
          onError={() => {
            // Zaten placeholder ise tekrar set etmeye gerek yok
            if (!src.startsWith("http")) {
              setSrc(placeholder(1280, 720, project.title));
            }
          }}
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
            <Badge key={t} variant="secondary">{t}</Badge>
          ))}
        </div>

        {project.metrics ? (
          <div className="grid grid-cols-2 gap-3 text-sm">
            {project.metrics.lighthouse ? (
              <Metric icon={<Gauge className="h-4 w-4" aria-hidden />} label="Lighthouse" value={project.metrics.lighthouse!} />
            ) : null}
            {project.metrics.stars ? (
              <Metric icon={<Star className="h-4 w-4" aria-hidden />} label="Stars" value={project.metrics.stars!} />
            ) : null}
          </div>
        ) : null}
      </CardContent>

      <CardFooter className="mt-auto">
        <div className="flex items-center gap-2">
          {demo ? (
            <Button asChild size="sm">
              {isInternal ? (
                <Link href={demo.href} aria-label={demo.ariaLabel ?? `Open ${project.title} demo`}>
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden />
                  {demo.label}
                </Link>
              ) : (
                <a href={demo.href} target="_blank" rel="noreferrer" aria-label={demo.ariaLabel ?? `Open ${project.title} demo`}>
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden />
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
                <a href={repo.href} target="_blank" rel="noreferrer" aria-label={repo.ariaLabel ?? `Open ${project.title} repository`}>
                  <Github className="mr-2 h-4 w-4" aria-hidden />
                  {repo.label}
                </a>
              </Button>
            )
          ) : null}
        </div>
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
