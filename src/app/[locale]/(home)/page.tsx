// src/app/[locale]/(home)/page.tsx
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Page } from "@/components/layout/Page";
import { routing } from "@/i18n/routing";
import { localeAlternates, localizedPath, OG_LOCALE } from "@/lib/site";

import HomeEn from "@/features/home/HomeEn";
import HomeTr from "@/features/home/HomeTr";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "home.meta" });

  return {
    title: { absolute: t("title") },
    description: t("description"),
    alternates: localeAlternates(locale, "/"),
    openGraph: {
      type: "website",
      url: localizedPath(locale, "/"),
      siteName: "Murat Zorlu",
      locale: OG_LOCALE[locale],
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
  };
}

/**
 * Two homes, one route. The Turkish home is the small-business offer, the
 * English home is the developer portfolio; they share the layout, the design
 * system and most section components, and differ in copy and section set.
 */
export default async function HomePage({ params }: Props): Promise<React.JSX.Element> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <Page>{locale === "en" ? <HomeEn /> : <HomeTr />}</Page>;
}
