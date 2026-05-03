// src/features/about/sections/CvSection.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ExternalLink, FileDown, FileText } from "lucide-react";

type CvViewerProps = {
  pdfSrc?: `/${string}`;
  title?: string;
  description?: string;
  maxHeightPx?: number;
  className?: string;
};

export default function CvSection({
  pdfSrc = "/cv/Murat_Zorlu_CV.pdf",
  title = "CV",
  description = "View inline, download, or open in a new tab.",
  maxHeightPx = 1000,
  className,
}: CvViewerProps): React.JSX.Element {
  const [mounted, setMounted] = React.useState(false);
  const INITIAL_HEIGHT = Math.min(720, maxHeightPx);
  const [height, setHeight] = React.useState(INITIAL_HEIGHT);

  React.useEffect(() => {
    setMounted(true);
    const apply = (): void => setHeight(calcHeight(maxHeightPx));
    apply();
    window.addEventListener("resize", apply, { passive: true });
    return () => window.removeEventListener("resize", apply);
  }, [maxHeightPx]);

  const headingId = React.useId();
  const descId = React.useId();
  const iframeSrc = `${pdfSrc}#zoom=page-width`;

  return (
    <section aria-labelledby={headingId} className={cn("py-12 sm:py-16", className)}>
      <div className="mb-8 flex flex-col gap-2">
        <h2 id={headingId} className="text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
        <p id={descId} className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className={cn(
        "rounded-2xl border p-5 sm:p-6",
        "border-border/50 bg-card/80 backdrop-blur-sm",
      )}>
        {/* Action bar */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="h-4 w-4" aria-hidden />
            </div>
            <div>
              <div className="text-sm font-semibold">Murat_Zorlu_CV.pdf</div>
              <div className="text-xs text-muted-foreground">PDF document</div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:ml-auto">
            <a
              href={pdfSrc}
              download
              aria-label="Download CV"
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium",
                "bg-muted text-muted-foreground transition-colors duration-200",
                "hover:bg-muted/80 hover:text-foreground",
              )}
            >
              <FileDown className="h-3.5 w-3.5" aria-hidden />
              Download
            </a>

            <a
              href={pdfSrc}
              target="_blank"
              rel="noreferrer"
              aria-label="Open CV in a new tab"
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium",
                "bg-primary text-primary-foreground transition-colors duration-200",
                "hover:bg-primary/90",
              )}
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              Open
            </a>
          </div>
        </div>

        {/* PDF viewer */}
        <div className="overflow-hidden rounded-xl border border-border/50">
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
              className="grid w-full place-items-center bg-muted text-muted-foreground"
              style={{ height: INITIAL_HEIGHT }}
              aria-hidden
            >
              <div className="flex flex-col items-center gap-2">
                <FileText className="h-8 w-8 opacity-40" aria-hidden />
                <span className="text-xs">Loading viewer...</span>
              </div>
            </div>
          )}
        </div>

        <noscript>
          <p className="mt-4 text-sm text-muted-foreground">
            JavaScript is disabled.{" "}
            <a className="text-primary underline" href={pdfSrc} target="_blank" rel="noreferrer">
              Open CV in a new tab
            </a>{" "}
            or{" "}
            <a className="text-primary underline" href={pdfSrc} download>
              download it
            </a>
            .
          </p>
        </noscript>
      </div>
    </section>
  );
}

/* --------------------------------- Utils ---------------------------------- */

function calcHeight(maxHeightPx: number): number {
  const vh = window.innerHeight;
  const base = vh < 640 ? Math.round(vh * 0.7) : Math.round(vh * 0.8);
  return Math.min(base, maxHeightPx);
}
