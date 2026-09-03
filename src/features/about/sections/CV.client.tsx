// src/features/about/sections/CV.client.tsx
"use client";

import React from "react";
import { useTranslations } from "next-intl";
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
  title,
  description,
  maxHeightPx = 1000,
  className,
}: CvViewerProps): React.JSX.Element {
  const t = useTranslations("about.cv");
  const heading = title ?? t("title");
  const lead = description ?? t("description");
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
    <section aria-labelledby={headingId} className={cn("py-10 sm:py-12", className)}>
      <div className="mb-8 flex flex-col gap-2">
        {/* h2 takes the display face and weight from the base layer. */}
        <h2
          id={headingId}
          className="text-[length:var(--text-display-sm)] leading-[1.2] text-[var(--text)]"
        >
          {heading}
        </h2>
        <p id={descId} className="text-[length:var(--text-body-sm)] text-[var(--text-muted)]">
          {lead}
        </p>
      </div>

      {/* .plate already carries the border and radius. */}
      <div className="plate p-5 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            {/* The tinted bg-primary/10 square had no token behind it. Same
                call as the About intro: the icon carries the accent, the
                container goes away. */}
            <FileText className="size-5 flex-none text-[var(--accent)]" aria-hidden />
            <div>
              <div className="text-[length:var(--text-body-sm)] font-semibold text-[var(--text)]">
                Murat_Zorlu_CV.pdf
              </div>
              <div className="text-[length:var(--text-body-xs)] text-[var(--text-muted)]">
                {t("fileType")}
              </div>
            </div>
          </div>

          {/* Both are controls, so both take the button recipe: ghost for the
              secondary action, filled primary for the main one. */}
          <div className="flex items-center gap-3 sm:ml-auto">
            <a
              href={pdfSrc}
              download
              draggable={false}
              aria-label={t("downloadAria")}
              className="soft-btn soft-btn-ghost inline-flex min-h-9 select-none items-center gap-2 px-4 text-[length:var(--text-body-xs)] font-medium"
            >
              <FileDown className="size-3.5" aria-hidden />
              {t("download")}
            </a>

            <a
              href={pdfSrc}
              target="_blank"
              rel="noreferrer noopener"
              draggable={false}
              aria-label={t("openAria")}
              className="soft-btn soft-btn-primary inline-flex min-h-9 select-none items-center gap-2 px-4 text-[length:var(--text-body-xs)] font-medium"
            >
              <ExternalLink className="size-3.5" aria-hidden />
              {t("open")}
            </a>
          </div>
        </div>

        {/* An embedded document sits IN the plate, so the well it sits in is
            .recessed: the same primitive the inputs and the browser frames
            on the project pages use. */}
        <div className="recessed overflow-hidden">
          {mounted ? (
            <iframe
              title={t("viewerTitle")}
              aria-describedby={descId}
              src={iframeSrc}
              className="block w-full bg-[var(--ground)]"
              style={{ height }}
              loading="lazy"
            />
          ) : (
            <div
              className="grid w-full place-items-center bg-[var(--ground)] text-[var(--text-muted)]"
              style={{ height: INITIAL_HEIGHT }}
              aria-hidden
            >
              <div className="flex flex-col items-center gap-2">
                <FileText className="size-8 text-[var(--edge)]" aria-hidden />
                <span className="text-[length:var(--text-body-xs)]">{t("loading")}</span>
              </div>
            </div>
          )}
        </div>

        <noscript>
          <p className="mt-4 text-[length:var(--text-body-sm)] text-[var(--text-muted)]">
            {t("noJs")}{" "}
            <a
              className="link-soft font-medium text-[var(--accent)] underline"
              href={pdfSrc}
              target="_blank"
              rel="noreferrer noopener"
              draggable={false}
            >
              {t("noJsOpen")}
            </a>{" "}
            {t("noJsOr")}{" "}
            <a
              className="link-soft font-medium text-[var(--accent)] underline"
              href={pdfSrc}
              download
              draggable={false}
            >
              {t("noJsDownload")}
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
