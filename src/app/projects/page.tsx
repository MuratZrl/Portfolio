// src/app/projects/page.tsx
import React from "react";
import type { Metadata } from "next";

import { Page } from "@/components/layout/Page";
import { getGitHubRepos } from "@/lib/github";

import Projects from "@/features/projects/sections/Projects.client.";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of shipped work, demos, and experiments.",
};

export default async function ProjectsPage(): Promise<React.JSX.Element> {
  const githubProjects = await getGitHubRepos();

  return (
    <Page title="Projects" description="All the interesting stuff in one place.">

      <Projects source="all" extraProjects={githubProjects} />

    </Page>
  );
}
