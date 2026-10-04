// src/app/ornekler/page.tsx
import React from "react";
import type { Metadata } from "next";

import { Page } from "@/components/layout/Page";
import Samples from "@/features/ornekler/sections/Samples";
import SamplesCta from "@/features/ornekler/sections/SamplesCta";

/**
 * The second Turkish page on the site, and the metadata says so: whoever
 * searches for a sample site for their own shop is searching in Turkish.
 * /paketler does the same.
 */
export const metadata: Metadata = {
  title: "Örnekler",
  description:
    "Canlı örnek siteler: güzellik salonu, kafe, oto galeri, tadilat, spor salonu ve emlak. Bir de cam balkon firmaları için montaj takip paneli.",
  alternates: { canonical: "/ornekler" },
  openGraph: {
    type: "website",
    url: "/ornekler",
    siteName: "Murat Zorlu",
    locale: "tr_TR",
    title: "Örnekler",
    description:
      "Sektörünüze yakın bir örneği açın, telefonunuzdan gezin. Hepsi canlı.",
  },
};

/**
 * `Page` is rendered without a title on purpose: Samples carries its own
 * heading and subheading, so it takes the h1 rather than repeating the word
 * "Örnekler" twice on one screen. /paketler and the home hero do the same.
 */
export default function SamplesPage(): React.JSX.Element {
  return (
    <Page>
      <Samples headingLevel={1} />
      <SamplesCta className="mt-12" />
    </Page>
  );
}
