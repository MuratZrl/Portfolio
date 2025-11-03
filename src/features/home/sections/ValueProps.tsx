// src/features/home/sections/ValueProps.tsx
import React from "react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import type { LucideIcon } from "lucide-react";
import { Gauge, Accessibility, GitBranch } from "lucide-react";

type Href = "/" | `/${string}`;

type ValueItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  highlights?: readonly string[];
  stat?: { label: string; value: string };
  tags?: readonly string[];
  cta?: { href: Href; label: string; ariaLabel?: string };
};

type ValuePropsProps = {
  items?: readonly ValueItem[];
  heading?: string;
  subheading?: string;
  className?: string;
};

const DEFAULT_ITEMS: readonly ValueItem[] = [
  {
    title: "Speed & Performance",
    description: "Next.js 15 + Edge optimization. Target LCP < 1.5s.",
    icon: Gauge,
    highlights: [
      "SSR/SG & smart cache",
      "Image optimization",
      "Preload & prefetch",
    ],
    stat: { label: "Average LCP", value: "< 1.5s" },
    tags: ["Next.js", "Edge", "Lighthouse 95+"],
    cta: { href: "/projects", label: "Projects", ariaLabel: "Go to Projects page" },
  },
  {
    title: "Accessibility",
    description:
      "Semantic HTML, focus management, and contrast checks. Automation friendly.",
    icon: Accessibility,
    highlights: ["WCAG compliant", "Keyboard navigable", "ARIA labels"],
    stat: { label: "A11y score", value: "90+ / 100" },
    tags: ["WCAG", "Axe", "Keyboard-first"],
    cta: { href: "/about", label: "About" },
  },
  {
    title: "Sustainable Code",
    description: "Strict TypeScript, clear architecture, Shadcn UI. Long-lived.",
    icon: GitBranch,
    highlights: ["Strict TS", "UI primitives", "Testable"],
    stat: { label: "Bug rate", value: "↓" },
    tags: ["TypeScript", "Shadcn UI", "Clean Arch"],
    cta: { href: "/contact", label: "Contact" },
  },
];

export default function ValueProps({
  items = DEFAULT_ITEMS,
  heading = "Value Propositions",
  subheading = "Measurable quality, low-maintenance solutions.",
  className,
}: ValuePropsProps): React.JSX.Element {
  return (
    <section
      aria-labelledby="value-props-heading"
      className={cn("py-12 sm:py-16", className)}
    >
      <div className="mb-8 flex flex-col gap-2">
        <h2
          id="value-props-heading"
          className="text-xl font-semibold tracking-tight sm:text-2xl"
        >
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
              <span className="text-xl font-semibold leading-none">
                {item.stat.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {item.stat.label}
              </span>
            </div>
          ) : (
            <span />
          )}
        </CardFooter>
      )}
    </Card>
  );
}
