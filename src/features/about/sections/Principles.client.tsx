// src/features/about/sections/Principles.client.tsx
"use client";

import React from "react";

import { cn } from "@/lib/utils";

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
        {principles.map((p, i) => (
          <PrincipleCard key={p.title} principle={p} index={i} />
        ))}
      </div>

      {/* Process timeline */}
      <div className={cn(
        "mt-10 rounded-2xl border p-6 sm:p-8",
        "border-border/50 bg-card/80 backdrop-blur-sm",
      )}>
        <div className="mb-6">
          <h3 className="text-base font-semibold sm:text-lg">{processHeading}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            From start to release, each step has a clear purpose.
          </p>
        </div>

        <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, idx) => (
            <ProcessStep key={s.title} step={s} index={idx} total={steps.length} />
          ))}
        </ol>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes principle-glow {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes principle-border {
          0%   { border-color: oklch(0.72 0.17 162 / 0.15); }
          33%  { border-color: oklch(0.72 0.17 175 / 0.25); }
          66%  { border-color: oklch(0.72 0.17 150 / 0.20); }
          100% { border-color: oklch(0.72 0.17 162 / 0.15); }
        }
        @keyframes step-pulse {
          0%, 100% { box-shadow: 0 0 0 0 oklch(0.72 0.17 162 / 0.3); }
          50%      { box-shadow: 0 0 0 6px oklch(0.72 0.17 162 / 0); }
        }
      `}</style>
    </section>
  );
}

/* --------------------------------- Parts --------------------------------- */

function PrincipleCard({
  principle,
  index,
}: {
  principle: PrincipleT;
  index: number;
}): React.JSX.Element {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-xl border p-5",
        "border-border/50 bg-card/80 backdrop-blur-sm",
        "transition-all duration-500 ease-out",
        "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
      style={{
        transitionDelay: visible ? `${index * 100}ms` : "0ms",
        animation: visible ? `principle-border 6s ease-in-out ${index}s infinite` : "none",
      }}
    >
      {/* Animated gradient background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "linear-gradient(135deg, oklch(0.72 0.17 162 / 0.06), oklch(0.72 0.17 180 / 0.04), oklch(0.72 0.17 145 / 0.06))",
          backgroundSize: "200% 200%",
          animation: "principle-glow 4s ease infinite",
        }}
      />

      <div className="relative">
        {/* Icon */}
        <div className={cn(
          "mb-4 inline-flex size-10 items-center justify-center rounded-lg",
          "bg-primary/10 text-primary",
          "transition-transform duration-300 group-hover:scale-110",
        )}>
          {renderPrincipleIcon(principle.icon)}
        </div>

        {/* Title & description */}
        <h3 className="text-sm font-semibold sm:text-base">{principle.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {principle.description}
        </p>

        {/* Tags */}
        {principle.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {principle.tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ProcessStep({
  step,
  index,
  total,
}: {
  step: StepT;
  index: number;
  total: number;
}): React.JSX.Element {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef<HTMLLIElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={ref}
      className={cn(
        "relative rounded-xl border border-border/50 p-4 transition-all duration-500 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
      )}
      style={{ transitionDelay: visible ? `${index * 120}ms` : "0ms" }}
    >
      {/* Numbered badge */}
      <span
        className={cn(
          "absolute -top-3 left-4 inline-flex size-6 items-center justify-center rounded-full text-xs font-bold",
          "bg-primary text-primary-foreground",
        )}
        style={{
          animation: visible ? `step-pulse 2.5s ease-in-out ${index * 0.5}s infinite` : "none",
        }}
      >
        {index + 1}
      </span>

      {/* Connector line (hidden on last item and below lg) */}
      {index < total - 1 ? (
        <div className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-primary/30 to-transparent lg:block" />
      ) : null}

      <div className="mt-1">
        <div className="text-sm font-semibold">{step.title}</div>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.description}</p>
      </div>
    </li>
  );
}
