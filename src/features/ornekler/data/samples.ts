// src/features/ornekler/data/samples.ts
//
// The showcase behind /ornekler. Audience is a shop owner deciding whether to
// have a site built, not a recruiter, so every visible string here is Turkish,
// plain and short.
//
// Each description was written after opening the live site and reading it, not
// from memory and not from the brief: the feature chips name only what is
// actually on the page. Two things that got corrected that way are worth
// knowing before editing this file. The car gallery calls itself "Pendik Oto
// Galeri" on its own site, so that is its name here. And the renovation site
// has no map of any kind, so it carries no harita chip while four of the
// others do.

export type SampleBadge = "Örnek" | "Gerçek müşteri";

export type SampleItem = {
  id: string;
  /** Industry, in the words a shop owner would use about themselves. */
  sector: string;
  name: string;
  /** One or two plain sentences on what is actually on the site. */
  description: string;
  /** Two to four short chips. Each one names something present on the page. */
  features: readonly string[];
  image: { src: string; alt: string };
  /** Opens in a new tab. */
  href: string;
  badge: SampleBadge;
  /**
   * Only on work that has a write-up elsewhere on this site. Internal route,
   * same tab.
   */
  detailHref?: string;
};

export type SampleSection = {
  id: string;
  title: string;
  items: readonly SampleItem[];
};

/**
 * "Örnek" is a sample built to show what the work looks like. "Gerçek müşteri"
 * is a site a real business is running. The two never share a label, so the
 * showcase cannot read as a longer client list than it is.
 */
export const SAMPLE_SECTIONS: readonly SampleSection[] = [
  {
    id: "web-siteleri",
    title: "Web siteleri",
    items: [
      {
        id: "salon-aura",
        sector: "Güzellik salonu",
        name: "Aura Güzellik Stüdyosu",
        description:
          "Tek sayfalık salon sitesi. Altı hizmetin her birinin yanında WhatsApp'tan randevu bağlantısı var, sayfanın altında çalışma saatleri ve harita duruyor.",
        features: ["WhatsApp randevu", "Türkçe ve İngilizce", "Harita", "Çalışma saatleri"],
        image: {
          src: "/images/ornekler/salon-aura.png",
          alt: "Aura Güzellik Stüdyosu ana sayfası: salon adı, randevu butonu ve hizmet listesi",
        },
        href: "https://salon-aura-demo.vercel.app",
        badge: "Örnek",
      },
      {
        id: "cafe-kavella",
        sector: "Kafe",
        name: "Kavella",
        description:
          "Beş sayfalık kahve evi sitesi: menü fiyatlarıyla, galeri, hakkımızda ve iletişim. WhatsApp bağlantısı her sayfanın üstünde duruyor.",
        features: ["Menü", "Galeri", "WhatsApp", "5 sayfa"],
        image: {
          src: "/images/ornekler/cafe-kavella.png",
          alt: "Kavella ana sayfası: kahve evi başlığı, menü bağlantısı ve sayfa menüsü",
        },
        href: "https://cafe-kavella-demo.vercel.app",
        badge: "Örnek",
      },
      {
        id: "oto-galeri",
        sector: "Oto galeri",
        name: "Pendik Oto Galeri",
        description:
          "İkinci el araç galerisi sitesi. Araçlar fiyat, yıl, kilometre ve yakıt bilgisiyle listeleniyor; devamında müşteri yorumları, harita ve çalışma saatleri var.",
        features: ["Araç listesi", "WhatsApp", "Harita", "Yorumlar"],
        image: {
          src: "/images/ornekler/oto-galeri.png",
          alt: "Pendik Oto Galeri ana sayfası: galeri adı, stoktaki araç sayısı ve araç kartları",
        },
        href: "https://oto-galeri-demo-sand.vercel.app",
        badge: "Örnek",
      },
      {
        id: "yildirim-boya-tadilat",
        sector: "Tadilat ve boya",
        name: "Yıldırım Boya Tadilat",
        description:
          "Tek sayfalık tadilat sitesi. Altı hizmet kalemi, biten işlerden fotoğraflar, müşteri yorumları ve keşif için telefon numarası var.",
        features: ["Hizmet listesi", "İş fotoğrafları", "WhatsApp", "Yorumlar"],
        image: {
          src: "/images/ornekler/yildirim-boya-tadilat.png",
          alt: "Yıldırım Boya Tadilat ana sayfası: firma adı, telefon numarası ve hizmet başlıkları",
        },
        href: "https://tadilat-demo.vercel.app",
        badge: "Örnek",
      },
      {
        id: "ritim-fitness",
        sector: "Spor salonu",
        name: "Ritim Fitness",
        description:
          "Tek sayfalık spor salonu sitesi. Üyelik paketleri fiyatlarıyla listeleniyor, haftalık ders programı var ve salonun o an açık mı kapalı mı olduğu üstte yazıyor.",
        features: ["Üyelik paketleri", "Ders programı", "WhatsApp", "Harita"],
        image: {
          src: "/images/ornekler/ritim-fitness.png",
          alt: "Ritim Fitness ana sayfası: salon adı, açık kapalı durumu ve fiyat butonu",
        },
        href: "https://ritim-fitness.vercel.app",
        badge: "Örnek",
      },
      {
        id: "yurtsever-emlak",
        sector: "Emlak",
        name: "Yurtsever Emlak",
        description:
          "Beş ofisi olan bir emlak firmasının sitesi. Her ofisin adresi ve haritası kendi sayfasında; ayrıca ekip, hakkımızda ve KVKK onayı alan bir iletişim formu var.",
        features: ["Ofis sayfaları", "Harita", "İletişim formu", "WhatsApp"],
        // The capture already in the repo for the /projects entry: the same
        // home page at the same 2560x1440, so it is referenced rather than
        // written to disk a second time.
        image: {
          src: "/images/projects/yurtsever-emlak.png",
          alt: "Yurtsever Emlak ana sayfası: firma adı, ofis fotoğrafları ve ofis isimleri",
        },
        href: "https://yurtseveremlak.com",
        badge: "Gerçek müşteri",
        detailHref: "/projects/yurtsever-emlak",
      },
    ],
  },
  {
    id: "isletme-yazilimlari",
    title: "İşletme yazılımları",
    items: [
      {
        id: "montaj-takip",
        sector: "Cam balkon ve doğrama firmaları",
        name: "Montaj takip paneli",
        description:
          "İşlerin keşiften teslime kadar izlendiği panel. Her iş keşif, teklif, onay, imalat ve montaj aşamalarından geçiyor; haftalık montaj takvimi ve bekleyen servis talepleri ayrı ekranlarda duruyor.",
        features: ["Keşif ve teklif", "Montaj takvimi", "Servis takibi", "İş aşamaları"],
        image: {
          src: "/images/ornekler/montaj-takip.png",
          alt: "Montaj takip paneli özet ekranı: iş aşamaları, haftanın montajları ve açık servis talepleri",
        },
        href: "https://montaj-takip-demo.vercel.app",
        badge: "Örnek",
      },
    ],
  },
];

/** Every item, flattened. Used for the card count in the page copy. */
export const ALL_SAMPLES: readonly SampleItem[] = SAMPLE_SECTIONS.flatMap((s) => s.items);
