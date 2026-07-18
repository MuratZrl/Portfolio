// src/app/projects/page.tsx
import React from "react";
import type { Metadata } from "next";

import { Page } from "@/components/layout/Page";
import Projects from "@/features/projects/sections/Projects.client.";

export const metadata: Metadata = {
  title: "Projects",
  description: "Five projects: three built for paying clients, two personal. What each one does, what it runs on, and what stayed private.",
};

export default function ProjectsPage(): React.JSX.Element {
  return (
    <Page title="Projects" description="Five projects. Three were paid client work and are private; the reasons are on each card.">
      <Projects source="all" />
    </Page>
  );
}
