// src/features/about/sections/Testimonials.tsx
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star, ExternalLink } from "lucide-react";

/* --------------------------------- Types --------------------------------- */

type TestimonialLink = {
  href: string;         // external or internal link
  label?: string;       // button/text label
  ariaLabel?: string;
};

type CompanyLogo = {
  src: string;          // /public/... path or full URL
  alt: string;
  width?: number;       // default 80
  height?: number;      // default 24
};

type Testimonial = {
  id: string;
  name: string;
  role?: string;
  company?: string;
  companyLogo?: CompanyLogo;
  avatar?: { src: string; alt?: string };
  quote: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  link?: TestimonialLink; // reference source (LinkedIn, case study, blog, etc.)
};

type TestimonialsProps = {
  heading?: string;
  subheading?: string;
  items?: readonly Testimonial[];
  className?: string;
  columns?: { sm?: 1 | 2; md?: 1 | 2 | 3; lg?: 1 | 2 | 3 };
  showLogos?: boolean;
  showRatings?: boolean;
};

/* ------------------------------ Defaults --------------------------------- */

const DEFAULT_ITEMS: readonly Testimonial[] = [
  {
    id: "t1",
    name: "A. Yılmaz",
    role: "Product Owner",
    company: "Acme",
    companyLogo: { src: "/images/logos/acme.svg", alt: "Acme" },
    avatar: { src: "/images/avatars/ayilmaz.jpg", alt: "A. Yılmaz" },
    quote:
      "Kept the scope lean and delivered clearly. It’s the first time I’ve seen performance and accessibility metrics tracked this transparently.",
    rating: 5,
    link: { href: "https://www.linkedin.com/", label: "Source", ariaLabel: "LinkedIn reference" },
  },
  {
    id: "t2",
    name: "B. Demir",
    role: "Tech Lead",
    company: "Zenware",
    companyLogo: { src: "/images/logos/zenware.svg", alt: "Zenware" },
    avatar: { src: "/images/avatars/bdemir.jpg", alt: "B. Demir" },
    quote:
      "The component architecture reduced maintenance costs long term. PRs were small and reviews were fast.",
    rating: 5,
  },
  {
    id: "t3",
    name: "C. Kaya",
    role: "Marketing",
    company: "Northwind",
    avatar: { src: "/images/avatars/ckaya.jpg", alt: "C. Kaya" },
    quote:
      "We hit our SEO and LCP targets. The edge-first strategy made release smooth.",
    rating: 4,
  },
] as const;

/* --------------------------------- View ---------------------------------- */

export default function Testimonials({
  heading = "Testimonials",
  subheading = "Short notes from people I’ve worked with.",
  items = DEFAULT_ITEMS,
  className,
  columns = { sm: 2, md: 3, lg: 3 },
  showLogos = true,
  showRatings = true,
}: TestimonialsProps): React.JSX.Element {
  const headingId = React.useId();

  const gridClasses = cn(
    "grid gap-6",
    columns.sm === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2",
    columns.md === 1 ? "md:grid-cols-1" : columns.md === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
    columns.lg === 1 ? "lg:grid-cols-1" : columns.lg === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3",
  );

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
  const h = logo.height ?? 24;
  return (
    <div className="relative h-6 w-20 shrink-0 opacity-80">
      {/* If raster, object-contain keeps it tidy; SVG stays sharp anyway */}
      <Image
        src={logo.src}
        alt={logo.alt}
        fill
        sizes={`${w}px`}
        className="object-contain"
        priority={false}
      />
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
      className={cn(
        "inline-flex items-center gap-0.5 text-yellow-500",
        className
      )}
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

/* -------------------------------- Utils ---------------------------------- */

function initials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const take = parts.length >= 2 ? [parts[0], parts[parts.length - 1]] : parts;
  return take.map((p) => p[0]?.toUpperCase() ?? "").join("");
}
