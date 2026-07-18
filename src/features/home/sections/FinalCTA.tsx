// src/features/home/sections/FinalCta.tsx
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Sparkles, Clock, Zap } from "lucide-react";

import type { FinalCtaProps } from "@/features/home/types/final-cta";
import { FINAL_CTA_DEFAULTS } from "@/features/home/data";

const PROCESS_STEPS = [
  { icon: Mail, label: "You describe the problem", description: "The current process, not the feature list." },
  { icon: Clock, label: "I scope it in writing", description: "What gets built, what doesn't, how long." },
  { icon: Zap, label: "Ship it", description: "Deployed and documented." },
] as const;

export default function FinalCta({
  heading = FINAL_CTA_DEFAULTS.heading,
  subheading = FINAL_CTA_DEFAULTS.subheading,
  primary = FINAL_CTA_DEFAULTS.primary,
  className,
}: FinalCtaProps): React.JSX.Element {
  const headingId = React.useId();

  return (
    <section
      aria-labelledby={headingId}
      className={cn("py-12 sm:py-16", className)}
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
              Two ways to work together
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
            {PROCESS_STEPS.map((step, i) => {
              const StepIcon = step.icon;
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
              <Link href={primary.href} draggable={false}>
                {primary.label}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
