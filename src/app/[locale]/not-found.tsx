// src/app/[locale]/not-found.tsx
import React from "react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Page } from "@/components/layout/Page";
import { Link } from "@/i18n/navigation";

/**
 * Rendered for every unmatched path inside a locale (see [...rest]/page.tsx)
 * and for notFound() calls from pages. The secondary link points at the
 * second-most-useful page for that audience: packages for the Turkish site,
 * projects for the portfolio.
 */
export default function NotFound(): React.JSX.Element {
  const t = useTranslations("notFound");
  const locale = useLocale();
  const secondaryHref = locale === "en" ? "/projects" : "/paketler";

  return (
    <Page>
      <section
        aria-labelledby="not-found-title"
        className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center text-center"
      >
        <p className="text-sm font-medium text-muted-foreground">{t("label")}</p>

        <h1
          id="not-found-title"
          className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {t("title")}
        </h1>

        <p className="mt-3 text-pretty text-muted-foreground">{t("description")}</p>

        <div className="mt-6 flex items-center gap-3">
          <Button asChild>
            <Link href="/" draggable={false}>{t("home")}</Link>
          </Button>

          <Link
            href={secondaryHref}
            draggable={false}
            className="inline-flex h-11 select-none items-center text-sm font-medium underline underline-offset-4 text-muted-foreground hover:text-foreground"
            aria-label={t("secondaryAria")}
          >
            {t("secondary")}
          </Link>
        </div>
      </section>
    </Page>
  );
}
