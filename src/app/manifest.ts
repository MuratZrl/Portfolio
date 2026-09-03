// src/app/manifest.ts
import type { MetadataRoute } from "next";

import tr from "../../messages/tr.json";

/**
 * One manifest for the whole origin, so it speaks the site default: Turkish.
 * The strings are read straight from the message file rather than through
 * next-intl, because this route sits outside the [locale] segment.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: tr.layout.title,
    short_name: "Murat Zorlu",
    description: tr.layout.description,
    lang: "tr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    // The manifest takes a single value, so both mirror the .dark --ground
    // token (#0A0A0B) from globals.css: an install splash flashing white
    // before a dark-capable site is worse than the reverse.
    background_color: "#0A0A0B",
    theme_color: "#0A0A0B",
    // The MZ tile rendered from src/app/icon.svg's path data. apple-icon and
    // favicon.ico ship via the app/ file convention, not the manifest.
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
