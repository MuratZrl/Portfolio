// src/features/about/sections/Experience.client.tsx
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

/**
 * `badge` was text-[color:var(--edge)] for freelance, which is 3.32:1 on the
 * card surface: a real AA failure on body-sized label text, not a near miss.
 * --edge is a boundary token, sized for the 3:1 non-text threshold, and it was
 * being used to colour words. Freelance takes --text-muted now.
 *
 * Losing the third colour costs nothing, because colour was never the channel
 * here: every badge carries its own icon and its own label text.
 */
const KIND_CONFIG: Record<Kind, {
  label: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  dot: string;
  badge: string;
}> = {
  work: {
    label: "Employment",
    icon: Building2,
    dot: "bg-[var(--accent)] border-[var(--accent)] text-[var(--on-accent)]",
    badge: "text-[var(--accent)]",
  },
  freelance: {
    label: "Client project",
    icon: Briefcase,
    dot: "bg-[var(--edge)] border-[var(--edge)] text-[var(--ground)]",
    badge: "text-[var(--text-muted)]",
  },
  education: {
    label: "Education",
    icon: GraduationCap,
    dot: "bg-[var(--accent)] border-[var(--accent)] text-[var(--on-accent)]",
    badge: "text-[var(--accent)]",
  },
};

/* ────────────────────────────── Component ───────────────────────────────── */

type ExperienceTimelineProps = {
  items?: readonly ExperienceItem[];
  className?: string;
};

/**
 * The section heading and subheading are deleted, not rewritten. This sits
 * under the /about h1, so the timeline is self-describing, and the old
 * subhead ("Product-focused processes, measurable outcomes.") was exactly the
 * unfalsifiable register the copy rules ban. The section is named for
 * assistive tech by aria-label instead.
 */
export default function ExperienceTimeline({
  items = EXPERIENCE_ITEMS,
  className,
}: ExperienceTimelineProps): React.JSX.Element {
  const [activeKind, setActiveKind] = React.useState<Kind | "all">("all");

  const sorted = React.useMemo(() => {
    const arr = [...items].sort((a, b) => comparePeriod(a.period, b.period));
    if (activeKind === "all") return arr;
    return arr.filter((it) => it.kind === activeKind);
  }, [items, activeKind]);

  const kinds: Kind[] = ["work", "freelance", "education"];

  /* Same call as the /projects filter: these carry aria-pressed, so they are
     controls and take the button recipe rather than .chip. */
  const pillClass = (isActive: boolean): string =>
    cn(
      "soft-btn inline-flex min-h-9 select-none items-center gap-1.5 px-4",
      "text-[length:var(--text-body-xs)] font-medium",
      isActive ? "soft-btn-primary" : "soft-btn-ghost",
    );

  return (
    <section
      aria-label="Experience and education"
      className={cn("py-10 sm:py-12", className)}
    >
      {/* Contract B: a group of toggle buttons, all tabbable, no arrow keys.
          The group needs its own accessible name, or the pills are five
          unexplained controls to a screen-reader user. */}
      <div
        role="group"
        aria-label="Filter experience by type"
        className="mb-8 flex flex-wrap gap-2"
      >
        <button
          type="button"
          onClick={() => setActiveKind("all")}
          aria-pressed={activeKind === "all"}
          className={pillClass(activeKind === "all")}
        >
          All
        </button>
        {kinds.map((k) => {
          const cfg = KIND_CONFIG[k];
          const Icon = cfg.icon;
          const isActive = activeKind === k;
          return (
            <button
              key={k}
              type="button"
              onClick={() => setActiveKind(k)}
              aria-pressed={isActive}
              className={pillClass(isActive)}
            >
              <Icon className="size-3.5" aria-hidden />
              {cfg.label}
            </button>
          );
        })}
      </div>

      {sorted.length > 0 ? (
        <div className="relative">
          {/* Was a bg-gradient-to-b from-primary/30 via-border to-transparent.
              A hairline rule is what --edge-soft is for. */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-2 left-[15px] top-2 w-px bg-[var(--edge-soft)]"
          />

          <div className="space-y-6">
            {sorted.map((item, i) => (
              <TimelineCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      ) : (
        <div className="plate flex flex-col items-center justify-center py-16 text-center">
          <p className="text-[length:var(--text-body-sm)] text-[var(--text-muted)]">
            No items match this filter.
          </p>
          <button
            type="button"
            onClick={() => setActiveKind("all")}
            className="soft-btn soft-btn-primary mt-3 inline-flex min-h-9 select-none items-center px-4 text-[length:var(--text-body-xs)] font-medium"
          >
            Show all
          </button>
        </div>
      )}
    </section>
  );
}

/* ─────────────────────────── Timeline Card ──────────────────────────────── */

/**
 * The reveal is [data-enter], the system's entrance animation, driven by the
 * --i stagger custom property.
 *
 * It replaces a per-card IntersectionObserver plus useState plus a
 * transition-[opacity,transform] utility and a hand-computed transitionDelay.
 * One behaviour change worth knowing: the old version waited until a card
 * scrolled into view, this one runs on mount like every other entrance on the
 * site. Both are covered by the prefers-reduced-motion block in globals.
 */
function TimelineCard({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}): React.JSX.Element {
  const cfg = KIND_CONFIG[item.kind];
  const Icon = cfg.icon;
  const duration = durationHuman(item.period);

  return (
    <div
      data-enter
      style={{ "--i": index } as React.CSSProperties}
      className="relative grid gap-4 pl-10"
    >
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-5 z-10 flex size-[31px] items-center justify-center rounded-full border-[3px] bg-[var(--ground)]",
          cfg.dot,
        )}
      >
        <Icon className="size-3.5 text-inherit" aria-hidden />
      </span>

      {/* .plate, and deliberately NOT .interactive. This card is not a link
          and not focusable; the old version carried `interactive` plus a
          hover border and shadow, advertising a click target that does not
          exist. The links inside it are the interactive parts. */}
      <div className="plate p-5 sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-[length:var(--text-display-2xs)] leading-[1.3] text-[var(--text)]">
              {item.role}
            </h3>
            <p className="mt-0.5 text-[length:var(--text-body-sm)] text-[var(--text-muted)]">
              {item.org}
            </p>
          </div>
          <span
            className={cn(
              "inline-flex w-fit items-center gap-1.5 text-[length:var(--text-body-xs)] font-medium",
              cfg.badge,
            )}
          >
            <Icon className="size-3.5" aria-hidden />
            {cfg.label}
          </span>
        </div>

        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-[length:var(--text-body-xs)] text-[var(--text-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" aria-hidden />
            <PeriodText period={item.period} />
          </span>
          {item.location ? (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden />
              {item.location}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1.5">
            <Timer className="size-3.5" aria-hidden />
            {duration}
          </span>
        </div>

        {item.summary ? (
          <p className="mb-4 text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--text-muted)]">
            {item.summary}
          </p>
        ) : null}

        {item.achievements?.length ? (
          <div className="mb-4">
            {/* Was text-foreground/70, an opacity knock-back on text. The
                system has a token for secondary text. */}
            <p className="mb-2 text-[length:var(--text-body-xs)] font-semibold text-[var(--text)]">
              Key Achievements
            </p>
            <ul className="space-y-2 text-[length:var(--text-body-sm)] text-[var(--text-muted)]">
              {item.achievements.map((a) => (
                <li key={a} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {item.responsibilities?.length ? (
          <div className="mb-4">
            <p className="mb-2 text-[length:var(--text-body-xs)] font-semibold text-[var(--text)]">
              Responsibilities
            </p>
            <ul className="space-y-2 text-[length:var(--text-body-sm)] text-[var(--text-muted)]">
              {item.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-[var(--edge)]" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {item.tags?.length ? (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span
                key={t}
                className="chip px-2 py-0.5 text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-[var(--text-muted)]"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}

        {item.links?.length ? (
          <div className="flex flex-wrap gap-2 border-t border-[var(--edge-soft)] pt-4">
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
    "soft-btn soft-btn-ghost inline-flex min-h-9 select-none items-center gap-1.5 px-3",
    "text-[length:var(--text-body-xs)] font-medium",
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} draggable={false} className={classes} aria-label={label}>
        <ExternalLink className="size-3" aria-hidden />
        {label}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      draggable={false}
      className={classes}
      aria-label={label}
    >
      <ExternalLink className="size-3" aria-hidden />
      {label}
    </a>
  );
}

function PeriodText({ period }: { period: Period }): React.JSX.Element {
  const start = formatYYYYMM(period.start);
  const end = period.end ? formatYYYYMM(period.end) : "Present";
  /* En dash, not em: a date range is the one place a dash is the correct
     typography rather than a stylistic tic. U+2013, so the em-dash sweep
     stays clean. */
  return <span>{start} – {end}</span>;
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
