// src/features/home/sections/Hero.tsx

import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type Href = "/" | `/${string}`;

type ActionLink = {
  href: Href;
  label: string;
  ariaLabel?: string;
};

type Align = "left" | "center";

type HeroProps = {
  className?: string;
  kicker?: string;
  title?: string;
  subtitle?: string;
  techStack?: string[];
  primary?: ActionLink;
  secondary?: ActionLink;
  align?: Align;
  narrow?: boolean;
  statusText?: string;
};

export default function Hero({
  className,
  kicker,
  title = "Build clearly. Ship confidently.",
  subtitle,
  techStack,
  primary = { href: "/about", label: "About" },
  secondary = { href: "/projects", label: "Projects" },
  align = "center",
  narrow = true,
  statusText,
}: HeroProps): React.JSX.Element {
  const headingId = React.useId();

  const textAlign = align === "center" ? "text-center mx-auto" : "text-left";
  const rowJustify = align === "center" ? "justify-center" : "justify-start";
  const containerItems = align === "center" ? "items-center" : "items-start";

  return (
    <section
      className={cn("relative w-full overflow-hidden", className)}
      aria-labelledby={headingId}
      role="region"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[360px] w-[560px] rounded-full bg-primary/[0.07] blur-[100px]" />
      </div>

      <div className={cn("relative flex flex-col gap-6", containerItems)}>
        {/* Status badge */}
        {statusText ? (
          <div style={{ animation: "fade-in-up 0.5s ease-out both" }}>
            <Badge
              variant="outline"
              className="gap-1.5 px-3 py-1 text-xs font-normal text-muted-foreground border-border/50 backdrop-blur-sm"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              {statusText}
            </Badge>
          </div>
        ) : null}

        {/* Kicker */}
        {kicker ? (
          <p
            className={cn(
              "text-sm font-medium tracking-widest uppercase text-muted-foreground",
              textAlign,
            )}
            style={{ animation: "fade-in-up 0.5s ease-out 0.1s both" }}
          >
            {kicker}
          </p>
        ) : null}

        {/* Heading */}
        <h1
          id={headingId}
          className={cn(
            "text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl",
            textAlign,
            narrow ? "max-w-2xl" : "max-w-3xl",
          )}
          style={{ animation: "fade-in-up 0.6s ease-out 0.2s both" }}
        >
          {title}
        </h1>

        {/* Subtitle (plain text) */}
        {subtitle ? (
          <p
            className={cn(
              "text-pretty text-base text-muted-foreground sm:text-lg lg:text-xl",
              textAlign,
              narrow ? "max-w-xl" : "max-w-2xl",
            )}
            style={{ animation: "fade-in-up 0.6s ease-out 0.3s both" }}
          >
            {subtitle}
          </p>
        ) : null}

        {/* Tech stack badges */}
        {techStack && techStack.length > 0 ? (
          <div
            className={cn("flex flex-wrap gap-2", rowJustify)}
            style={{ animation: "fade-in-up 0.6s ease-out 0.35s both" }}
          >
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/30 hover:text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        ) : null}

        {/* Actions */}
        <div
          className={cn("mt-2 flex flex-wrap items-center gap-3", rowJustify)}
          style={{ animation: "fade-in-up 0.6s ease-out 0.45s both" }}
        >
          <Button
            asChild
            size="lg"
            aria-label={primary.ariaLabel ?? `Go to ${primary.label} page`}
          >
            <Link href={primary.href}>{primary.label}</Link>
          </Button>

          {secondary ? (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border/50 backdrop-blur-sm"
              aria-label={secondary.ariaLabel ?? `Go to ${secondary.label} page`}
            >
              <Link href={secondary.href}>
                {secondary.label}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
