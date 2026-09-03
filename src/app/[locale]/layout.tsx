// src/app/[locale]/layout.tsx

import "./globals.css";

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Darker_Grotesque, Instrument_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { routing } from "@/i18n/routing";
import { localeAlternates, localizedPath, OG_LOCALE } from "@/lib/site";

import { ThemeProvider } from "@/theme/theme-provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/**
 * Display face. `optional` rather than `swap`: Darker Grotesque is aggressively
 * condensed, so a fallback flash on a 34–56px headline is a CLS event. With
 * `optional` the font either arrives in the first ~100ms or is skipped for that
 * navigation and cached for the next — no layout shift either way.
 *
 * `latin-ext` alongside `latin`: the Turkish locale needs ğ, ş, ı, İ, ç and ö,
 * none of which are in the latin subset. Without the extension every Turkish
 * headline would render those six glyphs in the fallback face.
 */
const displayFont = Darker_Grotesque({
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800"],
  display: "optional",
  preload: true,
  variable: "--font-display-face",
});

const sansFont = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
  variable: "--font-sans-face",
  adjustFontFallback: true,
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

/** Both locales are prerendered at build; nothing here is per-request. */
export function generateStaticParams(): Array<{ locale: string }> {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "layout" });
  const otherLocale = routing.locales.find((l) => l !== locale);

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://muratzorlu.dev"),
    title: {
      default: t("title"),
      template: t("template"),
    },
    description: t("description"),
    authors: [{ name: "Murat Zorlu", url: "https://muratzorlu.dev" }],
    creator: "Murat Zorlu",
    publisher: "Murat Zorlu",
    alternates: localeAlternates(locale, "/"),
    openGraph: {
      type: "website",
      url: localizedPath(locale, "/"),
      siteName: "Murat Zorlu",
      title: t("ogTitle"),
      description: t("ogDescription"),
      locale: OG_LOCALE[locale],
      alternateLocale: otherLocale ? OG_LOCALE[otherLocale] : undefined,
      // The image is added automatically by src/app/[locale]/opengraph-image.tsx.
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      // The image is added automatically by src/app/[locale]/twitter-image.tsx.
    },
  };
}

export default async function LocaleLayout({ children, params }: Props): Promise<React.JSX.Element> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Static rendering: tells next-intl which locale this render is for, so no
  // request header has to be read and the page keeps its build-time prerender.
  setRequestLocale(locale);

  const t = await getTranslations("common");

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${displayFont.variable} ${sansFont.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-svh flex flex-col antialiased">
        {/* 2.4.1 Bypass Blocks. The site claims this in its own copy, so it
            has to exist and it has to be the first thing Tab reaches. */}
        <a href="#main" className="skip-link" draggable={false}>
          {t("skipToContent")}
        </a>

        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navbar />

            <main id="main" tabIndex={-1} className="flex-1 min-h-0 flex py-12 lg:py-16">
              <Container className="flex flex-1">
                <div className="flex flex-1 flex-col">{children}</div>
              </Container>
            </main>

            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
