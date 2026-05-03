// src/features/home/sections/FinalCta.tsx
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Sparkles, Clock, Zap } from "lucide-react";

import type { FinalCtaProps } from "@/features/home/types/final-cta";
import { FINAL_CTA_DEFAULTS } from "@/features/home/data";

const PROCESS_STEPS = [
  { icon: Mail, label: "Reach out", description: "Share your idea or problem" },
  { icon: Clock, label: "Plan together", description: "Scope, timeline, stack" },
  { icon: Zap, label: "Ship it", description: "Clean code, tested & deployed" },
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
      <div className={cn(
        "relative overflow-hidden rounded-2xl border",
        "border-border/50 bg-card/80 backdrop-blur-sm",
      )}>
        {/* Animated background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Blob 1 — drifts top-left ↔ bottom-right */}
          <div
            className="absolute h-[60%] w-[50%] rounded-full opacity-[0.07] blur-[80px]"
            style={{
              background: "oklch(0.60 0.16 160)",
              animation: "cta-drift-1 12s ease-in-out infinite alternate",
            }}
          />
          {/* Blob 2 — drifts top-right ↔ bottom-left */}
          <div
            className="absolute h-[50%] w-[45%] rounded-full opacity-[0.06] blur-[80px]"
            style={{
              background: "oklch(0.55 0.14 180)",
              animation: "cta-drift-2 14s ease-in-out infinite alternate",
            }}
          />
          {/* Blob 3 — center pulse */}
          <div
            className="absolute h-[40%] w-[40%] rounded-full opacity-[0.05] blur-[100px]"
            style={{
              background: "oklch(0.65 0.12 140)",
              animation: "cta-drift-3 10s ease-in-out infinite alternate",
            }}
          />
          {/* Top edge glow line */}
          <div
            className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2"
            style={{ background: "linear-gradient(90deg, transparent, oklch(0.72 0.17 162 / 0.3), transparent)" }}
          />
        </div>
        <style>{`
          @keyframes cta-drift-1 {
            0%   { top: -10%; left: -10%; }
            100% { top: 40%;  left: 50%;  }
          }
          @keyframes cta-drift-2 {
            0%   { top: -5%;  right: -10%; left: auto; }
            100% { top: 50%;  right: 40%;  left: auto; }
          }
          @keyframes cta-drift-3 {
            0%   { top: 20%;  left: 30%; }
            100% { top: 50%;  left: 50%; }
          }
        `}</style>

        <div className="px-6 py-12 sm:px-10 sm:py-16">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" aria-hidden />
              Let&apos;s build something great
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
              <Link href={primary.href}>
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
