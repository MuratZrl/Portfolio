// src/features/local/sections/Examples.tsx
//
// "Örnekler": three sites a business owner can open, on the same card recipe
// the project cards use. The difference from ProjectCard is the target: these
// cards link straight to the live site, not to a case study, because the
// visitor is shopping for a website and the site itself is the evidence.
//
// Server component. Copy comes from `home.examples`; hrefs, images and the
// live/demo flag are data and stay here.

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

type ExampleKey = "yenigun" | "ritim" | "salon";

type Example = {
  key: ExampleKey;
  href: string;
  image: string;
  status: "live" | "demo";
};

const EXAMPLES: readonly Example[] = [
  {
    key: "yenigun",
    href: "https://yenigunemlak.com",
    image: "/images/projects/yenigunemlak.png",
    status: "live",
  },
  {
    key: "ritim",
    href: "https://ritim-fitness.vercel.app",
    image: "/images/projects/ritim-fitness.png",
    status: "demo",
  },
  {
    key: "salon",
    href: "https://salon-aura-demo.vercel.app",
    image: "/images/projects/salon-aura.png",
    status: "demo",
  },
] as const;

const HEADING_ID = "examples-heading";

type ExamplesProps = {
  /** Anchor id; the hero's secondary button points here. */
  id?: string;
  className?: string;
};

export default function Examples({ id, className }: ExamplesProps): React.JSX.Element {
  const t = useTranslations("home.examples");
  const tCommon = useTranslations("common");

  return (
    <section id={id} aria-labelledby={HEADING_ID} className={cn("py-10 sm:py-12", className)}>
      <h2
        id={HEADING_ID}
        className="text-[length:var(--text-display-md)] font-bold leading-[1.05] text-[var(--text)]"
      >
        {t("heading")}
      </h2>
      <p className="mt-2 text-[length:var(--text-body-base)] text-[var(--text-muted)]">{t("subheading")}</p>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {EXAMPLES.map((ex) => (
          <article
            key={ex.key}
            // `relative` is load-bearing: the title link stretches an ::after
            // over the whole card, and needs a positioned ancestor to stop it
            // covering the whole document. Same note as ProjectCard.
            className="plate interactive group relative flex flex-col overflow-hidden"
          >
            <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--edge-soft)] bg-[var(--muted)]">
              <Image
                src={ex.image}
                alt={t(`items.${ex.key}.imageAlt`)}
                fill
                draggable={false}
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col gap-4 p-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-[var(--text-muted)]">
                  {t(`items.${ex.key}.sector`)}
                </span>
                <span className="flex items-center gap-2 text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-[var(--text-muted)]">
                  <span aria-hidden className="h-px w-4 bg-[var(--edge)]" />
                  {t(ex.status)}
                </span>
              </div>

              <h3 className="text-[length:var(--text-display-xs)] font-bold leading-[1.2] text-[var(--text)]">
                <a
                  href={ex.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  draggable={false}
                  className="after:absolute after:inset-0 after:content-[''] group-focus-within:underline group-hover:underline"
                >
                  {t(`items.${ex.key}.title`)}
                  <span className="sr-only"> ({tCommon("opensInNewTab")})</span>
                </a>
              </h3>

              <p className="text-[length:var(--text-body-sm)] leading-[1.5] text-[var(--text-muted)]">
                {t(`items.${ex.key}.summary`)}
              </p>

              <div className="relative z-10 mt-auto flex flex-wrap items-center gap-4 border-t border-[var(--edge-soft)] pt-4 text-[length:var(--text-body-sm)]">
                <a
                  href={ex.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-soft inline-flex items-center gap-1.5 font-medium text-[var(--accent)]"
                  draggable={false}
                >
                  <ExternalLink className="size-4" aria-hidden />
                  {t("visit")}
                  <span className="sr-only"> ({tCommon("opensInNewTab")})</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
