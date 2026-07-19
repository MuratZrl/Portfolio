// src/app/projects/page.tsx
import React from "react";
import type { Metadata } from "next";

import { Page } from "@/components/layout/Page";
import { ProjectCard } from "@/components/ProjectCard";
import { getAllProjects } from "@/constants/projects";
import ProjectsExplorer from "@/features/projects/sections/ProjectsExplorer.client";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Five projects: three built for paying clients, two personal. What each one does, what it runs on, and what stayed private.",
};

/**
 * Server component. The project data is read, sorted and rendered here, and
 * only two strings per project (slug, category) are handed to the client
 * filter. ProjectCard therefore stays on the server, which is what keeps its
 * withheld slab honest: the confidential values are never authored into
 * data.ts, and now the surrounding project objects never reach the browser
 * either.
 */
export default function ProjectsPage(): React.JSX.Element {
  const projects = getAllProjects();

  const items = projects.map((project) => ({
    slug: project.slug,
    category: project.category,
    card: <ProjectCard project={project} headingLevel={2} />,
  }));

  return (
    <Page
      title="Projects"
      description="Five projects. Three were paid client work and are private; the reasons are on each card."
    >
      <ProjectsExplorer items={items} />
    </Page>
  );
}
