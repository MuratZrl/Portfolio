// src/features/home/sections/Hero.tsx

import React from "react";
import Image from "next/image";
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
  primary?: ActionLink;
  secondary?: ActionLink;
  align?: Align;
  narrow?: boolean;
  avatarSrc?: string;
  statusText?: string;
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
  avatarSrc,
  statusText,
}: HeroProps): React.JSX.Element {
  const headingId = React.useId();

  const textAlign = align === "center" ? "text-center mx-auto" : "text-left";
  const rowJustify = align === "center" ? "justify-center" : "justify-start";
  const containerItems = align === "center" ? "items-center" : "items-start";

  return (
    <section
      className={cn("relative w-full", className)}
      aria-labelledby={headingId}
      role="region"
    >
      <div className={cn("flex flex-col gap-6", containerItems)}>
        {/* Avatar + status */}
        {avatarSrc ? (
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="rounded-full p-[3px] bg-gradient-to-br from-primary/80 to-primary/20">
                <div className="rounded-full overflow-hidden bg-background p-[2px]">
                  <Image
                    src={avatarSrc}
                    alt={kicker ? `${kicker} profile photo` : "Profile photo"}
                    width={96}
                    height={96}
                    className="rounded-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {statusText ? (
              <Badge variant="outline" className="gap-1.5 text-xs font-normal text-muted-foreground">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                {statusText}
              </Badge>
            ) : null}
          </div>
        ) : null}

        {/* Kicker (only shown when no avatar) */}
        {kicker && !avatarSrc ? (
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {kicker}
          </p>
        ) : null}

        {/* Heading */}
        <h1
          id={headingId}
          className={cn(
            "text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl",
            textAlign,
            narrow ? "max-w-2xl" : "max-w-3xl"
          )}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle ? (
          <p
            className={cn(
              "text-pretty text-base text-muted-foreground sm:text-lg lg:text-xl",
              textAlign,
              narrow ? "max-w-xl" : "max-w-2xl"
            )}
          >
            {subtitle}
          </p>
        ) : null}

        {/* Actions */}
        <div className={cn("mt-2 flex flex-wrap items-center gap-3", rowJustify)}>
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
