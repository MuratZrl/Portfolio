// src/features/home/sections/ValueProps.tsx

import React from "react";

import { cn } from "@/lib/utils";
import { DEFAULT_ITEMS } from "@/features/home/data/value-props";
import type { ValuePropsProps } from "@/features/home/types/value-props";

/**
 * "How I build" — one plate, three rows separated by a rule.
 *
 * Not three cards: three chamfered plates in a row compete with the hero
 * coupon for attention, and a rule reads better than a box when the content
 * is three parallel claims rather than three separate objects.
 *
 * Server component — nothing here is interactive.
 */
export default function HowIBuild({
  items = DEFAULT_ITEMS,
  heading = "How I build",
  subheading = "Three claims. You can check all three without leaving this page.",
  className,
}: ValuePropsProps): React.JSX.Element {
  const headingId = React.useId();

  return (
    <section className={cn("w-full py-12 sm:py-16", className)} aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-[length:var(--text-display-md)] font-bold leading-[1.05] text-scribe"
      >
        {heading}
      </h2>
      <p className="mt-2 text-[length:var(--text-body-base)] text-patina">{subheading}</p>

      <div className="plate mt-6">
        {items.map((item, i) => (
          <div
            key={item.title}
            className={cn("px-6 py-7 sm:px-8", i > 0 && "border-t-2 border-[--edge-hi]")}
          >
            <div className="grid gap-4 lg:grid-cols-[minmax(220px,1fr)_2fr] lg:gap-12">
              <div>
                <h3 className="text-[length:var(--text-display-sm)] font-bold leading-[1.15] text-scribe">
                  {item.title}
                </h3>
                <p className="mt-3 text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-eloksal">
                  {item.check}
                </p>
              </div>

              <div>
                <p className="text-[length:var(--text-body-base)] leading-[1.6] text-patina">
                  {item.description}
                </p>

                {item.highlights?.length ? (
                  <ul className="mt-4 grid gap-2">
                    {item.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-2 text-[length:var(--text-body-sm)] text-scribe"
                      >
                        <span aria-hidden className="text-eloksal">
                          —
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
                        className="recessed px-2 py-1 text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-patina"
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
