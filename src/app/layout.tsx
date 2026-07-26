// src/app/layout.tsx

import "./globals.css";

import React from "react";
import type { Metadata } from "next";

import { Darker_Grotesque, Instrument_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";

import { Container } from "@/components/layout/Container";

import { ThemeProvider } from "@/theme/theme-provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/**
 * Display face. `optional` rather than `swap`: Darker Grotesque is aggressively
 * condensed, so a fallback flash on a 34–56px headline is a CLS event. With
 * `optional` the font either arrives in the first ~100ms or is skipped for that
 * navigation and cached for the next — no layout shift either way.
 *
 * `latin` only. The sole non-ASCII character in shipped copy is `ü` (Yenigün),
 * which is inside the latin subset; latin-ext would be bytes with no glyphs.
 */
const displayFont = Darker_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "optional",
  preload: true,
  variable: "--font-display-face",
});

const sansFont = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-sans-face",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://muratzorlu.dev"),
  title: {
    default: "Murat Zorlu | Portfolio",
    template: "Murat Zorlu | %s",
  },
  description:
    "Murat Zorlu, fullstack developer in Istanbul. Next.js, NestJS, Go and PostgreSQL. Internal tools, admin panels and dashboards running in production.",
  authors: [{ name: "Murat Zorlu", url: "https://muratzorlu.dev" }],
  creator: "Murat Zorlu",
  publisher: "Murat Zorlu",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Murat Zorlu",
    title: "Murat Zorlu | Portfolio",
    description:
      "Fullstack developer in Istanbul. Next.js, NestJS, Go and PostgreSQL. Internal tools and admin panels running in production.",
    locale: "en_US",
    // The image is added automatically by src/app/opengraph-image.tsx.
  },
  twitter: {
    card: "summary_large_image",
    title: "Murat Zorlu | Portfolio",
    description:
      "Fullstack developer in Istanbul. Next.js, NestJS, Go and PostgreSQL. Internal tools and admin panels running in production.",
    // The image is added automatically by src/app/twitter-image.tsx.
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${displayFont.variable} ${sansFont.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-svh flex flex-col antialiased">
        {/* 2.4.1 Bypass Blocks. The site claims this in its own copy, so it
            has to exist and it has to be the first thing Tab reaches. */}
        <a href="#main" className="skip-link" draggable={false}>
          Skip to content
        </a>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />

          <main id="main" tabIndex={-1} className="flex-1 min-h-0 flex py-12 lg:py-16">
            <Container className="flex flex-1">
              <div className="flex flex-1 flex-col">{children}</div>
            </Container>
          </main>

          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
