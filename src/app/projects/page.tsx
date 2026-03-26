// src/app/projects/page.tsx
import React from "react";
import type { Metadata } from "next";

import { Page } from "@/components/layout/Page";
import { getGitHubRepos, enrichWithCommitCounts } from "@/lib/github";
import { getAllProjects } from "@/constants/projects";

import Projects from "@/features/projects/sections/Projects.client.";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of shipped work, demos, and experiments.",
};

export default async function ProjectsPage(): Promise<React.JSX.Element> {
  const [githubProjects, enrichedLocal] = await Promise.all([
    getGitHubRepos(),
    enrichWithCommitCounts(getAllProjects()),
  ]);

  return (
    <Page title="Projects" description="All the interesting stuff in one place.">

      <Projects source="all" localProjects={enrichedLocal} extraProjects={githubProjects} />

    </Page>
  );
}
