// src/features/about/sections/AboutIntro.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import type { LucideIcon } from "lucide-react";
import { MapPin, Mail, Download } from "lucide-react";

import type {
  Availability, Cta,
} from "@/features/about/types";

import { ABOUT_DEFAULTS } from "@/features/about/data/about-intro";
import { initials } from "@/features/about/utils/about-intro";

type AboutIntroProps = {
  name?: string;
  role?: string;
  location?: string;
  availability?: Availability;
  avatar?: { src: string; alt: string };
  bio?: readonly string[];
  highlights?: readonly string[];
  techTags?: readonly string[];
  social?: readonly { href: string; label: string; icon: LucideIcon }[];
  stats?: readonly { label: string; value: string; icon?: LucideIcon }[];
  primary?: Cta;
  secondary?: Cta;
  className?: string;
};

export default function AboutIntro(props: AboutIntroProps): React.JSX.Element {
  const {
    name = ABOUT_DEFAULTS.name,
    role = ABOUT_DEFAULTS.role,
    location = ABOUT_DEFAULTS.location,
    avatar = ABOUT_DEFAULTS.avatar,
    bio = ABOUT_DEFAULTS.bio,
    highlights = ABOUT_DEFAULTS.highlights,
    techTags = ABOUT_DEFAULTS.techTags,
    social = ABOUT_DEFAULTS.social,
    stats = ABOUT_DEFAULTS.stats,
    primary = ABOUT_DEFAULTS.primary,
    secondary = ABOUT_DEFAULTS.secondary,
    className,
  } = props;

  const headingId = React.useId();

  return (
    <section aria-labelledby={headingId} className={cn(className)}>

      <div className="grid gap-8 md:grid-cols-[auto,1fr] md:items-center">
        
        <aside className="flex flex-col items-center gap-6 text-center">
          <AvatarBlock avatar={avatar} initials={initials(name)} />

          <div>
            <h1 id={headingId} className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {name}
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              {role}
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center">
              <InfoPill icon={MapPin} text={location} />
            </div>
          </div>

          <div className="mt-2 flex flex-col items-center gap-2 sm:flex-row md:items-center">
            <Button asChild size="sm" aria-label={primary.ariaLabel ?? primary.label}>
              <Link href={primary.href}>
                <Mail className="mr-2 h-4 w-4" aria-hidden />
                {primary.label}
              </Link>
            </Button>

            <Button
              asChild
              size="sm"
              variant="outline"
              aria-label={secondary.ariaLabel ?? secondary.label}
            >
              <a href={secondary.href} {...(secondary.download ? { download: true } : {})}>
                <Download className="mr-2 h-4 w-4" aria-hidden />
                {secondary.label}
              </a>
            </Button>
          </div>

          {social.length > 0 ? (
            <TooltipProvider delayDuration={120}>
              <nav aria-label="Social links" className="mt-5 flex items-center gap-2">
                {social.map((s) => (
                  <Tooltip key={s.href}>
                    <TooltipTrigger asChild>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="inline-flex size-10 items-center justify-center rounded-md border transition-colors hover:bg-muted"
                      >
                        <s.icon className="h-5 w-5" aria-hidden />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>{s.label}</TooltipContent>
                  </Tooltip>
                ))}
              </nav>
            </TooltipProvider>
          ) : null}

        </aside>

        <div className="space-y-4">
          <Card>
            <CardContent className="py-6">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              {highlights.length > 0 ? (
                <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <span className="mt-1 inline-block size-1.5 rounded-full bg-primary/60" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {techTags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {techTags.map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </CardContent>
          </Card>

          {stats.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {stats.map((s) => (
                <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
              ))}
            </div>
          ) : null}
        </div>

      </div>
      
    </section>
  );
}

/* --------------------------------- Parts --------------------------------- */

function AvatarBlock({
  avatar,
  initials,
}: {
  avatar: { src: string; alt: string };
  initials: string;
}): React.JSX.Element {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <div className="relative size-72 overflow-hidden rounded-xl border bg-muted">
      <Image
        src={avatar.src}
        alt={avatar.alt}
        fill
        sizes="288px"
        className={cn("object-cover transition-opacity", loaded ? "opacity-100" : "opacity-0")}
        onLoad={() => setLoaded(true)}
        priority={false}
        unoptimized
      />
      {!loaded ? (
        <div className="absolute inset-0 grid place-items-center text-xl font-semibold text-muted-foreground">
          {initials}
        </div>
      ) : null}
    </div>
  );
}

function InfoPill({
  icon: Icon,
  text,
}: {
  icon: LucideIcon;
  text: string;
}): React.JSX.Element {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs text-muted-foreground">
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {text}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: LucideIcon;
}): React.JSX.Element {
  return (
    <Card className="h-full">
      <CardContent className="flex items-center gap-3 py-4">
        {Icon ? (
          <span className="inline-flex size-9 items-center justify-center rounded-md border">
            <Icon className="h-4 w-4" aria-hidden />
          </span>
        ) : null}
        <div className="min-w-0">
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="font-medium tabular-nums">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}
