// src/features/about/sections/AboutIntro.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import { MapPin, Mail, Download, ArrowRight } from "lucide-react";

import type { Availability, Cta } from "@/features/about/types";
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
    availability = ABOUT_DEFAULTS.availability,
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
      <div className={cn(
        "rounded-2xl border p-6 sm:p-8",
        "border-border/50 bg-card/80 backdrop-blur-sm",
      )}>
        <div className="grid gap-8 md:grid-cols-[240px,1fr] md:items-start">

          {/* Left column — avatar + identity */}
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Avatar with gradient ring */}
            <div className="relative">
              <div className="rounded-2xl p-[3px] bg-gradient-to-br from-primary/80 to-primary/20">
                <AvatarBlock avatar={avatar} fallback={initials(name)} />
              </div>

              {/* Availability indicator */}
              {availability === "available" ? (
                <span className="absolute bottom-2 right-2 flex size-4 items-center justify-center">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
                  <span className="relative inline-flex size-3 rounded-full border-2 border-background bg-primary" />
                </span>
              ) : null}
            </div>

            {/* Name & role */}
            <div>
              <h2 id={headingId} className="text-xl font-bold tracking-tight sm:text-2xl">
                {name}
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">{role}</p>
            </div>

            {/* Location pill */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" aria-hidden />
              {location}
            </span>

            {/* CTA buttons */}
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <Button asChild size="sm" aria-label={primary.ariaLabel ?? primary.label}>
                <Link href={primary.href}>
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
                <a href={secondary.href} {...(secondary.download ? { download: true } : {})}>
                  <Download className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                  {secondary.label}
                </a>
              </Button>
            </div>

            {/* Social links */}
            {social.length > 0 ? (
              <nav aria-label="Social links" className="flex items-center gap-2">
                {social.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className={cn(
                      "inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-all",
                      "hover:bg-primary/10 hover:text-primary",
                    )}
                  >
                    <s.icon className="h-4 w-4" aria-hidden />
                  </a>
                ))}
              </nav>
            ) : null}
          </div>

          {/* Right column — bio + highlights + tags + stats */}
          <div className="space-y-6">
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
              <div className="grid gap-3 sm:grid-cols-2">
                {stats.map((s) => (
                  <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Parts --------------------------------- */

function AvatarBlock({
  avatar,
  fallback,
}: {
  avatar: { src: string; alt: string };
  fallback: string;
}): React.JSX.Element {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <div className="relative size-[234px] overflow-hidden rounded-xl bg-muted">
      <Image
        src={avatar.src}
        alt={avatar.alt}
        fill
        sizes="234px"
        className={cn("object-cover transition-opacity duration-500", loaded ? "opacity-100" : "opacity-0")}
        onLoad={() => setLoaded(true)}
        priority
      />
      {!loaded ? (
        <div className="absolute inset-0 grid place-items-center text-xl font-semibold text-muted-foreground">
          {fallback}
        </div>
      ) : null}
    </div>
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
    <div className={cn(
      "flex items-center gap-3 rounded-xl border border-border/50 px-4 py-3",
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
