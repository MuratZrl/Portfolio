// src/features/about/sections/Faq.client.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Search, Link2, X, MessageCircleQuestion } from "lucide-react";

import type { QA } from "@/features/about/types";
import { FAQ_ITEMS } from "@/features/about/data/FAQ";

/* ─────────────────────────── Category icon map ─────────────────────────── */

const CATEGORY_COLORS: Record<string, string> = {
  Process: "bg-blue-500/10 text-blue-500",
  Quality: "bg-amber-500/10 text-amber-500",
  Technical: "bg-primary/10 text-primary",
  Delivery: "bg-violet-500/10 text-violet-500",
};

/* ────────────────────────────── Component ───────────────────────────────── */

type FaqProps = {
  heading?: string;
  subheading?: string;
  items?: readonly QA[];
  defaultCategory?: QA["category"] | "All";
  maxVisible?: number;
  className?: string;
};

export default function Faq({
  heading = "FAQ",
  subheading = "Frequently asked questions with clear answers.",
  items = FAQ_ITEMS,
  defaultCategory = "All",
  maxVisible = 8,
  className,
}: FaqProps): React.JSX.Element {
  const headingId = React.useId();

  const categories = React.useMemo(() => {
    const set = new Set<string>(["All"]);
    for (const q of items) set.add(q.category);
    return Array.from(set) as (QA["category"] | "All")[];
  }, [items]);

  const [openItem, setOpenItem] = React.useState<string | undefined>(undefined);
  const [query, setQuery] = React.useState("");
  const [activeCategory, setActiveCategory] =
    React.useState<QA["category"] | "All">(defaultCategory);
  const [copied, setCopied] = React.useState<string | null>(null);

  // Hash-based deep linking
  React.useEffect(() => {
    const apply = (): void => setOpenItem(getHashId());
    apply();
    window.addEventListener("hashchange", apply, { passive: true });
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  // Filtered items
  const prepared = React.useMemo(() => {
    const q = normalize(query);
    const rows = items.map(attachId);
    return rows.filter((r) => {
      const byCategory = activeCategory === "All" || r.category === activeCategory;
      if (!byCategory) return false;
      if (!q) return true;
      return normalize(r.question).includes(q) || normalize(r.answer).includes(q);
    });
  }, [items, query, activeCategory]);

  const totalCount = prepared.length;

  // Ensure anchored item is always visible
  const visibleRows = React.useMemo(() => {
    const base = prepared.slice(0, Math.max(0, maxVisible));
    if (!openItem) return base;
    const anchoredIdx = prepared.findIndex((r) => r.id === openItem);
    if (anchoredIdx === -1) return base;
    const anchored = prepared[anchoredIdx];
    if (base.some((r) => r.id === anchored.id)) return base;
    if (base.length === 0) return [anchored];
    const deduped = base.filter((r) => r.id !== anchored.id);
    if (deduped.length >= maxVisible) deduped.pop();
    deduped.push(anchored);
    return deduped;
  }, [prepared, maxVisible, openItem]);

  const handleCopy = React.useCallback(async (slug: string) => {
    await copyLink(slug);
    setCopied(slug);
    setTimeout(() => setCopied(null), 1500);
  }, []);

  return (
    <section aria-labelledby={headingId} className={cn("py-12 sm:py-16", className)}>
      <div className="mb-8 flex flex-col gap-2">
        <h2 id={headingId} className="text-xl font-semibold tracking-tight sm:text-2xl">
          {heading}
        </h2>
        <p className="text-sm text-muted-foreground">{subheading}</p>
      </div>

      {/* Control bar */}
      <div className={cn(
        "mb-6 rounded-2xl border p-4 sm:p-5",
        "border-border/50 bg-card/80 backdrop-blur-sm",
      )}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              aria-label="Search in FAQ"
              className={cn(
                "h-9 w-full rounded-full border border-border/50 bg-background/60 pl-9 pr-9 text-sm",
                "placeholder:text-muted-foreground",
                "outline-none transition-all",
                "focus:border-primary/40 focus:ring-2 focus:ring-primary/20",
              )}
            />
            {query ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            ) : null}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300",
                    active
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Result count */}
          <span className="text-xs tabular-nums text-muted-foreground sm:ml-auto">
            {totalCount} {totalCount === 1 ? "result" : "results"}
          </span>
        </div>
      </div>

      {/* FAQ items */}
      {visibleRows.length > 0 ? (
        <Accordion
          type="single"
          collapsible
          value={openItem}
          onValueChange={(v) => setOpenItem(v)}
          className="space-y-3"
        >
          {visibleRows.map((item, i) => {
            const slug = item.id!;
            const qId = `faq-q-${slug}`;
            const aId = `faq-a-${slug}`;
            const catColor = CATEGORY_COLORS[item.category] ?? "bg-muted text-muted-foreground";

            return (
              <FaqCard
                key={slug}
                item={item}
                slug={slug}
                qId={qId}
                aId={aId}
                catColor={catColor}
                query={query}
                index={i}
                isCopied={copied === slug}
                onOpen={() => setHash(slug)}
                onCopy={() => handleCopy(slug)}
              />
            );
          })}
        </Accordion>
      ) : (
        <EmptyState onClear={() => { setQuery(""); setActiveCategory("All"); }} />
      )}
    </section>
  );
}

/* ────────────────────────────── FAQ Card ────────────────────────────────── */

function FaqCard({
  item,
  slug,
  qId,
  aId,
  catColor,
  query,
  isCopied,
  onOpen,
  onCopy,
}: {
  item: QA & { id: string };
  slug: string;
  qId: string;
  aId: string;
  catColor: string;
  query: string;
  index: number;
  isCopied: boolean;
  onOpen: () => void;
  onCopy: () => void;
}): React.JSX.Element {
  return (
    <AccordionItem
      value={slug}
      id={slug}
      className={cn(
        "group/faq rounded-xl border scroll-mt-24",
        "border-border/50 bg-card/80",
        "transition-[border-color,box-shadow] duration-200",
        "hover:border-primary/20",
        "data-[state=open]:border-primary/25 data-[state=open]:shadow-md data-[state=open]:shadow-primary/5",
      )}
    >
      <AccordionTrigger
        id={qId}
        aria-controls={aId}
        className="w-full px-5 text-left hover:no-underline"
        onClick={onOpen}
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg",
            catColor,
          )}>
            <MessageCircleQuestion className="h-4 w-4" aria-hidden />
          </div>
          <span className="text-sm font-medium">
            {highlight(item.question, query)}
          </span>
        </div>
      </AccordionTrigger>

      <AccordionContent id={aId} aria-labelledby={qId} className="px-5 pb-5 pt-0">
        <div className="ml-11">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {highlight(item.answer, query)}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className={cn(
              "inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium",
              catColor,
            )}>
              {item.category}
            </span>
            <button
              type="button"
              aria-label="Copy link to this question"
              onClick={(e) => { e.stopPropagation(); onCopy(); }}
              className={cn(
                "inline-flex size-6 items-center justify-center rounded-md transition-colors duration-150",
                isCopied
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground/40 hover:bg-muted hover:text-muted-foreground",
              )}
            >
              <Link2 className="h-3 w-3" aria-hidden />
            </button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

/* ────────────────────────────── Empty State ─────────────────────────────── */

function EmptyState({ onClear }: { onClear: () => void }): React.JSX.Element {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center rounded-2xl border py-16 text-center",
      "border-border/50 bg-card/80 backdrop-blur-sm",
    )}>
      <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-muted">
        <Search className="h-5 w-5 text-muted-foreground" aria-hidden />
      </div>
      <p className="text-sm font-medium">No results found</p>
      <p className="mt-1 text-xs text-muted-foreground">Try a different keyword or category.</p>
      <button
        type="button"
        onClick={onClear}
        className={cn(
          "mt-4 rounded-full px-4 py-2 text-xs font-medium transition-all",
          "bg-primary text-primary-foreground hover:bg-primary/90",
        )}
      >
        Clear filters
      </button>
    </div>
  );
}

/* ──────────────────────────────── Helpers ───────────────────────────────── */

function attachId(item: QA): QA & { id: string } {
  return { ...item, id: item.id ?? slugify(item.question) };
}

function getHashId(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const h = window.location.hash.replace(/^#/, "");
  return h || undefined;
}

function setHash(slug: string): void {
  if (typeof window === "undefined") return;
  history.replaceState(null, "", `#${slug}`);
}

async function copyLink(slug: string): Promise<void> {
  if (typeof window === "undefined") return;
  const url = `${window.location.origin}${window.location.pathname}#${slug}`;
  try {
    await navigator.clipboard.writeText(url);
  } catch {
    // clipboard permissions might be restricted
  }
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function highlight(text: string, query: string): React.ReactNode {
  const q = normalize(query);
  if (!q) return text;
  const idx = normalize(text).indexOf(q);
  if (idx === -1) return text;

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + query.length);
  const after = text.slice(idx + query.length);
  return (
    <>
      {before}
      <mark className="rounded bg-primary/15 px-0.5 py-0.5">{match}</mark>
      {after}
    </>
  );
}
