// src/features/projects/sections/ProjectsExplorer.client.tsx
"use client";

import React from "react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* Three full rows on the lg grid. Eight projects fit on one page, so the
   pager below stays dormant, as it was when there were six. It wakes up
   again at ten. */
const PER_PAGE = 9;

/**
 * One row of the list. `card` is a SERVER-rendered <ProjectCard>, handed down
 * as an opaque node.
 *
 * This shape is the whole point of the file. The previous version was a
 * client component that called getAllProjects() directly, which pulled
 * constants/projects/data.ts into the browser bundle: every summary, every
 * gallery entry, every technicalDecisions body, for all five projects,
 * whether or not the page ever rendered them. It also dragged ProjectCard
 * across the server boundary with it, which quietly broke the promise in
 * that component's own docstring - the withheld slab is only honest while
 * nothing serialises the project objects.
 *
 * So the client half receives two strings per project and nothing else.
 * `slug` is a React key, `category` is the only field the filter reads.
 * The card arrives pre-rendered, so its markup crosses the wire (it is on
 * screen either way) while the data behind it does not.
 */
export type ProjectListItem = {
  slug: string;
  category: string;
  card: React.ReactNode;
};

type ProjectsExplorerProps = {
  items: readonly ProjectListItem[];
  /**
   * Pill order, decided on the server. Derived here once, alphabetically,
   * which put the technical labels ahead of the small business entry point
   * the page is ordered around. The canonical order lives beside the
   * category union in constants/projects/types.ts, and the server passes the
   * result down rather than this file importing it: the barrel it comes from
   * re-exports PROJECTS, and importing it here would pull every summary and
   * gallery entry into the browser bundle.
   */
  categories: readonly string[];
  className?: string;
};

const ALL = "All" as const;

export default function ProjectsExplorer({
  items,
  categories,
  className,
}: ProjectsExplorerProps): React.JSX.Element {
  const t = useTranslations("projectsPage");
  const [activeFilter, setActiveFilter] = React.useState<string>(ALL);
  const [currentPage, setCurrentPage] = React.useState(1);

  const filtered =
    activeFilter === ALL
      ? items
      : items.filter((i) => i.category === activeFilter);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const handleFilterChange = (filter: string): void => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const goToPage = (page: number): void => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* These filter pills TOGGLE STATE, so they are controls and get the button
     recipe, not .chip. A chip is a static label - same pill silhouette, no
     pressed state, no aria-pressed - and using one here would have told a
     screen reader user the opposite of what the control does. Active is the
     filled primary, inactive the hairline ghost, exactly as on the home
     hero's button pair. */
  const pillClass = (isActive: boolean): string =>
    cn(
      "soft-btn inline-flex min-h-9 select-none items-center gap-2 px-4",
      "text-[length:var(--text-body-sm)] font-medium",
      isActive ? "soft-btn-primary" : "soft-btn-ghost",
    );

  return (
    <section className={cn(className)}>
      <div
        role="group"
        aria-label={t("filterAria")}
        className="mb-8 flex flex-wrap items-center gap-2"
      >
        <button
          type="button"
          onClick={() => handleFilterChange(ALL)}
          aria-pressed={activeFilter === ALL}
          className={pillClass(activeFilter === ALL)}
        >
          {t("all")}
          {/* Full opacity, deliberately. This count used to be opacity-60,
              which on the filled primary dropped white from 6.70:1 to about
              2.4:1 and failed AA outright. Size carries the demotion now,
              since colour is already spoken for by the button state. */}
          <span className="text-[length:var(--text-body-xs)] tabular-nums">
            {items.length}
          </span>
        </button>

        {categories.map((cat) => {
          const count = items.filter((i) => i.category === cat).length;
          const isActive = activeFilter === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => handleFilterChange(cat)}
              aria-pressed={isActive}
              className={pillClass(isActive)}
            >
              {cat}
              <span className="text-[length:var(--text-body-xs)] tabular-nums">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {paginated.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginated.map((item) => (
            <React.Fragment key={item.slug}>{item.card}</React.Fragment>
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-[length:var(--text-body-sm)] text-[var(--text-muted)]">
          {t("empty")}
        </p>
      )}

      {totalPages > 1 ? (
        <nav
          aria-label={t("paginationAria")}
          className="mt-8 flex items-center justify-center gap-1"
        >
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => goToPage(safePage - 1)}
            aria-label={t("prevPage")}
            className={pageBtnClass(false)}
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => goToPage(page)}
              aria-label={t("page", { page })}
              aria-current={page === safePage ? "page" : undefined}
              className={pageBtnClass(page === safePage)}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => goToPage(safePage + 1)}
            aria-label={t("nextPage")}
            className={pageBtnClass(false)}
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </nav>
      ) : null}
    </section>
  );
}

/* The system has no disabled treatment - no .soft-btn:disabled rule, no
   token - so the arrows fall back to a plain opacity knock-back. Flagging
   rather than promoting it: a disabled style is a system-level decision and
   does not belong to this page. WCAG 1.4.3 exempts disabled controls from
   contrast, so the fallback is safe in the meantime. */
function pageBtnClass(isCurrent: boolean): string {
  return cn(
    "soft-btn inline-flex size-9 select-none items-center justify-center",
    "text-[length:var(--text-body-sm)] font-medium tabular-nums",
    isCurrent ? "soft-btn-primary" : "soft-btn-ghost",
    "disabled:pointer-events-none disabled:opacity-45",
  );
}
