// src/features/home/sections/ValueProps.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

import type { ValueItem, ValuePropsProps } from "@/features/home/types/value-props";
import { DEFAULT_ITEMS } from "@/features/home/data";

export default function ValueProps({
  items = DEFAULT_ITEMS,
  heading = "Value Propositions",
  subheading = "Measurable quality, low-maintenance solutions.",
  className,
}: ValuePropsProps): React.JSX.Element {
  return (
    <section aria-labelledby="value-props-heading" className={cn("py-12 sm:py-16", className)}>
      <div
        className="mb-10 flex flex-col gap-2 text-center"
        style={{ animation: "fade-in-up 0.5s ease-out both" }}
      >
        <h2
          id="value-props-heading"
          className="text-xl font-semibold tracking-tight sm:text-2xl"
        >
          {heading}
        </h2>
        <p className="mx-auto max-w-lg text-sm text-muted-foreground">{subheading}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <ValueCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Subcomponent ----------------------------- */

function ValueCard({ item, index }: { item: ValueItem; index: number }): React.JSX.Element {
  const Icon = item.icon;

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border p-6",
        "border-border/50 bg-card/80 backdrop-blur-sm",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20",
      )}
      style={{ animation: `fade-in-up 0.5s ease-out ${0.1 + index * 0.1}s both` }}
    >
      {/* Background number watermark */}
      <span className="pointer-events-none absolute -right-2 -top-4 text-[80px] font-bold leading-none text-muted-foreground/[0.04] select-none">
        0{index + 1}
      </span>

      {/* Icon */}
      <div className="mb-5">
        <div className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-base font-semibold tracking-tight sm:text-lg">{item.title}</h3>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p>

      {/* Highlights */}
      {item.highlights?.length ? (
        <ul className="mb-5 space-y-2 text-sm text-muted-foreground">
          {item.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2.5">
              <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {/* Tags */}
      {item.tags?.length ? (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {item.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border/50 bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {/* Stat */}
      {item.stat ? (
        <div className="mt-auto flex items-baseline gap-2 border-t border-border/40 pt-4">
          <span className="text-xl font-bold text-primary">{item.stat.value}</span>
          <span className="text-xs text-muted-foreground">{item.stat.label}</span>
        </div>
      ) : null}
    </div>
  );
}
