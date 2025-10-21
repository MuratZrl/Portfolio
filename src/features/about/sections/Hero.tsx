// src/features/about/sections/Hero.tsx
import React from "react";
import Link from "next/link";

export default function AboutHero(): React.JSX.Element {
  return (

    // Home Hero ile aynı: kalan yüksekliği kapla + içerikleri dikeyde ortala
    <section className="relative isolate flex flex-1 items-center py-12 sm:py-16">
      {/* İstersen hafif bir arkaplan gradyanı (Home ile uyum) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,hsl(var(--primary)/0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="whitespace-pre-line text-4xl font-bold tracking-tight sm:text-5xl">
            Hakkımda
          </h1>

          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Next.js, TypeScript ve sade arayüzler. <br />
            Bu sayfada iş yaklaşımım, kullandığım teknolojiler ve kısa bir yol hikayesi var.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/projects"
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Projeler
            </Link>
            <span aria-hidden="true" className="text-foreground/30">·</span>
            <Link
              href="/contact"
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              İletişim
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
