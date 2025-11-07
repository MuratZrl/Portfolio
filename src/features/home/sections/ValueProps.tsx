// src/features/home/sections/ValueProps.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
} from "@/components/ui/tooltip";

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

      <TooltipProvider delayDuration={150}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ValueCard key={item.title} item={item} />
          ))}
        </div>
      </TooltipProvider>
    </section>
  );
}

/* ------------------------------ Subcomponent ----------------------------- */

function ValueCard({ item }: { item: ValueItem }): React.JSX.Element {
  const Icon = item.icon;

  return (
    <Card className="h-full transition-shadow hover:shadow-md focus-within:shadow-md">
      <CardHeader className="pb-0">
        <div className="mb-3 inline-flex size-10 items-center justify-center rounded-lg border bg-gradient-to-b from-primary/10 to-transparent">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex items-center justify-center">
                <Icon className="h-5 w-5" aria-hidden />
                <span className="sr-only">{item.title} icon</span>
              </span>
            </TooltipTrigger>
            <TooltipContent>{item.title}</TooltipContent>
          </Tooltip>
        </div>

        <CardTitle className="text-base sm:text-lg">{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>

      {(item.highlights?.length || item.tags?.length) && (
        <CardContent className="pt-4">
          {item.highlights?.length ? (
            <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
              {item.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2">
                  <span className="mt-1 inline-block size-1.5 rounded-full bg-primary/60" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {item.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          ) : null}
        </CardContent>
      )}

      {(item.stat || item.cta) && (
        <CardFooter className="mt-auto">
          {item.stat ? (
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold leading-none">{item.stat.value}</span>
              <span className="text-xs text-muted-foreground">{item.stat.label}</span>
            </div>
          ) : (
            <span />
          )}
        </CardFooter>
      )}
    </Card>
  );
}
