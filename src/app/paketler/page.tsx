// src/app/paketler/page.tsx
import React from "react";
import type { Metadata } from "next";

import { Page } from "@/components/layout/Page";
import Packages from "@/features/packages/sections/Packages";

/**
 * The only Turkish page on the site, and the metadata says so: the audience
 * for a package list is a local business owner searching in Turkish.
 */
export const metadata: Metadata = {
  title: "Paketler",
  description:
    "Tanıtım sitesi, katalog sitesi ve yönetim panelli sistem. Üç çalışma biçimi ve kapsamı.",
  alternates: { canonical: "/paketler" },
  openGraph: {
    type: "website",
    url: "/paketler",
    siteName: "Murat Zorlu",
    locale: "tr_TR",
    title: "Paketler",
    description:
      "Tanıtım sitesi, katalog sitesi ve yönetim panelli sistem. Kapsam ve iletişim.",
  },
};

/**
 * `Page` is rendered without a title on purpose. The section carries its own
 * heading and subheading, so it takes the h1 here rather than repeating the
 * word "Paketler" twice on one screen. Hero does the same thing on /.
 */
export default function PackagesPage(): React.JSX.Element {
  return (
    <Page>
      <Packages headingLevel={1} />
    </Page>
  );
}
