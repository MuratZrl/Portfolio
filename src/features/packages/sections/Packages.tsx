// src/features/packages/sections/Packages.tsx

import React from "react";
import { Check, Phone } from "lucide-react";

import { cn } from "@/lib/utils";

/* ────────────────────────────── Data ────────────────────────────── */

/**
 * Every CTA on this section is built from `e164`: the three wa.me links and
 * the tel: link on the third card. `display` is the printed form of that same
 * number and the only thing a reader ever sees.
 *
 * `e164` is digits only, country code first, no plus and no spaces, which is
 * the form wa.me expects in the URL path.
 */
export const CONTACT_PHONE = {
  e164: "905416577925",
  display: "+90 541 657 79 25",
} as const;

type PackageItem = {
  id: string;
  title: string;
  summary: string;
  features: readonly string[];
  /**
   * No package prints a figure. Every card carries the same sentence and the
   * number is settled in the conversation the CTA starts.
   */
  price: string;
  cta: {
    label: string;
    /** Prefilled into the wa.me link, URL-encoded at render. */
    message: string;
  };
  /** Prints a second, visible tel: link under the CTA. */
  showPhone: boolean;
};

/**
 * The single source for this section. Feature lists, price lines and CTA
 * text all live here: change a string once and it changes everywhere it is
 * rendered.
 */
const PRICE_NOTE = "Fiyat görüşmede netleşir";

const PACKAGES: readonly PackageItem[] = [
  {
    id: "tanitim-sitesi",
    title: "Tanıtım Sitesi",
    summary:
      "Google'da bulunabilir, telefonda düzgün açılan, tek adresli bir site.",
    features: [
      "5 sayfa, mobil uyumlu tasarım",
      "Google ve Google Haritalar'da doğru görünme (SEO temeli)",
      "Instagram profilinize koyacağınız tek link",
      "Formdan gelen talep doğrudan WhatsApp'ınıza düşer",
      "Alan adı ve SSL ilk yıl dahil",
      "Alan adı sizin adınıza kayıtlı, site tamamen sizin",
    ],
    price: PRICE_NOTE,
    cta: {
      label: "Teklif alın",
      message: "Merhaba, Tanıtım Sitesi paketi için bilgi almak istiyorum.",
    },
    showPhone: false,
  },
  {
    id: "katalog-portfoy-sitesi",
    title: "Katalog / Portföy Sitesi",
    summary:
      "İlan, ürün veya hizmetlerinizin listelendiği, kendi panelinizden yönettiğiniz site.",
    features: [
      "Sınırsız kayıt: ilan, ürün veya hizmet",
      "Kendi panelinizden ekleme, düzenleme, yayından kaldırma",
      "Arama ve filtreleme, detay sayfaları, galeri, harita",
      "Her kayıt Google'da ayrı sayfa olarak çıkar",
      "Formdan gelen talep doğrudan WhatsApp'ınıza düşer",
      "Alan adı ve SSL ilk yıl dahil, alan adı sizin adınıza",
    ],
    price: PRICE_NOTE,
    cta: {
      label: "Teklif alın",
      message:
        "Merhaba, Katalog / Portföy Sitesi paketi için bilgi almak istiyorum.",
    },
    showPhone: false,
  },
  {
    id: "yonetim-panelli-sistem",
    title: "Yönetim Panelli Sistem",
    summary:
      "Randevu, sipariş veya üyelik gibi süreçlerin uçtan uca yönetildiği özel yazılım.",
    features: [
      "Randevu, sipariş veya kayıt yönetimi",
      "Kullanıcı girişi ve yetkilendirme",
      "Veritabanı, kayıt geçmişi ve raporlama",
      "WhatsApp ve e-posta bildirimleri",
      "İşleyişinize göre tasarlanan panel",
      "Kurulum ve bakım kapsama göre belirlenir",
    ],
    price: PRICE_NOTE,
    cta: {
      label: "Arayın, konuşalım",
      message:
        "Merhaba, yönetim panelli bir sistem için görüşmek istiyorum.",
    },
    showPhone: true,
  },
] as const;

/* ────────────────────────────── Copy ────────────────────────────── */

const HEADING = "Paketler";
const SUBHEADING =
  "Ne yaptırmak istediğinize göre üç ana çalışma biçimi var. Aradığınız tam olarak bunlardan biri değilse yazın, birlikte netleştirelim.";
const FOOTNOTE = "Kapsam ve teslim süresi görüşmede netleştirilir.";
const NEW_TAB_NOTE = "yeni sekmede açılır";

/** A module constant, not useId: this section stays a server component. */
const HEADING_ID = "packages-heading";

/* ────────────────────────────── Helpers ────────────────────────────── */

function whatsappHref(message: string): string {
  return `https://wa.me/${CONTACT_PHONE.e164}?text=${encodeURIComponent(message)}`;
}

/* ────────────────────────────── Component ────────────────────────────── */

type PackagesProps = {
  /**
   * 1 where this section is the whole page and owns the h1 (/paketler), the
   * way Hero owns it on /. 2 where it sits under another page's h1. Card
   * titles follow one step down either way, so the outline never skips.
   */
  headingLevel?: 1 | 2;
  className?: string;
};

/**
 * Three packages, one card each, no card-level affordance: the card is not a
 * link, so it gets no `.interactive` and no hover state. The CTA inside it is
 * the only thing you can press.
 *
 * The section is `lang="tr"` because the document is `lang="en"` and every
 * string below is Turkish. Without it a screen reader reads this page in the
 * wrong voice.
 *
 * Server component: nothing here is stateful.
 */
export default function Packages({
  headingLevel = 2,
  className,
}: PackagesProps): React.JSX.Element {
  const Heading = (headingLevel === 1 ? "h1" : "h2") as "h1" | "h2";
  const CardHeading = (headingLevel === 1 ? "h2" : "h3") as "h2" | "h3";

  return (
    <section
      lang="tr"
      aria-labelledby={HEADING_ID}
      className={cn("w-full", className)}
    >
      <Heading
        id={HEADING_ID}
        className="text-[length:var(--text-display-md)] leading-[1.05] text-[var(--text)]"
      >
        {HEADING}
      </Heading>
      <p className="mt-2 max-w-[68ch] text-[length:var(--text-body-lead)] leading-[1.55] text-[var(--text-muted)]">
        {SUBHEADING}
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PACKAGES.map((pkg) => (
          <article
            key={pkg.id}
            className="plate flex flex-col p-6 sm:p-7"
          >
            <CardHeading className="text-[length:var(--text-display-sm)] leading-[1.15] text-[var(--text)]">
              {pkg.title}
            </CardHeading>

            <p className="mt-2 text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--text-muted)]">
              {pkg.summary}
            </p>

            <ul role="list" className="mt-5 mb-6 grid gap-2.5">
              {pkg.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-2 text-[length:var(--text-body-sm)] leading-[1.5] text-[var(--text)]"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-[var(--accent)]"
                    aria-hidden
                  />
                  {feature}
                </li>
              ))}
            </ul>

            {/* `mt-auto` pins the price and the CTA to the foot of the card,
                so the three buttons line up however unevenly the summaries
                and feature lists wrap above them. */}
            <div className="mt-auto border-t border-[var(--edge-soft)] pt-4">
              <p className="text-[length:var(--text-body-base)] font-medium leading-[1.5] text-[var(--text)]">
                {pkg.price}
              </p>

              {/* Above the button, not below it. Below, the extra line pushes
                  this card's CTA 36px clear of the other two and the row of
                  buttons stops reading as a row. */}
              {pkg.showPhone ? (
                <a
                  href={`tel:+${CONTACT_PHONE.e164}`}
                  draggable={false}
                  className="link-soft mt-3 inline-flex min-h-6 items-center gap-2 text-[length:var(--text-body-sm)] font-medium text-[var(--accent)]"
                >
                  <Phone className="size-3.5" aria-hidden />
                  {CONTACT_PHONE.display}
                </a>
              ) : null}
            </div>

            <a
              href={whatsappHref(pkg.cta.message)}
              target="_blank"
              rel="noopener noreferrer"
              draggable={false}
              className="soft-btn soft-btn-primary mt-5 inline-flex min-h-11 w-full items-center justify-center px-5 text-[length:var(--text-body-sm)] font-medium"
            >
              {pkg.cta.label}
              <span className="sr-only"> ({NEW_TAB_NOTE})</span>
            </a>
          </article>
        ))}
      </div>

      <p className="mt-6 text-[length:var(--text-body-sm)] text-[var(--text-muted)]">
        {FOOTNOTE}
      </p>
    </section>
  );
}
