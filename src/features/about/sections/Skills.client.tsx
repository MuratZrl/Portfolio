// src/features/about/sections/Skills.client.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Languages, ExternalLink, Award } from "lucide-react";

import type { Skill, Group } from "@/features/about/types";
import { SKILL_GROUPS, LANGUAGE_LIST, CERT_LIST } from "@/features/about/data/skills";
import { renderIcon, clamp0to100 } from "@/features/about/utils/skills";

type SkillsMatrixProps = {
  heading?: string;
  subheading?: string;
  groups?: readonly Group[];
  languages?: readonly { name: string; level: string }[];
  certs?: readonly { title: string; org: string; year?: string; href?: string }[];
  className?: string;
};

export default function SkillsMatrix({
  heading = "Skills & Tools",
  subheading = "Technologies used in practice and quality tooling.",
  groups = SKILL_GROUPS,
  languages = LANGUAGE_LIST,
  certs = CERT_LIST,
  className,
}: SkillsMatrixProps): React.JSX.Element {
  const headingId = React.useId();
  const [activeTab, setActiveTab] = React.useState(groups[0]?.id ?? "frontend");
  const activeGroup = groups.find((g) => g.id === activeTab) ?? groups[0];

  return (
    <section aria-labelledby={headingId} className={cn(className)}>
      <div className="mb-8 flex flex-col gap-2">
        <h2 id={headingId} className="text-xl font-semibold tracking-tight sm:text-2xl">
          {heading}
        </h2>
        <p className="text-sm text-muted-foreground">{subheading}</p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-3">
        {/* Main skills panel */}
        <div className="lg:col-span-2">
          {/* Tab bar */}
          <div className="mb-6 flex flex-wrap gap-2">
            {groups.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setActiveTab(g.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                  activeTab === g.id
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                )}
              >
                {renderIcon(g.icon)}
                <span>{g.title}</span>
                <span className={cn(
                  "ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
                  activeTab === g.id
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-background/60 text-muted-foreground",
                )}>
                  {g.skills.length}
                </span>
              </button>
            ))}
          </div>

          {/* Active group card */}
          {activeGroup ? (
            <div className={cn(
              "rounded-2xl border p-5 sm:p-6",
              "border-border/50 bg-card/80 backdrop-blur-sm",
              "transition-all duration-300",
            )}>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {renderIcon(activeGroup.icon)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{activeGroup.title}</h3>
                  {activeGroup.note ? (
                    <p className="text-xs text-muted-foreground">{activeGroup.note}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {activeGroup.skills.map((s, i) => (
                  <SkillRow key={s.name} skill={s} index={i} />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Sidebar */}
        <div className="grid gap-6">
          {/* Languages */}
          <div className={cn(
            "rounded-2xl border p-5",
            "border-border/50 bg-card/80 backdrop-blur-sm",
          )}>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Languages className="h-4 w-4" aria-hidden />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Languages</h3>
                <p className="text-xs text-muted-foreground">Communication proficiency</p>
              </div>
            </div>

            <ul className="space-y-3">
              {languages.map((l) => (
                <li key={l.name} className="flex items-center justify-between">
                  <span className="text-sm">{l.name}</span>
                  <span className={cn(
                    "rounded-full px-2.5 py-0.5 text-[11px] font-bold tabular-nums",
                    l.level === "Native"
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground",
                  )}>
                    {l.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Certificates */}
          <div className={cn(
            "rounded-2xl border p-5",
            "border-border/50 bg-card/80 backdrop-blur-sm",
          )}>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Award className="h-4 w-4" aria-hidden />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Certificates</h3>
                <p className="text-xs text-muted-foreground">Validations &amp; courses</p>
              </div>
            </div>

            <ul className="space-y-3">
              {certs.map((c) => (
                <li
                  key={`${c.title}-${c.org}`}
                  className={cn(
                    "rounded-xl border border-border/50 p-3",
                    "transition-colors hover:border-primary/20",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-sm font-medium">{c.title}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {c.org}{c.year ? ` · ${c.year}` : ""}
                      </div>
                    </div>
                    {c.href ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View certificate: ${c.title}`}
                        className={cn(
                          "inline-flex size-7 shrink-0 items-center justify-center rounded-lg",
                          "text-muted-foreground transition-all",
                          "hover:bg-primary/10 hover:text-primary",
                        )}
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes skill-bar-fill {
          from { width: 0%; }
        }
        @keyframes skill-bar-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
}

/* -------------------------------- Parts ---------------------------------- */

function SkillRow({ skill, index }: { skill: Skill; index: number }): React.JSX.Element {
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
      {/* Name + percentage */}
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{skill.name}</span>
        </div>
        <span className="tabular-nums text-xs font-medium text-primary">
          {clamped}%
        </span>
      </div>

      {/* Hint */}
      {skill.hint ? (
        <p className="mb-2 text-[11px] leading-relaxed text-muted-foreground">
          {skill.hint}
        </p>
      ) : null}

      {/* Animated progress bar */}
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-primary/10">
        <div
          className="h-full rounded-full"
          style={{
            width: animated ? `${clamped}%` : "0%",
            background: "linear-gradient(90deg, oklch(0.72 0.17 162 / 0.6), oklch(0.72 0.17 162))",
            transition: `width 1s ease-out ${index * 80}ms`,
          }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${skill.name} proficiency: ${clamped}%`}
        />
        {/* Shimmer overlay */}
        {animated ? (
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent 0%, oklch(1 0 0 / 0.15) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
              animation: "skill-bar-shimmer 3s linear infinite",
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
