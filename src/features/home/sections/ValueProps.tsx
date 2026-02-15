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
      <div className="mb-8 flex flex-col gap-2">
        <h2 id="value-props-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
          {heading}
        </h2>
        <p className="text-sm text-muted-foreground">{subheading}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ValueCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Subcomponent ----------------------------- */

function ValueCard({ item }: { item: ValueItem }): React.JSX.Element {
  const Icon = item.icon;

  return (
    <div className={cn(
      "group relative flex h-full flex-col rounded-xl border p-6",
      "border-border/50 bg-card/80 backdrop-blur-sm",
      "transition-all duration-300 ease-out",
      "hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20",
    )}>
      {/* Icon */}
      <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" aria-hidden />
      </div>

      {/* Title & description */}
      <h3 className="mb-1 text-base font-semibold tracking-tight sm:text-lg">{item.title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p>

      {/* Highlights */}
      {item.highlights?.length ? (
        <ul className="mb-4 space-y-1.5 text-sm text-muted-foreground">
          {item.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2">
              <span className="inline-block size-1 rounded-full bg-primary" />
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
              className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {/* Stat */}
      {item.stat ? (
        <div className="mt-auto flex items-baseline gap-2 border-t border-border/50 pt-4">
          <span className="text-xl font-bold text-primary">{item.stat.value}</span>
          <span className="text-xs text-muted-foreground">{item.stat.label}</span>
        </div>
      ) : null}
    </div>
  );
}
