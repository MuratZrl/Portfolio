// src/features/home/sections/Hero.tsx
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Href = "/" | `/${string}`;

type HeroProps = {
  title?: string;
  subtitle?: string;
  primary?: { href: Href; label: string };
  secondary?: { href: Href; label: string };
};

export default function Hero({
  title = "Portfolio",
  subtitle = "Üret, dağıt, yinele. Basit, hızlı ve net.",
  primary = { href: "/about", label: "About" },
  secondary = { href: "/projects", label: "Projects" },
}: HeroProps): React.JSX.Element {
  return (

    // Section: main'in flex konteynerinde kalan alanı kaplar ve dikeyde ortalar
    <section className="relative isolate flex flex-1 items-center py-12 sm:py-16">
      {/* Arkaplan gradyan */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,hsl(var(--primary)/0.20),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      {/* İçerik */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="whitespace-pre-line text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            {subtitle}
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button asChild size="lg" aria-label={`${primary.label} sayfasına git`}>
              <Link href={primary.href}>{primary.label}</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              aria-label={`${secondary.label} sayfasına git`}
            >
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
