import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Gauge, Star } from "lucide-react";
import type { Project } from "@/data/projects";

type ProjectsGridProps = {
  projects: readonly Project[];
  className?: string;
};

export default function ProjectsGrid({
  projects,
  className,
}: ProjectsGridProps): React.JSX.Element {
  return (
    // Başlık burada yok; Page header üstte
    <section className={cn(className)}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }): React.JSX.Element {
  const hasImage = Boolean(project.image?.src);
  const demo = project.links?.demo;
  const repo = project.links?.repo;
  const isInternal = demo?.href?.startsWith("/");

  return (
    <Card className="group h-full overflow-hidden transition-shadow hover:shadow-md focus-within:shadow-md">
      {/* Media */}
      <div className="relative aspect-video w-full bg-muted">
        {hasImage ? (
          <Image
            src={project.image!.src}
            alt={project.image!.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,hsl(var(--primary)/0.15),transparent_60%)]" />
        )}
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
              <Metric icon={<Gauge className="h-4 w-4" aria-hidden />} label="Lighthouse" value={project.metrics.lighthouse} />
            ) : null}
            {project.metrics.stars ? (
              <Metric icon={<Star className="h-4 w-4" aria-hidden />} label="Stars" value={project.metrics.stars} />
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
            <Button asChild size="sm" variant="outline">
              <a href={repo.href} target="_blank" rel="noreferrer" aria-label={repo.ariaLabel ?? `Open ${project.title} repository`}>
                <Github className="mr-2 h-4 w-4" aria-hidden />
                {repo.label}
              </a>
            </Button>
          ) : null}
        </div>

        <Button asChild variant="ghost" size="sm" className="ml-auto" aria-label={`Go to ${project.title} project detail page`}>
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
