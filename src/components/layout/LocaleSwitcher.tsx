// src/components/layout/LocaleSwitcher.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { isEnOnlyPath, isTrOnlyPath, localizedPath } from "@/lib/site";

/**
 * TR / EN, two links side by side. `usePathname` from the i18n navigation
 * returns the path without its locale prefix, so the same path is rebuilt
 * for each locale and the visitor lands on the same page in the other
 * language.
 *
 * Plain next/link with an explicit absolute path rather than the i18n Link
 * with a `locale` prop: that variant always prefixes the target, even the
 * default locale, so switching to Turkish would go to /tr and bounce off a
 * redirect to the bare path. There is no cookie and no detection, so the
 * bare path is unambiguously Turkish and can be linked directly.
 *
 * Pages that exist in one locale only are the exception: switching to
 * Turkish from /en/about would hit the /about -> /en/about redirect and go
 * nowhere, so those send the visitor to the other locale's home instead.
 */
export function LocaleSwitcher({ className }: { className?: string }): React.JSX.Element {
  const t = useTranslations("localeSwitcher");
  const current = useLocale();
  const pathname = usePathname();

  function targetFor(locale: Locale): string {
    if (locale === "tr" && isEnOnlyPath(pathname)) return localizedPath(locale, "/");
    if (locale === "en" && isTrOnlyPath(pathname)) return localizedPath(locale, "/");
    return localizedPath(locale, pathname);
  }

  return (
    <nav
      aria-label={t("label")}
      className={cn(
        "inline-flex select-none items-center overflow-hidden rounded-md border border-[var(--edge-soft)] text-xs font-medium",
        className,
      )}
    >
      {routing.locales.map((locale) => {
        const isCurrent = locale === current;
        return (
          <Link
            key={locale}
            href={targetFor(locale)}
            hrefLang={locale}
            lang={locale}
            draggable={false}
            aria-current={isCurrent ? "true" : undefined}
            className={cn(
              "inline-flex h-8 min-w-9 items-center justify-center px-2 interactive",
              isCurrent
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <span aria-hidden>{t(locale)}</span>
            <span className="sr-only">{t(`${locale}Name`)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
