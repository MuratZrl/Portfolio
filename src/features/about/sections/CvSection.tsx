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
  /** Public klasöründeki PDF yolu. Örn: /cv/MuratZorlu-CV.pdf */
  pdfSrc?: `/${string}`;
  title?: string;
  description?: string;
  /** Varsayılan görünüm modu */
  initialMode?: Mode;
  /** Maksimum yükseklik sınırı (px). Varsayılan: 1000 */
  maxHeightPx?: number;
  className?: string;
};

export default function CvSection({
  pdfSrc = "/cv/MuratZorlu-CV.pdf",
  title = "CV (PDF)",
  description = "PDF'yi sayfada görüntüleyin, indirin veya yeni sekmede açın.",
  initialMode = "fit-width",
  maxHeightPx = 1000,
  className,
}: CvViewerProps): React.JSX.Element {
  const [mode, ] = React.useState<Mode>(initialMode);
  const [height, setHeight] = React.useState<number>(calcHeight(maxHeightPx));

  // Viewport değiştikçe yüksekliği güncelle
  React.useEffect(() => {
    const onResize = (): void => setHeight(calcHeight(maxHeightPx));
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [maxHeightPx]);

  const headingId = React.useId();
  const descId = React.useId();

  const iframeHash =
    mode === "fit-page" ? "#view=FitH" : "#zoom=page-width";

  const iframeSrc = `${pdfSrc}${iframeHash}`;

  return (
    <section
      aria-labelledby={headingId}
      className={cn("py-12 sm:py-16", className)}
    >
      <Card>
        <CardHeader className="pb-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle id={headingId} className="text-xl sm:text-2xl">
                {title}
              </CardTitle>
              <CardDescription id={descId}>{description}</CardDescription>
            </div>

            {/* Kontrol çubuğu */}
            <div className="flex items-center gap-2">
              <Button asChild size="sm" variant="outline" aria-label="CV'yi indir">
                <a href={pdfSrc} download>
                  <FileDown className="mr-2 h-4 w-4" aria-hidden />
                  İndir
                </a>
              </Button>

              <Button asChild size="sm" aria-label="CV'yi yeni sekmede aç">
                <a href={pdfSrc} target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden />
                  Yeni sekmede aç
                </a>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="overflow-hidden rounded-md border">
            {/* Not: PDF viewer parametreleri tarayıcıya göre değişebilir.
               '#zoom=page-width' / '#view=FitH' çoğu modern tarayıcıda çalışır. */}
            <iframe
              title="CV PDF görüntüleyici"
              aria-describedby={descId}
              src={iframeSrc}
              className="block w-full bg-muted"
              style={{ height }}
            />
          </div>

          {/* PDF engellenirse veya yüklenemezse alternatif linkler zaten üstte var. */}
          <noscript>
            <p className="mt-3 text-sm text-muted-foreground">
              JavaScript devre dışı.{" "}
              <a className="underline" href={pdfSrc} target="_blank" rel="noreferrer">
                CV&apos;yi yeni sekmede aç
              </a>{" "}
              veya{" "}
              <a className="underline" href={pdfSrc} download>
                indir
              </a>
              .
            </p>
          </noscript>
        </CardContent>
      </Card>
    </section>
  );
}

/* --------------------------------- Bits ---------------------------------- */

function calcHeight(maxHeightPx: number): number {
  // Mobilde ~70vh, daha geniş ekranlarda ~80vh; üst limit ile sınırla
  if (typeof window === "undefined") return Math.min(720, maxHeightPx);
  const vh = window.innerHeight;
  const base = vh < 640 ? Math.round(vh * 0.7) : Math.round(vh * 0.8);
  return Math.min(base, maxHeightPx);
}
