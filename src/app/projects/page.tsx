// src/app/projects/page.tsx
import React from "react";
import type { Metadata } from "next";

import { Page } from "@/components/layout/Page";
import { ProjectCard } from "@/components/ProjectCard";
import { numberWord } from "@/lib/number-words";
import { getAllCategories, getAllProjects, getProjectStats } from "@/constants/projects";
import ProjectsExplorer from "@/features/projects/sections/ProjectsExplorer.client";

/**
 * Both strings below counted the projects by hand, and one of them had already
 * drifted: it called every client build private while one of them had a live
 * public site. Reading the numbers off the data fixes the drift and keeps it
 * fixed.
 *
 * Neither mentions demo sites any more. They are sample sites rather than
 * projects and moved to /ornekler, so this page is client work and personal
 * work only.
 */
const stats = getProjectStats();

export const metadata: Metadata = {
  title: "Projects",
  description:
    `${numberWord(stats.total, { capitalize: true })} projects: ` +
    `${numberWord(stats.client)} built for paying clients, ${numberWord(stats.personal)} personal. ` +
    `What each one does and what it runs on.`,
  alternates: { canonical: "/projects" },
  /**
   * The openGraph block exists for `url`. Without one here the page inherited
   * the root layout's wholesale, so the listing advertised og:url "/" and the
   * site-wide title: a share of /projects previewed as the home page.
   */
  openGraph: {
    type: "website",
    url: "/projects",
    siteName: "Murat Zorlu",
    locale: "en_US",
    title: "Projects",
    description:
      "Small business demo sites, private client builds and personal projects. What each one does and what it runs on.",
  },
};

/**
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
export default function ProjectsPage(): React.JSX.Element {
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
    <Page
      title="Projects"
      description={
        `Client work first, then personal projects. ` +
        `${numberWord(stats.clientPrivate, { capitalize: true })} of the client builds are private, ` +
        `and each card says why.`
      }
    >
      <ProjectsExplorer items={items} categories={categories} />
    </Page>
  );
}
