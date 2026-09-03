// src/features/home/sections/FinalCta.tsx
import React from "react";
import { ArrowRight, Mail, Sparkles, Clock, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import type { FinalCtaProps } from "@/features/home/types/final-cta";

/** One icon per step, in order. The copy for each step comes from the page. */
const STEP_ICONS = [Mail, Clock, Zap] as const;

/**
 * The closing plate: a badge, a heading, three numbered steps and one
 * button. "Two ways to work together" on the portfolio, "Nasıl çalışır" on
 * the small-business site; the layout is the same and only the words and the
 * button target change.
 */
export default function FinalCta({
  id,
  badge,
  heading,
  subheading,
  steps,
  primary,
  className,
}: FinalCtaProps): React.JSX.Element {
  const headingId = React.useId();

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("py-10 sm:py-12", className)}
    >
      {/* Soft-UI plate. The previous version layered three infinitely
          animating blurred blobs behind frosted glass: they animated `top`
          and `left` (layout-triggering, forever), used 80-100px blurs, and
          were painted in the OLD accent blue. Removed rather than
          repainted — an aurora-gradient wash is a different aesthetic from
          soft-UI, and it was decoration costing real paint work. */}
      <div className="plate overflow-hidden">
        <div className="px-6 py-12 sm:px-10 sm:py-16">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" aria-hidden />
              {badge}
            </div>

            <h2
              id={headingId}
              className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
            >
              {heading}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              {subheading}
            </p>
          </div>

          {/* Process steps */}
          <div className="mx-auto mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
            {steps.map((step, i) => {
              const StepIcon = STEP_ICONS[i];
              return (
                <div key={step.label} className="flex flex-col items-center gap-2 text-center">
                  <div className="relative">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <StepIcon className="h-5 w-5" aria-hidden />
                    </div>
                    <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold">{step.label}</h3>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>

          {/* CTA button */}
          <div className="mx-auto mt-10 flex justify-center">
            <Button asChild size="lg" aria-label={primary.ariaLabel ?? primary.label}>
              {primary.external ? (
                <a href={primary.href} target="_blank" rel="noopener noreferrer" draggable={false}>
                  {primary.label}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </a>
              ) : (
                <Link href={primary.href} draggable={false}>
                  {primary.label}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
