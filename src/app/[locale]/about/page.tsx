// src/app/[locale]/about/page.tsx
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Page } from "@/components/layout/Page";
import { routing } from "@/i18n/routing";
import { localeAlternates, localizedPath, OG_LOCALE } from "@/lib/site";

import AboutIntro from "@/features/about/sections/AboutIntro.client";
import ExperienceTimeline from "@/features/about/sections/Experience.client";
import CvSection from "@/features/about/sections/CV.client";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "about.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates(locale, "/about", { enOnly: true }),
    openGraph: {
      type: "profile",
      url: localizedPath(locale, "/about"),
      siteName: "Murat Zorlu",
      locale: OG_LOCALE[locale],
      title: t("title"),
      description: t("ogDescription"),
    },
  };
}

/**
 * English only: the CV and the experience timeline are English content, so
 * the bare /about URL is a permanent redirect to /en/about (next.config.ts).
 */
export default async function AboutPage({ params }: Props): Promise<React.JSX.Element> {
  const { locale } = await params;
  if (locale !== "en") notFound();
  setRequestLocale(locale);

  const t = await getTranslations("about");

  return (
    <Page title={t("title")} description={t("description")}>
      {/* Page owns the h1, so AboutIntro's name renders as an h2. */}
      <AboutIntro />
      <ExperienceTimeline />
      <CvSection />
    </Page>
  );
}
