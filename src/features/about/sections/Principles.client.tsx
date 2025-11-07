// src/features/about/sections/Principles.client.tsx
import React from "react";

import { cn } from "@/lib/utils";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type { Principle as PrincipleT, Step as StepT } from "@/features/about/types";
import { PRINCIPLES, PROCESS_STEPS } from "@/features/about/data/principles";
import { renderPrincipleIcon } from "@/features/about/utils/principles";

type PrinciplesProps = {
  heading?: string;
  subheading?: string;
  principles?: readonly PrincipleT[];
  processHeading?: string;
  steps?: readonly StepT[];
  className?: string;
};

export default function Principles({
  heading = "Working Principles",
  subheading = "Clear process, low friction, measurable quality.",
  principles = PRINCIPLES,
  processHeading = "Process",
  steps = PROCESS_STEPS,
  className,
}: PrinciplesProps): React.JSX.Element {
  const headingId = React.useId();

  return (
    <section aria-labelledby={headingId} className={cn("py-12 sm:py-16", className)}>
      <div className="mb-8 flex flex-col gap-2">
        <h2 id={headingId} className="text-xl font-semibold tracking-tight sm:text-2xl">
          {heading}
        </h2>
        <p className="text-sm text-muted-foreground">{subheading}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((p) => (
          <Card key={p.title} className="h-full transition-shadow hover:shadow-md">
            <CardHeader className="pb-0">
              <div className="mb-3 inline-flex items-center justify-center rounded-md border bg-muted px-2 py-1">
                {renderPrincipleIcon(p.icon)}
              </div>
              <CardTitle className="text-base sm:text-lg">{p.title}</CardTitle>
              <CardDescription>{p.description}</CardDescription>
            </CardHeader>
            {p.tags?.length ? (
              <CardContent className="pt-4">
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            ) : null}
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-base sm:text-lg">{processHeading}</CardTitle>
            <CardDescription>
              From start to release, each step has a clear purpose.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((s, idx) => (
                <li key={s.title} className="relative rounded-md border p-4">
                  <span className="absolute -top-3 left-4 inline-flex items-center justify-center rounded-full border bg-background px-2 text-xs font-medium">
                    {idx + 1}
                  </span>
                  <div className="font-medium">{s.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
