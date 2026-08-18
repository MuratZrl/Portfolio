// src/app/projects/page.tsx
import React from "react";
import type { Metadata } from "next";

import { Page } from "@/components/layout/Page";
import { ProjectCard } from "@/components/ProjectCard";
import { getAllCategories, getAllProjects } from "@/constants/projects";
import ProjectsExplorer from "@/features/projects/sections/ProjectsExplorer.client";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Eight projects: two live demo sites for small businesses, three private client builds, three personal projects. What each one does and what it runs on.",
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
      description="Small business websites first, then client work and personal projects. The two demo sites are live: click through them. The client builds are private; each card says why."
    >
      <ProjectsExplorer items={items} categories={categories} />
    </Page>
  );
}
