// src/app/manifest.ts
import type { MetadataRoute } from "next";

function getBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "https://murat-zorlu-dev.vercel.app";
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

export default function manifest(): MetadataRoute.Manifest {
  const base = getBaseUrl();

  return {
    name: "Murat Zorlu — Portfolio",
    short_name: "Portfolio",
    description: "Developer portfolio built with Next.js 16 and TypeScript.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0B0B0C", // match your dark background if you prefer
    theme_color: "#09090b",      // Tailwind zinc-ish background
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      // If you add maskable icons later:
      // { src: "/icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    screenshots: [
      { src: `${base}/og-home.png`, sizes: "1200x630", type: "image/png" },
    ],
  };
}
