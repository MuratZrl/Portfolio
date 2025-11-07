// src/features/about/sections/ExperienceTimeline.tsx
"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays, MapPin, Building2, Briefcase, GraduationCap,
  ExternalLink, Timer, Filter as FilterIcon, X, Info,
} from "lucide-react";

import type { ExperienceItem, Kind, Period, MonthStr, ExtLink } from "@/features/about/types";
import { EXPERIENCE_ITEMS } from "@/features/about/data/experience";

/* ------------------------------------------------------------------------ */
/* Local types                                                              */
/* ------------------------------------------------------------------------ */

type FilterState = {
  query: string;
  kinds: ReadonlySet<Kind> | null; // null -> all
  tags: ReadonlySet<string> | null; // null -> all
  sort: "newest" | "oldest";
  groupByYear: boolean;
};

type ExperienceTimelineProps = {
  heading?: string;
  subheading?: string;
  items?: readonly ExperienceItem[];
  className?: string;
  /** Initial filter state. If not provided, everything is enabled. */
  defaultFilter?: Partial<FilterState>;
  /** Simulate external loading state. */
  isLoading?: boolean;
  /** Should clicking tag badges filter the list */
  tagFilteringEnabled?: boolean;
};

/* ------------------------------------------------------------------------ */
/* Component                                                                */
/* ------------------------------------------------------------------------ */

export default function ExperienceTimeline({
  heading = "Experience & Education",
  subheading = "Product-focused processes, measurable outcomes.",
  items = EXPERIENCE_ITEMS,
  className,
  defaultFilter,
  isLoading = false,
  tagFilteringEnabled = true,
}: ExperienceTimelineProps): React.JSX.Element {
  const headingId = React.useId();

  const [filter, setFilter] = React.useState<FilterState>(() => ({
    query: defaultFilter?.query ?? "",
    kinds: defaultFilter?.kinds != null ? new Set(defaultFilter.kinds) : null,
    tags: defaultFilter?.tags != null ? new Set(defaultFilter.tags) : null,
    sort: defaultFilter?.sort ?? "newest",
    groupByYear: defaultFilter?.groupByYear ?? true,
  }));

  // Sort items by period. comparePeriod returns newest-first by default.
  const normalized = React.useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      const base = comparePeriod(a.period, b.period); // newest-first
      return filter.sort === "newest" ? base : -base;
    });
    return sorted;
  }, [items, filter.sort]);

  const allTags = React.useMemo(() => {
    const set = new Set<string>();
    for (const it of items) for (const t of it.tags ?? []) set.add(t);
    return [...set].sort((a, b) => a.localeCompare(b, "en"));
  }, [items]);

  const filtered = React.useMemo(() => {
    const q = filter.query.trim().toLocaleLowerCase("en");
    return normalized.filter((it) => {
      if (filter.kinds && !filter.kinds.has(it.kind)) return false;
      if (filter.tags && (it.tags ?? []).every((t) => !filter.tags!.has(t))) return false;
      if (q.length > 0) {
        const hay = [
          it.role, it.org, it.summary ?? "",
          ...(it.achievements ?? []),
          ...(it.tags ?? []),
        ].join(" ").toLocaleLowerCase("en");
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [normalized, filter.kinds, filter.tags, filter.query]);

  // Group by year with prefixed keys to preserve insertion order in objects.
  const grouped = React.useMemo(() => {
    if (!filter.groupByYear) return { __all__: filtered } as const;
    const map = new Map<string, ExperienceItem[]>();
    for (const it of filtered) {
      const year = it.period.start.split("-")[0]!;
      const key = `y-${year}`;
      const arr = map.get(key) ?? [];
      arr.push(it);
      map.set(key, arr);
    }
    const toYear = (k: string) => Number(k.slice(2)); // "y-2024" -> 2024
    const sortedEntries = [...map.entries()].sort(([a], [b]) =>
      filter.sort === "newest" ? toYear(b) - toYear(a) : toYear(a) - toYear(b)
    );
    return Object.fromEntries(sortedEntries) as Record<string, ExperienceItem[]>;
  }, [filtered, filter.groupByYear, filter.sort]);

  return (
    <section aria-labelledby={headingId} className={cn("py-12 sm:py-16", className)}>
      <div className="mb-6 flex flex-col gap-2">
        <h2 id={headingId} className="text-xl font-semibold tracking-tight sm:text-2xl">
          {heading}
        </h2>
        <p className="text-sm text-muted-foreground">{subheading}</p>
      </div>

      <ControlsBar filter={filter} setFilter={setFilter} allTags={allTags} />

      <Separator className="my-6" />

      {isLoading ? (
        <SkeletonList />
      ) : totalCount(grouped) === 0 ? (
        <EmptyState clearFilters={() => setFilter((f) => ({ ...f, query: "", kinds: null, tags: null }))} />
      ) : (
        <TimelineList
          grouped={grouped}
          tagFilteringEnabled={tagFilteringEnabled}
          onTagClick={(t) =>
            setFilter((f) => {
              const next = new Set([...(f.tags ?? [])]);
              if (next.has(t)) next.delete(t);
              else next.add(t);
              return { ...f, tags: next.size === 0 ? null : next };
            })
          }
        />
      )}
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Controls                                                                 */
/* ------------------------------------------------------------------------ */

function ControlsBar({
  filter, setFilter, allTags,
}: {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  allTags: readonly string[];
}): React.JSX.Element {
  const kinds: readonly {
    k: Kind;
    label: string;
    icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  }[] = [
    { k: "work", label: "Work", icon: Building2 },
    { k: "freelance", label: "Freelance", icon: Briefcase },
    { k: "education", label: "Education", icon: GraduationCap },
  ];

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FilterIcon className="h-4 w-4" aria-hidden />
          <span>Filters</span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-2">
            {kinds.map(({ k, label, icon: Ico }) => {
              const active = filter.kinds == null || filter.kinds.has(k);
              return (
                <Button
                  key={k}
                  type="button"
                  variant={active ? "default" : "secondary"}
                  size="sm"
                  className="gap-2"
                  onClick={() =>
                    setFilter((f) => {
                      if (f.kinds == null) return { ...f, kinds: new Set<Kind>([k]) };
                      const next = new Set(f.kinds);
                      if (next.has(k)) next.delete(k);
                      else next.add(k);
                      return { ...f, kinds: next.size === 0 ? null : next };
                    })
                  }
                  aria-pressed={active}
                >
                  <Ico className="h-4 w-4" aria-hidden />
                  {label}
                </Button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setFilter((f) => ({ ...f, sort: f.sort === "newest" ? "oldest" : "newest" }))}
              aria-label="Toggle sort order"
            >
              {filter.sort === "newest" ? "Newest → Oldest" : "Oldest → Newest"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setFilter((f) => ({ ...f, groupByYear: !f.groupByYear }))}
              aria-label="Toggle group by year"
            >
              {filter.groupByYear ? "Group by year: On" : "Group by year: Off"}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:w-96">
          <Input
            value={filter.query}
            onChange={(e) => setFilter((f) => ({ ...f, query: e.currentTarget.value }))}
            placeholder="Search: role, org, tag…"
            aria-label="Search timeline"
          />
          {filter.query.length > 0 ? (
            <button
              type="button"
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:bg-muted"
              onClick={() => setFilter((f) => ({ ...f, query: "" }))}
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          ) : null}
        </div>

        <ActiveTagFilters
          tags={filter.tags}
          clearOne={(t) =>
            setFilter((f) => {
              if (!f.tags) return f;
              const next = new Set(f.tags);
              next.delete(t);
              return { ...f, tags: next.size === 0 ? null : next };
            })
          }
          clearAll={() => setFilter((f) => ({ ...f, tags: null }))}
        />
      </div>

      {allTags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {allTags.map((t) => {
            const active = filter.tags?.has(t) ?? false;
            return (
              <button
                key={t}
                type="button"
                className={cn(
                  "inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs transition-colors",
                  active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}
                onClick={() =>
                  setFilter((f) => {
                    const next = new Set([...(f.tags ?? [])]);
                    if (next.has(t)) next.delete(t);
                    else next.add(t);
                    return { ...f, tags: next.size === 0 ? null : next };
                  })
                }
                aria-pressed={active}
              >
                #{t}
                {active ? <X className="h-3.5 w-3.5" aria-hidden /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function ActiveTagFilters({
  tags, clearOne, clearAll,
}: {
  tags: ReadonlySet<string> | null;
  clearOne: (t: string) => void;
  clearAll: () => void;
}): React.JSX.Element | null {
  if (!tags || tags.size === 0) return null;
  const arr = [...tags].sort((a, b) => a.localeCompare(b, "en"));

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-muted-foreground">Active tags:</span>
      {arr.map((t) => (
        <span key={t} className="inline-flex items-center gap-1 rounded-md border bg-muted px-2 py-0.5 text-xs">
          #{t}
          <button
            type="button"
            aria-label={`Remove ${t} filter`}
            onClick={() => clearOne(t)}
            className="rounded p-0.5 hover:bg-background"
          >
            <X className="h-3 w-3" aria-hidden />
          </button>
        </span>
      ))}
      <Button type="button" size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={clearAll}>
        Clear all
      </Button>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Timeline List                                                            */
/* ------------------------------------------------------------------------ */

function TimelineList({
  grouped, onTagClick, tagFilteringEnabled,
}: {
  grouped: Record<string, readonly ExperienceItem[]> | { __all__: readonly ExperienceItem[] };
  onTagClick: (tag: string) => void;
  tagFilteringEnabled: boolean;
}): React.JSX.Element {
  const groups = Object.entries(grouped);

  return (
    <ol className="relative space-y-8">
      <div aria-hidden className="pointer-events-none absolute left-4 top-0 h-full w-px bg-border sm:left-28" />
      {groups.map(([key, items]) => (
        <li key={key} className="relative">
          {key !== "__all__" ? <YearHeader year={key.startsWith("y-") ? key.slice(2) : key} count={items.length} /> : null}
          <div className="mt-4 space-y-8">
            {items.map((item, idx) => (
              <TimelineRow
                key={item.id}
                item={item}
                last={idx === items.length - 1}
                onTagClick={onTagClick}
                tagFilteringEnabled={tagFilteringEnabled}
              />
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}

function YearHeader({ year, count }: { year: string; count: number }): React.JSX.Element {
  return (
    <div className="sticky top-16 z-10 -ml-1 inline-flex items-center gap-3 rounded-md bg-background/70 px-2 py-1 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <span className="text-sm font-medium">{year}</span>
      <Badge variant="secondary" className="text-[10px]">{count}</Badge>
    </div>
  );
}

/* ---------------------------------- Row ---------------------------------- */

function TimelineRow({
  item, last, onTagClick, tagFilteringEnabled,
}: {
  item: ExperienceItem;
  last: boolean;
  onTagClick: (tag: string) => void;
  tagFilteringEnabled: boolean;
}): React.JSX.Element {
  const icon = item.kind === "education" ? GraduationCap : item.kind === "freelance" ? Briefcase : Building2;
  const duration = durationHumanTR(item.period);

  return (
    <div className="grid gap-4 sm:grid-cols-[9rem_1fr]">
      <div className="relative pl-10 sm:pl-0">
        <Dot kind={item.kind} />
        <div className="flex flex-col text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            <PeriodText period={item.period} />
          </span>

          {item.location ? (
            <span className="mt-1 inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {item.location}
            </span>
          ) : null}

          <span className="mt-1 inline-flex items-center gap-2">
            <Timer className="h-3.5 w-3.5" aria-hidden />
            {duration}
          </span>
        </div>

        {!last ? (
          <div aria-hidden className="pointer-events-none absolute left-4 top-9 hidden h-[calc(100%_-_2.25rem)] w-px bg-border sm:left-auto sm:hidden" />
        ) : null}
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle className="text-base sm:text-lg">{item.role}</CardTitle>
              <CardDescription className="mt-0.5">{item.org}</CardDescription>
            </div>
            <span className="inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs text-muted-foreground">
              {React.createElement(icon, { className: "h-3.5 w-3.5", "aria-hidden": true })}
              {labelForKind(item.kind)}
            </span>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          {item.summary ? <p className="text-sm text-muted-foreground">{item.summary}</p> : null}

          {item.achievements?.length ? (
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {item.achievements.map((a) => (
                <li key={a} className="flex items-start gap-2">
                  <span className="mt-1 inline-block size-1.5 rounded-full bg-primary/60" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {item.responsibilities?.length ? (
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium text-muted-foreground">Responsibilities</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {item.responsibilities.map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <span className="mt-1 inline-block size-1.5 rounded-full bg-muted-foreground/40" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {item.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className={cn("cursor-default", tagFilteringEnabled ? "cursor-pointer hover:bg-muted" : "")}
                  onClick={tagFilteringEnabled ? () => onTagClick(t) : undefined}
                >
                  #{t}
                </Badge>
              ))}
            </div>
          ) : null}
        </CardContent>

        {(item.links?.length ?? 0) > 0 ? (
          <CardFooter className="mt-auto">
            <div className="flex flex-wrap gap-2">
              {item.links!.map((l) => (
                <LinkPill key={l.href} href={l.href} label={l.label} />
              ))}
            </div>
          </CardFooter>
        ) : null}
      </Card>
    </div>
  );
}

/* --------------------------------- Bits ---------------------------------- */

function Dot({ kind }: { kind: Kind }): React.JSX.Element {
  const ring = kind === "education" ? "ring-blue-500" : kind === "freelance" ? "ring-amber-500" : "ring-primary";
  const fill = kind === "education" ? "bg-blue-500/90" : kind === "freelance" ? "bg-amber-500/90" : "bg-primary";

  return (
    <span
      aria-hidden
      className={cn("absolute left-0 top-1.5 inline-flex size-3.5 -translate-x-1/2 items-center justify-center rounded-full ring-2", ring)}
    >
      <span className={cn("block size-2 rounded-full", fill)} />
    </span>
  );
}

function labelForKind(k: Kind): string {
  switch (k) {
    case "work": return "Work";
    case "freelance": return "Freelance";
    case "education": return "Education";
  }
}

function LinkPill({ href, label }: ExtLink): React.JSX.Element {
  const isInternal = href.startsWith("/");

  const classes = cn(
    "inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs transition-colors hover:bg-muted"
  );

  if (isInternal) {
    return (
      <Link href={href} className={classes} aria-label={label}>
        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={classes} aria-label={label}>
      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      <span>{label}</span>
    </a>
  );
}

function PeriodText({ period }: { period: Period }): React.JSX.Element {
  const start = formatYYYYMM(period.start);
  const end = period.end ? formatYYYYMM(period.end) : "Present";
  return <span>{start} — {end}</span>;
}

/* ------------------------------- Empty/Skeleton -------------------------- */

function EmptyState({ clearFilters }: { clearFilters: () => void }): React.JSX.Element {
  return (
    <div className="flex flex-col items-start gap-4 rounded-lg border p-6">
      <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
        <Info className="h-4 w-4" aria-hidden />
        <span>No matching records found.</span>
      </div>
      <div className="text-sm text-muted-foreground">
        You narrowed the filters and made life harder for yourself. If you want to wipe them and try again:
      </div>
      <Button type="button" onClick={clearFilters}>
        Clear filters
      </Button>
    </div>
  );
}

function SkeletonList(): React.JSX.Element {
  return (
    <div className="space-y-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="grid gap-4 sm:grid-cols-[9rem_1fr]">
          <div className="relative pl-10 sm:pl-0">
            <div className="absolute left-0 top-1.5 inline-flex size-3.5 -translate-x-1/2 items-center justify-center rounded-full ring-2 ring-muted-foreground/30">
              <span className="block size-2 rounded-full bg-muted-foreground/30" />
            </div>
            <div className="mt-1 h-4 w-28 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-4 w-20 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-4 w-16 animate-pulse rounded bg-muted" />
          </div>
          <Card>
            <CardHeader className="pb-0">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div className="h-5 w-40 animate-pulse rounded bg-muted" />
                <div className="h-5 w-20 animate-pulse rounded bg-muted" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-4 w-11/12 animate-pulse rounded bg-muted" />
              <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-muted" />
              <div className="mt-4 flex gap-2">
                <div className="h-6 w-16 animate-pulse rounded bg-muted" />
                <div className="h-6 w-14 animate-pulse rounded bg-muted" />
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------- Utils ---------------------------------- */

function formatYYYYMM(s: `${number}-${MonthStr}`): string {
  const [y, m] = s.split("-") as [string, MonthStr];
  return `${monthNameTR(m)} ${y}`;
}

function monthNameTR(m: MonthStr): string {
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
    return bEnd - aEnd; // longer first if same start month
  }
  return bNum - aNum; // newer first
}

function toMonthIndex(s: `${number}-${MonthStr}`): number {
  const [yStr, mStr] = s.split("-") as [string, MonthStr];
  const y = Number(yStr);
  const m = Number(mStr);
  return y * 12 + (m - 1);
}

function durationHumanTR(period: Period): string {
  const start = toMonthIndex(period.start);
  const end = period.end ? toMonthIndex(period.end) : currentMonthIndex();
  const months = Math.max(0, end - start + 1);
  const years = Math.floor(months / 12);
  const rem = months % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  if (rem > 0) parts.push(`${rem} ${rem === 1 ? "month" : "months"}`);
  if (parts.length === 0) return "Less than 1 month";
  return parts.join(" ");
}

function currentMonthIndex(): number {
  const d = new Date();
  return d.getFullYear() * 12 + d.getMonth();
}

function totalCount(grouped: Record<string, readonly ExperienceItem[]> | { __all__: readonly ExperienceItem[] }): number {
  if ("__all__" in grouped) return grouped.__all__.length;
  return Object.values(grouped).reduce((acc, arr) => acc + arr.length, 0);
}
