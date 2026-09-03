// src/app/[locale]/paketler/page.tsx
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Page } from "@/components/layout/Page";
import Packages from "@/features/packages/sections/Packages";
import { routing } from "@/i18n/routing";
import { localizedPath, OG_LOCALE, socialImages } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

/**
 * The price list, Turkish only: its audience is a local business owner
 * searching in Turkish. /en/paketler is a permanent redirect back here
 * (next.config.ts), so the hreflang set lists the Turkish URL alone.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "packages.meta" });
  const canonical = localizedPath("tr", "/paketler");

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical, languages: { tr: canonical, "x-default": canonical } },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "Murat Zorlu",
      locale: OG_LOCALE[locale],
      title: t("title"),
      description: t("ogDescription"),
      images: socialImages(locale).openGraph,
    },
  };
}

/**
 * `Page` is rendered without a title on purpose. The section carries its own
 * heading and subheading, so it takes the h1 here rather than repeating the
 * word "Paketler" twice on one screen. Hero does the same thing on /.
 */
export default async function PackagesPage({ params }: Props): Promise<React.JSX.Element> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <Page>
      <Packages headingLevel={1} />
    </Page>
  );
}
