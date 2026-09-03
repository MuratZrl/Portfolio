// src/app/[locale]/projects/page.tsx
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Page } from "@/components/layout/Page";
import { ProjectCard } from "@/components/ProjectCard";
import { getAllCategories, getAllProjects } from "@/constants/projects";
import ProjectsExplorer from "@/features/projects/sections/ProjectsExplorer.client";
import { routing } from "@/i18n/routing";
import { localeAlternates, localizedPath, OG_LOCALE, socialImages } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "projectsPage.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates(locale, "/projects", { enOnly: true }),
    openGraph: {
      type: "website",
      url: localizedPath(locale, "/projects"),
      siteName: "Murat Zorlu",
      locale: OG_LOCALE[locale],
      title: t("title"),
      description: t("description"),
      images: socialImages(locale).openGraph,
    },
  };
}

/**
 * English only. The project data is English content, so the bare /projects
 * URL is a permanent redirect to /en/projects (next.config.ts) and a Turkish
 * render of this page is a 404 rather than a half-translated list.
 *
 * Server component. The project data is read, sorted and rendered here, and
 * only two strings per project (slug, category) are handed to the client
 * filter. ProjectCard therefore stays on the server, which is what keeps its
 * withheld slab honest: the confidential values are never authored into
 * data.ts, and now the surrounding project objects never reach the browser
 * either.
 *
 * The page is ordered for a business owner shopping for a website, not for a
 * recruiter: the small business demo sites come first (see the note on
 * PROJECTS in constants/projects/data.ts), the client dashboards and personal
 * builds after them.
 */
export default async function ProjectsPage({ params }: Props): Promise<React.JSX.Element> {
  const { locale } = await params;
  if (locale !== "en") notFound();
  setRequestLocale(locale);

  const t = await getTranslations("projectsPage");
  const projects = getAllProjects();

  const items = projects.map((project) => ({
    slug: project.slug,
    category: project.category,
    card: <ProjectCard project={project} headingLevel={2} />,
  }));

  // Pill order, resolved here so the client half never imports the projects
  // barrel. getAllCategories() returns the categories in use, in the order
  // declared beside the union, not alphabetically.
  const categories = getAllCategories();

  return (
    <Page title={t("title")} description={t("description")}>
      <ProjectsExplorer items={items} categories={categories} />
    </Page>
  );
}
