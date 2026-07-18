// src/features/about/sections/AboutIntro.tsx
"use client";

import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import { MapPin, Download, ArrowRight } from "lucide-react";

import type { Availability, Cta } from "@/features/about/types";
import { ABOUT_DEFAULTS } from "@/features/about/data/about-intro";

type AboutIntroProps = {
  name?: string;
  role?: string;
  location?: string;
  availability?: Availability;
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
    availability = ABOUT_DEFAULTS.availability,
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
      <div className={cn("plate rounded-2xl border p-6 sm:p-8")}>
        <div className="space-y-8">

          {/* Identity header */}
          <header className="space-y-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h2 id={headingId} className="text-2xl font-bold tracking-tight sm:text-3xl">
                {name}
              </h2>
              {availability === "available" ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  <span className="relative inline-flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
                    <span className="relative inline-flex size-2 rounded-full bg-primary" />
                  </span>
                  Available for work
                </span>
              ) : null}
            </div>
            <p className="text-sm text-muted-foreground sm:text-base">{role}</p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" aria-hidden />
              {location}
            </span>
          </header>

          {/* CTAs + social */}
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="sm" aria-label={primary.ariaLabel ?? primary.label}>
              <Link href={primary.href} draggable={false}>
                {primary.label}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden />
              </Link>
            </Button>

            <Button
              asChild
              size="sm"
              variant="outline"
              aria-label={secondary.ariaLabel ?? secondary.label}
            >
              <a href={secondary.href} {...(secondary.download ? { download: true } : {})} draggable={false}>
                <Download className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                {secondary.label}
              </a>
            </Button>

            {social.length > 0 ? (
              <nav aria-label="Social links" className="ml-auto flex items-center gap-1">
                {social.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    draggable={false}
                    aria-label={s.label}
                    className={cn(
                      "inline-flex size-9 select-none items-center justify-center rounded-lg text-muted-foreground interactive",
                      "hover:bg-primary/10 hover:text-primary",
                    )}
                  >
                    <s.icon className="h-4 w-4" aria-hidden />
                  </a>
                ))}
              </nav>
            ) : null}
          </div>

          {/* Bio */}
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {/* Highlights */}
          {highlights.length > 0 ? (
            <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-2">
                  <span className="inline-block size-1 rounded-full bg-primary" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {/* Languages */}
          <p className="text-sm text-muted-foreground">
            Languages: Turkish (Native) · English (B2) · German (A2)
          </p>

          {/* Tech tags */}
          {techTags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {techTags.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}

          {/* Stats */}
          {stats.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
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
    <div className={cn(
      "flex items-center gap-3 rounded-xl border border-[var(--edge-soft)] px-4 py-3",
      "transition-colors hover:border-primary/20",
    )}>
      {Icon ? (
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" aria-hidden />
        </div>
      ) : null}
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-bold text-primary tabular-nums">{value}</div>
      </div>
    </div>
  );
}
