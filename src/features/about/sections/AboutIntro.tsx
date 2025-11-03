// src/features/about/sections/AboutIntro.tsx
'use client';
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
import {
  MapPin,
  Mail,
  Download,
  Github,
  Linkedin,
  CheckCircle2,
  Circle,
  Gauge,
  FolderGit2,
} from "lucide-react";

type Href = "/" | `/${string}`;

// Support external links with a plain string
type SocialLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type Availability = "available" | "busy" | "unavailable";

type Cta = {
  href: Href | string;
  label: string;
  ariaLabel?: string;
  download?: boolean;
};

type AboutIntroProps = {
  name?: string;
  role?: string;
  location?: string;
  availability?: Availability;
  avatar?: { src: string; alt: string };
  bio?: readonly string[];
  highlights?: readonly string[];
  techTags?: readonly string[];
  social?: readonly SocialLink[];
  stats?: readonly { label: string; value: string; icon?: LucideIcon }[];
  primary?: Cta;   // /contact
  secondary?: Cta; // /cv/... download
  className?: string;
};

// Your CV file: public/cv/MuratZorlu-CV.pdf
const DEFAULT: Required<Pick<
  AboutIntroProps,
  | "name"
  | "role"
  | "location"
  | "availability"
  | "avatar"
  | "bio"
  | "highlights"
  | "techTags"
  | "social"
  | "stats"
  | "primary"
  | "secondary"
>> = {
  name: "Murat Zorlu",
  role: "Fullstack Web Developer",
  location: "Istanbul, Turkey",
  availability: "available",
  avatar: { src: "/images/profile.jpg", alt: "Murat Zorlu" },
  bio: [
    "I develop fast and maintainable web applications with Next.js + TypeScript.",
    "Performance, accessibility, and low-maintenance architectures are my priorities.",
  ],
  highlights: [
    "Architecture focused on RSC & Server Actions",
    "WCAG-compliant interfaces",
    "Edge-first delivery and caching",
  ],
  techTags: ["Next.js", "TypeScript", "Shadcn UI", "Tailwind CSS"],
  social: [
    { href: "https://github.com/username", label: "GitHub", icon: Github },
    { href: "https://www.linkedin.com/in/username", label: "LinkedIn", icon: Linkedin },
  ],
  stats: [
    { label: "Lighthouse", value: "95+", icon: Gauge },
    { label: "Projects", value: "20+", icon: FolderGit2 },
  ],
  primary: { href: "/contact", label: "Get in touch", ariaLabel: "Open contact page" },
  secondary: { href: "/cv/MuratZorlu-CV.pdf", label: "CV", ariaLabel: "Download CV", download: true },
};

export default function AboutIntro(props: AboutIntroProps): React.JSX.Element {
  const {
    name = DEFAULT.name,
    role = DEFAULT.role,
    location = DEFAULT.location,
    availability = DEFAULT.availability,
    avatar = DEFAULT.avatar,
    bio = DEFAULT.bio,
    highlights = DEFAULT.highlights,
    techTags = DEFAULT.techTags,
    social = DEFAULT.social,
    stats = DEFAULT.stats,
    primary = DEFAULT.primary,
    secondary = DEFAULT.secondary,
    className,
  } = props;

  const headingId = React.useId();

  return (
    <section
      aria-labelledby={headingId}
      className={cn(className)}
    >
      <div className="grid gap-8 md:grid-cols-[auto,1fr] md:items-start">
        {/* Left column: avatar + identity + actions */}
        <aside className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
          <AvatarBlock avatar={avatar} initials={initials(name)} />

          <div>
            <h1 id={headingId} className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{role}</p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <InfoPill icon={MapPin} text={location} />
              <AvailabilityPill status={availability} />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row md:items-start">
            <Button asChild size="sm" aria-label={primary.ariaLabel ?? primary.label}>
              <Link href={primary.href as Href}>
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

          {/* Social links */}
          {social.length > 0 ? (
            <TooltipProvider delayDuration={120}>
              <nav aria-label="Social links" className="mt-1 flex items-center gap-2">
                {social.map((s) => (
                  <Tooltip key={s.href}>
                    <TooltipTrigger asChild>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="inline-flex size-9 items-center justify-center rounded-md border transition-colors hover:bg-muted"
                      >
                        <s.icon className="h-4 w-4" aria-hidden />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>{s.label}</TooltipContent>
                  </Tooltip>
                ))}
              </nav>
            </TooltipProvider>
          ) : null}
        </aside>

        {/* Right column: bio + highlights + stats */}
        <div className="space-y-6">
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
                    <li key={h} className="flex items-start gap-2">
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
    <div className="relative size-28 overflow-hidden rounded-xl border bg-muted">
      <Image
        src={avatar.src}
        alt={avatar.alt}
        fill
        sizes="112px"
        className={cn("object-cover transition-opacity", loaded ? "opacity-100" : "opacity-0")}
        onLoad={() => setLoaded(true)}
        priority={false}
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

function AvailabilityPill({ status }: { status: Availability }): React.JSX.Element {
  const cfg =
    status === "available"
      ? { color: "bg-emerald-500", label: "Available" }
      : status === "busy"
      ? { color: "bg-amber-500", label: "Busy" }
      : { color: "bg-destructive", label: "Not available" };

  const Icon = status === "available" ? CheckCircle2 : Circle;

  return (
    <span className="inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs text-muted-foreground">
      <span className={cn("inline-flex size-2.5 rounded-full", cfg.color)} />
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {cfg.label}
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

/* -------------------------------- Utils ---------------------------------- */

function initials(fullName: string): string {
  const parts = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const take = parts.length >= 2 ? [parts[0], parts[parts.length - 1]] : parts;
  return take.map((p) => p[0]?.toUpperCase() ?? "").join("");
}
