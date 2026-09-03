// src/features/home/sections/ValueProps.tsx

import React from "react";

import { cn } from "@/lib/utils";
import type { ValuePropsProps } from "@/features/home/types/value-props";

/**
 * One plate, three rows separated by a rule. "How I build" on the portfolio,
 * "Ne yapıyorum" on the small-business site: same silhouette, different
 * items, both handed in by the page from its locale's messages.
 *
 * Not three cards: three chamfered plates in a row compete with the hero
 * coupon for attention, and a rule reads better than a box when the content
 * is three parallel claims rather than three separate objects.
 *
 * Server component — nothing here is interactive.
 */
export default function ValueProps({
  id,
  items,
  heading,
  subheading,
  checkPrefix,
  className,
}: ValuePropsProps): React.JSX.Element {
  const headingId = React.useId();

  return (
    <section id={id} className={cn("w-full py-10 sm:py-12", className)} aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-[length:var(--text-display-md)] font-bold leading-[1.05] text-[var(--text)]"
      >
        {heading}
      </h2>
      <p className="mt-2 text-[length:var(--text-body-base)] text-[var(--text-muted)]">{subheading}</p>

      <div className="plate mt-6">
        {items.map((item, i) => (
          <div
            key={item.title}
            className={cn("px-6 py-7 sm:px-8", i > 0 && "border-t border-[var(--edge-soft)]")}
          >
            <div className="grid gap-4 lg:grid-cols-[minmax(220px,1fr)_2fr] lg:gap-12">
              <div>
                <h3 className="text-[length:var(--text-display-sm)] font-bold leading-[1.15] text-[var(--text)]">
                  {item.title}
                </h3>
                {/* A check that names a destination is actionable; one that
                    names an action ("press Tab") stays text, because there
                    is nothing for a link to navigate to. */}
                {item.check ? (
                  <p className="mt-3 text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-[var(--accent)]">
                    {item.checkHref ? (
                      <>
                        {checkPrefix ? `${checkPrefix} ` : null}
                        <a
                          href={item.checkHref}
                          target="_blank"
                          rel="noreferrer noopener"
                          draggable={false}
                          className="link-soft text-[var(--accent)]"
                        >
                          {item.check}
                          {item.checkNewTabNote ? (
                            <span className="sr-only"> ({item.checkNewTabNote})</span>
                          ) : null}
                        </a>
                      </>
                    ) : (
                      item.check
                    )}
                  </p>
                ) : null}
              </div>

              <div>
                <p className="text-[length:var(--text-body-base)] leading-[1.6] text-[var(--text-muted)]">
                  {item.description}
                </p>

                {item.highlights?.length ? (
                  <ul className="mt-4 grid gap-2">
                    {item.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-2 text-[length:var(--text-body-sm)] text-[var(--text)]"
                      >
                        <span aria-hidden className="text-[var(--accent)]">
                          –
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {item.tags?.length ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="chip px-2 py-1 text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-[var(--text-muted)]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
