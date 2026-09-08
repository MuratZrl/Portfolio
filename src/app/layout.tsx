// src/app/layout.tsx

import "./globals.css";

import React from "react";
import type { Metadata } from "next";

import { Darker_Grotesque, Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";
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

/**
 * Declared here rather than imported from `geist/font/mono` for one reason:
 * `preload`. The package calls next/font/local without that key, so it defaults
 * to true and every page preloads 71,004 bytes at High priority. The only thing
 * on the site that renders in this face is the code sample in CodePanel, which
 * sits inside `hidden lg:block` — so on a phone those bytes buy zero painted
 * glyphs while contending with the render-blocking stylesheet. next/font bakes
 * its options at compile time and the package exports a plain
 * `{ className, variable, style }`, so there is nothing to override from the
 * import side; re-declaring is the only way to reach the flag.
 *
 * Everything else matches geist/dist/mono.js exactly, including
 * `adjustFontFallback: false` and the fallback stack, so the emitted @font-face
 * is unchanged apart from the missing preload. With `preload: false` the file
 * is still fetched by any viewport that actually paints a `.font-mono` element,
 * because @font-face files load lazily on first match — desktop is unaffected.
 */
const monoFont = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  adjustFontFallback: false,
  preload: false,
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Roboto Mono",
    "Menlo",
    "Monaco",
    "Liberation Mono",
    "DejaVu Sans Mono",
    "Courier New",
    "monospace",
  ],
  weight: "100 900",
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
      className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable}`}
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
