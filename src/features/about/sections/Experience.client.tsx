// src/features/about/sections/ExperienceTimeline.tsx
"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  CalendarDays, MapPin, Building2, Briefcase, GraduationCap,
  ExternalLink, Timer,
} from "lucide-react";

import type { ExperienceItem, Kind, Period, MonthStr, ExtLink } from "@/features/about/types";
import { EXPERIENCE_ITEMS } from "@/features/about/data/experience";

/* ────────────────────────────── Kind config ─────────────────────────────── */

const KIND_CONFIG: Record<Kind, {
  label: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  dot: string;
  badge: string;
}> = {
  work: {
    label: "Work",
    icon: Building2,
    dot: "bg-primary border-primary/30",
    badge: "bg-primary/10 text-primary",
  },
  freelance: {
    label: "Freelance",
    icon: Briefcase,
    dot: "bg-amber-500 border-amber-500/30",
    badge: "bg-amber-500/10 text-amber-500",
  },
  education: {
    label: "Education",
    icon: GraduationCap,
    dot: "bg-blue-500 border-blue-500/30",
    badge: "bg-blue-500/10 text-blue-500",
  },
};

/* ────────────────────────────── Component ───────────────────────────────── */

type ExperienceTimelineProps = {
  heading?: string;
  subheading?: string;
  items?: readonly ExperienceItem[];
  className?: string;
};

export default function ExperienceTimeline({
  heading = "Experience & Education",
  subheading = "Product-focused processes, measurable outcomes.",
  items = EXPERIENCE_ITEMS,
  className,
}: ExperienceTimelineProps): React.JSX.Element {
  const headingId = React.useId();
  const [activeKind, setActiveKind] = React.useState<Kind | "all">("all");

  const sorted = React.useMemo(() => {
    const arr = [...items].sort((a, b) => comparePeriod(a.period, b.period));
    if (activeKind === "all") return arr;
    return arr.filter((it) => it.kind === activeKind);
  }, [items, activeKind]);

  const kinds: Kind[] = ["work", "freelance", "education"];

  return (
    <section aria-labelledby={headingId} className={cn("py-12 sm:py-16", className)}>
      <div className="mb-8 flex flex-col gap-2">
        <h2 id={headingId} className="text-xl font-semibold tracking-tight sm:text-2xl">
          {heading}
        </h2>
        <p className="text-sm text-muted-foreground">{subheading}</p>
      </div>

      {/* Filter pills */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveKind("all")}
          aria-pressed={activeKind === "all"}
          className={cn(
            "rounded-full px-4 py-2 text-xs font-medium transition-all duration-200",
            activeKind === "all"
              ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
          )}
        >
          All
        </button>
        {kinds.map((k) => {
          const cfg = KIND_CONFIG[k];
          const Icon = cfg.icon;
          return (
            <button
              key={k}
              type="button"
              onClick={() => setActiveKind(k)}
              aria-pressed={activeKind === k}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-all duration-200",
                activeKind === k
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden />
              {cfg.label}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      {sorted.length > 0 ? (
        <div className="relative">
          {/* Vertical line */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/30 via-border to-transparent"
          />

          <div className="space-y-6">
            {sorted.map((item, i) => (
              <TimelineCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      ) : (
        <div className={cn(
          "flex flex-col items-center justify-center rounded-2xl border py-16 text-center",
          "border-border/50 bg-card/80",
        )}>
          <p className="text-sm text-muted-foreground">No items match this filter.</p>
          <button
            type="button"
            onClick={() => setActiveKind("all")}
            className="mt-3 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"
          >
            Show all
          </button>
        </div>
      )}
    </section>
  );
}

/* ─────────────────────────── Timeline Card ──────────────────────────────── */

function TimelineCard({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}): React.JSX.Element {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const cfg = KIND_CONFIG[item.kind];
  const Icon = cfg.icon;
  const duration = durationHuman(item.period);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "relative grid gap-4 pl-10 transition-[opacity,transform] duration-500 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
      style={{ transitionDelay: visible ? `${index * 120}ms` : "0ms" }}
    >
      {/* Timeline dot */}
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-5 z-10 flex size-[31px] items-center justify-center rounded-full border-[3px] bg-background",
          cfg.dot,
        )}
      >
        <Icon className="h-3.5 w-3.5 text-inherit" aria-hidden />
      </span>

      {/* Card */}
      <div className={cn(
        "group rounded-2xl border p-5 sm:p-6",
        "border-border/50 bg-card/80",
        "transition-[border-color,box-shadow] duration-200",
        "hover:border-primary/20 hover:shadow-md hover:shadow-primary/5",
      )}>
        {/* Header */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-base font-semibold sm:text-lg">{item.role}</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">{item.org}</p>
          </div>
          <span className={cn(
            "inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
            cfg.badge,
          )}>
            <Icon className="h-3.5 w-3.5" aria-hidden />
            {cfg.label}
          </span>
        </div>

        {/* Meta row */}
        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            <PeriodText period={item.period} />
          </span>
          {item.location ? (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {item.location}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1.5">
            <Timer className="h-3.5 w-3.5" aria-hidden />
            {duration}
          </span>
        </div>

        {/* Summary */}
        {item.summary ? (
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
        ) : null}

        {/* Achievements */}
        {item.achievements?.length ? (
          <div className="mb-4">
            <p className="mb-2 text-xs font-semibold text-foreground/70">Key Achievements</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {item.achievements.map((a) => (
                <li key={a} className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Responsibilities */}
        {item.responsibilities?.length ? (
          <div className="mb-4">
            <p className="mb-2 text-xs font-semibold text-foreground/70">Responsibilities</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {item.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Tags */}
        {item.tags?.length ? (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}

        {/* Links */}
        {item.links?.length ? (
          <div className="flex flex-wrap gap-2 border-t border-border/50 pt-4">
            {item.links.map((l) => (
              <LinkPill key={l.href} href={l.href} label={l.label} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ──────────────────────────────── Parts ─────────────────────────────────── */

function LinkPill({ href, label }: ExtLink): React.JSX.Element {
  const classes = cn(
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
    "text-muted-foreground transition-colors duration-150",
    "hover:bg-primary/10 hover:text-primary",
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} aria-label={label}>
        <ExternalLink className="h-3 w-3" aria-hidden />
        {label}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={classes} aria-label={label}>
      <ExternalLink className="h-3 w-3" aria-hidden />
      {label}
    </a>
  );
}

function PeriodText({ period }: { period: Period }): React.JSX.Element {
  const start = formatYYYYMM(period.start);
  const end = period.end ? formatYYYYMM(period.end) : "Present";
  return <span>{start} — {end}</span>;
}

/* ──────────────────────────────── Utils ─────────────────────────────────── */

function formatYYYYMM(s: `${number}-${MonthStr}`): string {
  const [y, m] = s.split("-") as [string, MonthStr];
  return `${monthName(m)} ${y}`;
}

function monthName(m: MonthStr): string {
  switch (m) {
    case "01": return "Jan";
    case "02": return "Feb";
    case "03": return "Mar";
    case "04": return "Apr";
    case "05": return "May";
    case "06": return "Jun";
    case "07": return "Jul";
    case "08": return "Aug";
    case "09": return "Sep";
    case "10": return "Oct";
    case "11": return "Nov";
    case "12": return "Dec";
  }
}

function comparePeriod(a: Period, b: Period): number {
  const aNum = toMonthIndex(a.start);
  const bNum = toMonthIndex(b.start);
  if (aNum === bNum) {
    const aEnd = a.end ? toMonthIndex(a.end) : Number.POSITIVE_INFINITY;
    const bEnd = b.end ? toMonthIndex(b.end) : Number.POSITIVE_INFINITY;
    return bEnd - aEnd;
  }
  return bNum - aNum;
}

function toMonthIndex(s: `${number}-${MonthStr}`): number {
  const [yStr, mStr] = s.split("-") as [string, MonthStr];
  return Number(yStr) * 12 + (Number(mStr) - 1);
}

function durationHuman(period: Period): string {
  const start = toMonthIndex(period.start);
  const end = period.end ? toMonthIndex(period.end) : currentMonthIndex();
  const months = Math.max(0, end - start + 1);
  const years = Math.floor(months / 12);
  const rem = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  if (rem > 0) parts.push(`${rem} ${rem === 1 ? "month" : "months"}`);
  if (parts.length === 0) return "< 1 month";
  return parts.join(" ");
}

function currentMonthIndex(): number {
  const d = new Date();
  return d.getFullYear() * 12 + d.getMonth();
}
