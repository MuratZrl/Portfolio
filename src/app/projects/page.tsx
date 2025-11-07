// src/app/projects/page.tsx
import React from "react";
import type { Metadata } from "next";

import { Page } from "@/components/layout/Page";

import Projects from "@/features/projects/sections/Projects.client.";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of shipped work, demos, and experiments.",
};

export default function ProjectsPage(): React.JSX.Element {
  return (
    <Page title="Projects" description="All the interesting stuff in one place.">
      
      <Projects source="all" />

      {/* veya: <Projects source="featured" limit={6} /> */}

    </Page>
  );
}
