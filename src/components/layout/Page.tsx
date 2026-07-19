// src/components/layout/Page.tsx
import React from "react";
import { cn } from "@/lib/utils";

type PageProps = {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

/**
 * Page: Sayfa içi dikey ritmi merkezileştirir.
 * - İlk section tepesini sıfırlar
 * - Section’lar arası aynı aralığı verir
 */
export function Page({
  title,
  description,
  actions,
  className,
  children,
}: PageProps): React.JSX.Element {
  return (
    <div className={cn(
      // Doğrudan çocuk olan section’ların aralığını yönetiyoruz
      "w-full [&>section]:mt-10 [&>section]:md:mt-12 [&>section:first-child]:mt-0",
      className
    )}>
      {(title || description || actions) ? (
        <header className="mb-6 md:mb-8">
          {title ? (
            /* --text-display-md, chosen by measurement rather than by eye:
               the old text-3xl / md:text-4xl pair rendered at 36px at 1440,
               and the token steps either side are 32px (md) and 48px (lg).

               font-bold and tracking-tight are gone with it. Both were
               overriding the base layer, which already gives every h1 the
               display face at weight 800 and a letter-spacing of 0.002em;
               font-bold was quietly pulling that back down to 700. */
            <h1 className="text-[length:var(--text-display-md)] leading-[1.15] text-[var(--text)]">
              {title}
            </h1>
          ) : null}
          {description ? (
            <p className="mt-2 text-muted-foreground">{description}</p>
          ) : null}
          {actions ? <div className="mt-4">{actions}</div> : null}
        </header>
      ) : null}

      {children}
    </div>
  );
}
