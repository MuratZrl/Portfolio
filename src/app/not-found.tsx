// src/app/not-found.tsx
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Page } from "@/components/layout/Page";

export default function NotFound(): React.JSX.Element {
  return (
    <Page>
      <section
        aria-labelledby="not-found-title"
        className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center text-center"
      >
        <p className="text-sm font-medium text-muted-foreground">404</p>

        <h1
          id="not-found-title"
          className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Page not found
        </h1>

        <p className="mt-3 text-pretty text-muted-foreground">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <Button asChild>
            <Link href="/">Go home</Link>
          </Button>

          <Link
            href="/projects"
            className="inline-flex h-11 items-center text-sm font-medium underline underline-offset-4 text-muted-foreground hover:text-foreground"
            aria-label="See all projects"
          >
            View projects
          </Link>
        </div>
      </section>
    </Page>
  );
}
