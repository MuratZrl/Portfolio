// src/features/home/sections/TechStack.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

import { DEFAULT_GROUPS } from "@/features/home/data";
import type { TechStackProps, Skill, Group } from "@/features/home/types/tech-stack";

export default function TechStack({
  heading = "Tech Stack",
  subheading = "Tools I use daily and my proficiency level.",
  groups = DEFAULT_GROUPS,
  className,
}: TechStackProps): React.JSX.Element {
  return (
    <section
      aria-labelledby="tech-stack-heading"
      className={cn("py-12 sm:py-16", className)}
    >
      <div className="mb-8 flex flex-col gap-2">
        <h2
          id="tech-stack-heading"
          className="text-xl font-semibold tracking-tight sm:text-2xl"
        >
          {heading}
        </h2>
        <p className="text-sm text-muted-foreground">{subheading}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((group) => (
          <SkillGroup key={group.title} group={group} />
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Parts -------------------------------- */

function SkillGroup({ group }: { group: Group }): React.JSX.Element {
  const Icon = group.icon;

  return (
    <div className={cn(
      "rounded-xl border p-5",
      "border-border/50 bg-card/80 backdrop-blur-sm",
      "transition-all duration-300 ease-out",
      "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20",
    )}>
      {/* Group header */}
      <div className="mb-4 flex items-center gap-3">
        {Icon ? (
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" aria-hidden />
          </div>
        ) : null}
        <h3 className="text-sm font-semibold">{group.title}</h3>
        <span className="ml-auto text-[11px] text-muted-foreground">
          {group.skills.length} skills
        </span>
      </div>

      {/* Skills */}
      <div className="space-y-3">
        {group.skills.map((s) => (
          <SkillRow key={s.name} skill={s} />
        ))}
      </div>
    </div>
  );
}

function SkillRow({ skill }: { skill: Skill }): React.JSX.Element {
  const clamped = clamp0to100(skill.level);
  const [animated, setAnimated] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{skill.name}</span>
          {skill.hint ? (
            <span className="hidden text-[11px] text-muted-foreground sm:inline">
              {skill.hint}
            </span>
          ) : null}
        </div>
        <span className="tabular-nums text-xs font-medium text-primary">
          {clamped}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-primary/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-1000 ease-out"
          style={{ width: animated ? `${clamped}%` : "0%" }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${skill.name} proficiency: ${clamped}%`}
        />
      </div>
    </div>
  );
}

function clamp0to100(n: number): number {
  if (Number.isNaN(n)) return 0;
  if (n < 0) return 0;
  if (n > 100) return 100;
  return Math.round(n);
}
