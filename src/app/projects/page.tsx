import React from "react";
import type { Metadata } from "next";
import { Page } from "@/components/layout/Page";
import ProjectsGrid from "@/features/projects/sections/ProjectsGrid";
import { getAllProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of shipped work, demos, and experiments.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects",
    description: "A collection of shipped work, demos, and experiments.",
    url: "/projects",
    type: "website",
  },
};

export default function ProjectsPage(): React.JSX.Element {
  const projects = getAllProjects();
  return (
    <Page
      title="Projects"
      description="All the interesting stuff in one place."
    >
      <ProjectsGrid projects={projects} />
    </Page>
  );
}
