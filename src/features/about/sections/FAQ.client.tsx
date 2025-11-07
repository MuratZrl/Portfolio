// src/features/about/sections/Faq.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Search, Link2, X, HelpCircle } from "lucide-react";

import type { QA } from "@/features/about/types";
import { FAQ_ITEMS } from "@/features/about/data/FAQ";

/* -------------------------------- Component ------------------------------- */

type FaqProps = {
  heading?: string;
  subheading?: string;
  items?: readonly QA[];
  defaultCategory?: QA["category"] | "All";
  className?: string;
};

export default function Faq({
  heading = "FAQ",
  subheading = "Frequently asked questions with clear answers.",
  items = FAQ_ITEMS,           // 🔽 burada data dosyasını kullanıyoruz
  defaultCategory = "All",
  className,
}: FaqProps): React.JSX.Element {
  const headingId = React.useId();

  // Build categories with “All”
  const categories = React.useMemo(() => {
    const set = new Set<string>(["All"]);
    for (const q of items) set.add(q.category);
    return Array.from(set) as (QA["category"] | "All")[];
  }, [items]);

  // Start closed on both SSR and first client render.
  const [openItem, setOpenItem] = React.useState<string | undefined>(undefined);

  // Search & category filter
  const [query, setQuery] = React.useState<string>("");
  const [activeCategory, setActiveCategory] =
    React.useState<QA["category"] | "All">(defaultCategory);

   // Read hash AFTER mount, then keep listening.
   React.useEffect(() => {
     const apply = (): void => setOpenItem(getHashId());
     apply(); // open from current hash on mount
     window.addEventListener("hashchange", apply, { passive: true });
     return () => window.removeEventListener("hashchange", apply);
   }, []);

  // Filtered data
  const prepared = React.useMemo(() => {
    const q = normalize(query);
    const rows = items.map(attachId);
    return rows.filter((r) => {
      const byCategory = activeCategory === "All" || r.category === activeCategory;
      if (!byCategory) return false;
      if (!q) return true;
      return (
        normalize(r.question).includes(q) || normalize(r.answer).includes(q)
      );
    });
  }, [items, query, activeCategory]);

  const resultCount = prepared.length;

  return (
    <section aria-labelledby={headingId} className={cn("py-12 sm:py-16", className)}>
      <div className="mb-6 flex flex-col gap-2">
        <h2 id={headingId} className="text-xl font-semibold tracking-tight sm:text-2xl">
          {heading}
        </h2>
        <p className="text-sm text-muted-foreground">{subheading}</p>
      </div>

      {/* Control bar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
            className="pl-8"
            aria-label="Search in FAQ"
          />
          {query ? (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <X className="h-4 w-4" aria-hidden />
            </Button>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const active = cat === activeCategory;
            return (
              <Badge
                key={cat}
                role="button"
                tabIndex={0}
                aria-pressed={active}
                onClick={() => setActiveCategory(cat)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActiveCategory(cat);
                }}
                className={cn(
                  "cursor-pointer select-none",
                  active ? "bg-primary text-primary-foreground" : "border"
                )}
              >
                {cat}
              </Badge>
            );
          })}
        </div>

        <div className="sm:ml-auto text-xs text-muted-foreground">
          {resultCount} results
        </div>
      </div>

      <Separator className="mb-4" />

      {/* List */}
      <TooltipProvider delayDuration={120}>
        {resultCount > 0 ? (
          <Accordion
            type="single"
            collapsible
            value={openItem}
            onValueChange={(v) => setOpenItem(v)}
            className="w-full"
          >
            {prepared.map((item) => {
              const slug = item.id!;
              const value = slug; // accordion value
              const qId = `faq-q-${slug}`;
              const aId = `faq-a-${slug}`;

              return (
                <AccordionItem key={value} value={value} id={slug} className="scroll-mt-24">
                  <div className="flex items-start justify-between gap-2">
                    <AccordionTrigger
                      id={qId}
                      aria-controls={aId}
                      className="text-left"
                      onClick={() => setHash(slug)}
                    >
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-muted-foreground" aria-hidden />
                        <span>{highlight(item.question, query)}</span>
                      </div>
                    </AccordionTrigger>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="mt-1"
                          aria-label="Copy link to this question"
                          onClick={() => copyLink(slug)}
                        >
                          <Link2 className="h-4 w-4" aria-hidden />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Copy link</TooltipContent>
                    </Tooltip>
                  </div>

                  <AccordionContent id={aId} aria-labelledby={qId}>
                    <p className="text-sm text-muted-foreground">
                      {highlight(item.answer, query)}
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Category: {item.category}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
          <EmptyState onClear={() => { setQuery(""); setActiveCategory("All"); }} />
        )}
      </TooltipProvider>
    </section>
  );
}

/* --------------------------------- Helpers -------------------------------- */

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
  // Update hash without polluting history
  history.replaceState(null, "", `#${slug}`);
}

async function copyLink(slug: string): Promise<void> {
  if (typeof window === "undefined") return;
  const url = `${window.location.origin}${window.location.pathname}#${slug}`;
  try {
    await navigator.clipboard.writeText(url);
  } catch {
    // clipboard permissions might be restricted in some browsers
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

  // Simple single-match highlight; can be enhanced later
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

/* --------------------------------- Empty ---------------------------------- */

function EmptyState({ onClear }: { onClear: () => void }): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border py-12 text-center">
      <Search className="mb-2 h-5 w-5 text-muted-foreground" aria-hidden />
      <p className="text-sm text-muted-foreground">
        No results found. Try relaxing the filters.
      </p>
      <div className="mt-3">
        <Button size="sm" variant="outline" onClick={onClear}>
          Clear filters
        </Button>
      </div>
    </div>
  );
}
