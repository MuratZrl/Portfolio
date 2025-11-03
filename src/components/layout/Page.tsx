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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
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
