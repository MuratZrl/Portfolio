// src/features/about/sections/Principles.tsx
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
import {
  Target,
  Bolt,
  Accessibility,
  Layers,
  GitBranch,
  ShieldCheck,
} from "lucide-react";

type Principle = {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags?: readonly string[];
};

type Step = {
  title: string;
  description: string;
};

type PrinciplesProps = {
  heading?: string;
  subheading?: string;
  principles?: readonly Principle[];
  processHeading?: string;
  steps?: readonly Step[];
  className?: string;
};

const DEFAULT_PRINCIPLES: readonly Principle[] = [
  {
    title: "Goal Oriented",
    description: "Measurable metrics and clear scope. Product, not detours.",
    icon: <Target className="h-5 w-5" aria-hidden />,
    tags: ["Scope clarity", "KPI"],
  },
  {
    title: "Speed & Simplicity",
    description: "Minimal dependencies, maximum output. No unnecessary magic.",
    icon: <Bolt className="h-5 w-5" aria-hidden />,
    tags: ["Edge-first", "Cache"],
  },
  {
    title: "Accessibility",
    description: "WCAG-compliant, keyboard-navigable interfaces.",
    icon: <Accessibility className="h-5 w-5" aria-hidden />,
    tags: ["Axe", "Contrast"],
  },
  {
    title: "Component Architecture",
    description: "Primitives + composition. UI resilient to change.",
    icon: <Layers className="h-5 w-5" aria-hidden />,
    tags: ["Shadcn UI", "Composable"],
  },
  {
    title: "Versioning & Branching",
    description: "Short-lived feature branches, frequent PRs, clear reviews.",
    icon: <GitBranch className="h-5 w-5" aria-hidden />,
    tags: ["Conventional Commits", "Small PRs"],
  },
  {
    title: "Quality & Confidence",
    description: "Tests, a11y and perf budgets in CI. No surprises in prod.",
    icon: <ShieldCheck className="h-5 w-5" aria-hidden />,
    tags: ["Playwright", "Lighthouse"],
  },
] as const;

const DEFAULT_STEPS: readonly Step[] = [
  {
    title: "Discovery",
    description: "Scope, user scenarios, metrics. No unnecessary scope creep.",
  },
  {
    title: "Skeleton",
    description: "Information architecture, routes, component glossary.",
  },
  {
    title: "Development",
    description: "RSC + Server Actions, progressive enhancement.",
  },
  {
    title: "Validation",
    description: "Tests, Lighthouse and Axe; acceptance criteria.",
  },
  {
    title: "Release & Monitoring",
    description: "Versioning, instrumentation, small iterations.",
  },
] as const;

export default function Principles({
  heading = "Working Principles",
  subheading = "Clear process, low friction, measurable quality.",
  principles = DEFAULT_PRINCIPLES,
  processHeading = "Process",
  steps = DEFAULT_STEPS,
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

      {/* Principle Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((p) => (
          <Card key={p.title} className="h-full transition-shadow hover:shadow-md">
            <CardHeader className="pb-0">
              <div className="mb-3 inline-flex items-center justify-center rounded-md border bg-muted px-2 py-1">
                {p.icon}
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

      {/* Process steps */}
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
