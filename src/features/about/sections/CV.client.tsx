// src/features/about/sections/CvSection.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileDown } from "lucide-react";

type Mode = "fit-width" | "fit-page";

type CvViewerProps = {
  /** PDF path under /public, e.g. /cv/MuratZorlu-CV.pdf */
  pdfSrc?: `/${string}`;
  title?: string;
  description?: string;
  /** Initial viewer mode */
  initialMode?: Mode;
  /** Max height clamp (px). Default: 1000 */
  maxHeightPx?: number;
  className?: string;
};

export default function CvSection({
  pdfSrc = "/cv/MuratZorlu-CV.pdf",
  title = "CV (PDF)",
  description = "View the PDF on page, download, or open in a new tab.",
  initialMode = "fit-width",
  maxHeightPx = 1000,
  className,
}: CvViewerProps): React.JSX.Element {
  // never read window during initial render
  const [mounted, setMounted] = React.useState<boolean>(false);
  const INITIAL_HEIGHT = Math.min(720, maxHeightPx);
  const [height, setHeight] = React.useState<number>(INITIAL_HEIGHT);

  React.useEffect(() => {
    setMounted(true);
    const apply = (): void => setHeight(calcHeight(maxHeightPx));
    apply();
    window.addEventListener("resize", apply, { passive: true });
    return () => window.removeEventListener("resize", apply);
  }, [maxHeightPx]);

  const headingId = React.useId();
  const descId = React.useId();

  const iframeHash = initialMode === "fit-page" ? "#view=FitH" : "#zoom=page-width";
  const iframeSrc = `${pdfSrc}${iframeHash}`;

  return (
    <section aria-labelledby={headingId} className={cn("py-12 sm:py-16", className)}>
      <Card>
        <CardHeader className="pb-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle id={headingId} className="text-xl sm:text-2xl">
                {title}
              </CardTitle>
              <CardDescription id={descId}>{description}</CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <Button asChild size="sm" variant="outline" aria-label="Download CV">
                <a href={pdfSrc} download>
                  <FileDown className="mr-2 h-4 w-4" aria-hidden />
                  Download
                </a>
              </Button>

              <Button asChild size="sm" aria-label="Open CV in a new tab">
                <a href={pdfSrc} target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden />
                  Open in new tab
                </a>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="overflow-hidden rounded-md border">
            {/* SSR-safe: render placeholder on server and first client render.
               After mount, swap to real iframe with computed height. */}
            {mounted ? (
              <iframe
                title="CV PDF viewer"
                aria-describedby={descId}
                src={iframeSrc}
                className="block w-full bg-muted"
                style={{ height }}
                loading="lazy"
              />
            ) : (
              <div
                className="block w-full bg-muted"
                style={{ height: INITIAL_HEIGHT }}
                aria-hidden
              />
            )}
          </div>

          <noscript>
            <p className="mt-3 text-sm text-muted-foreground">
              JavaScript is disabled.{" "}
              <a className="underline" href={pdfSrc} target="_blank" rel="noreferrer">
                Open CV in a new tab
              </a>{" "}
              or{" "}
              <a className="underline" href={pdfSrc} download>
                download it
              </a>
              .
            </p>
          </noscript>
        </CardContent>
      </Card>
    </section>
  );
}

/* --------------------------------- Utils ---------------------------------- */

function calcHeight(maxHeightPx: number): number {
  const vh = window.innerHeight;
  const base = vh < 640 ? Math.round(vh * 0.7) : Math.round(vh * 0.8);
  return Math.min(base, maxHeightPx);
}
