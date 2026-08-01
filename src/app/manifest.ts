// src/app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Murat Zorlu | Portfolio",
    short_name: "Portfolio",
    description:
      "Murat Zorlu, fullstack developer in Istanbul. Internal tools, admin panels and dashboards running in production.",
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
