// src/features/about/sections/Testimonials.client.tsx
"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star, ExternalLink } from "lucide-react";

import type { Testimonial, CompanyLogo } from "@/features/about/types";

import { TESTIMONIALS } from "@/features/about/data/testimonials";
import { makeGridClasses, initials, type Columns } from "@/features/about/utils/testimonials";

/* -------------------------------- Props -------------------------------- */

type TestimonialsProps = {
  heading?: string;
  subheading?: string;
  items?: readonly Testimonial[];
  className?: string;
  columns?: Columns;
  showLogos?: boolean;
  showRatings?: boolean;
};

/* --------------------------------- View ---------------------------------- */

export default function Testimonials({
  heading = "Testimonials",
  subheading = "Short notes from people I’ve worked with.",
  items = TESTIMONIALS,
  className,
  columns = { sm: 2, md: 3, lg: 3 },
  showLogos = true,
  showRatings = true,
}: TestimonialsProps): React.JSX.Element {
  const headingId = React.useId();
  const gridClasses = makeGridClasses(columns);

  return (
    <section aria-labelledby={headingId} className={cn("py-12 sm:py-16", className)}>
      <div className="mb-8 flex flex-col gap-2">
        <h2 id={headingId} className="text-xl font-semibold tracking-tight sm:text-2xl">
          {heading}
        </h2>
        <p className="text-sm text-muted-foreground">{subheading}</p>
      </div>

      <div className={gridClasses}>
        {items.map((t) => (
          <TestimonialCard key={t.id} t={t} showLogos={showLogos} showRatings={showRatings} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Subparts --------------------------------- */

function TestimonialCard({
  t,
  showLogos,
  showRatings,
}: {
  t: Testimonial;
  showLogos: boolean;
  showRatings: boolean;
}): React.JSX.Element {
  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              {/* AvatarImage is fine with undefined src; fallback will show */}
              <AvatarImage src={t.avatar?.src} alt={t.avatar?.alt ?? t.name} />
              <AvatarFallback>{initials(t.name)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{t.name}</div>
              <div className="truncate text-xs text-muted-foreground">
                {t.role ?? "Reference"}{t.company ? ` · ${t.company}` : ""}
              </div>
            </div>
          </div>

          {showLogos && t.companyLogo ? (
            <CompanyMark logo={t.companyLogo} />
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        {showRatings && t.rating ? <Stars value={t.rating} className="mb-2" /> : null}

        <blockquote className="relative text-sm leading-relaxed text-muted-foreground">
          <Quote className="absolute -left-1 -top-2 h-4 w-4 opacity-40" aria-hidden />
          <span className="block pl-5">{t.quote}</span>
        </blockquote>

        {t.link ? (
          <p className="mt-3 text-xs">
            <a
              href={t.link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={t.link.ariaLabel ?? "Open reference source"}
              className="inline-flex items-center gap-1 text-muted-foreground underline-offset-4 hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              {t.link.label ?? "Source"}
            </a>
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}

function CompanyMark({ logo }: { logo: CompanyLogo }): React.JSX.Element {
  const w = logo.width ?? 80;
  return (
    <div className="relative h-6 w-20 shrink-0 opacity-80">
      <Image
        src={logo.src}
        alt={logo.alt}
        fill
        sizes={`${w}px`}
        className="object-contain"
        priority={false}
      />
      {/* If you prefer fixed dims instead of fill:
          <Image src={logo.src} alt={logo.alt} width={w} height={h} />
       */}
    </div>
  );
}

function Stars({
  value,
  className,
}: {
  value: 1 | 2 | 3 | 4 | 5;
  className?: string;
}): React.JSX.Element {
  return (
    <div
      className={cn("inline-flex items-center gap-0.5 text-yellow-500", className)}
      aria-label={`Rating: ${value} / 5`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < value;
        return (
          <Star
            key={i}
            className={cn("h-4 w-4", filled ? "fill-current" : "fill-transparent")}
            aria-hidden
          />
        );
      })}
    </div>
  );
}
