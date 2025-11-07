// src/features/home/sections/Hero.tsx
// Minimal hero compatible with your Container + Page rhythm.

import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

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
  primary?: ActionLink;
  secondary?: ActionLink;
  align?: Align;
  narrow?: boolean;
};

export default function Hero({
  className,
  kicker,
  title = "Build clearly. Ship confidently.",
  subtitle = "Type-safe code, clean UX, and a workflow that respects your time.",
  primary = { href: "/about", label: "About" },
  secondary = { href: "/projects", label: "Projects" },
  align = "center",
  narrow = true,
}: HeroProps): React.JSX.Element {

  const headingId = React.useId();

  const textAlign = align === "center" ? "text-center mx-auto" : "text-left";
  const rowJustify = align === "center" ? "justify-center" : "justify-start";
  const containerItems = align === "center" ? "items-center" : "items-start";

  return (
    <section
      className={cn("w-full", className)}
      aria-labelledby={headingId}
      role="region"
    >
      <div className={cn("flex flex-col", containerItems)}>
        {kicker ? (
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {kicker}
          </p>
        ) : null}

        <h1
          id={headingId}
          className={cn(
            "text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl",
            textAlign,
            narrow ? "max-w-2xl" : "max-w-3xl"
          )}
        >
          {title}
        </h1>

        {subtitle ? (
          <p
            className={cn(
              "mt-4 text-pretty text-base text-muted-foreground sm:text-lg",
              textAlign,
              narrow ? "max-w-2xl" : "max-w-3xl"
            )}
          >
            {subtitle}
          </p>
        ) : null}

        {/* DİKKAT: items-center eklendi, rowJustify sadece yatay hizayı yönetiyor */}
        <div className={cn("mt-8 flex flex-wrap items-center gap-4", rowJustify)}>
          <Button
            asChild
            size="lg"
            aria-label={primary.ariaLabel ?? `Go to ${primary.label} page`}
          >
            <Link href={primary.href}>{primary.label}</Link>
          </Button>

          {secondary ? (
            <Link
              href={secondary.href}
              aria-label={secondary.ariaLabel ?? `Go to ${secondary.label} page`}
              className={cn(
                // inline-flex + items-center ile link kendi kutusunda dikey merkezlenir
                "inline-flex items-center",
                // size=lg buton tipik olarak h-11; birebir eşitlemek istersen aç:
                "h-11",
                "text-sm font-medium underline underline-offset-4",
                "text-muted-foreground hover:text-foreground"
              )}
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
