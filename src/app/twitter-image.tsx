// src/app/twitter-image.tsx
//
// Twitter card image — shares the renderer from opengraph-image.tsx so the
// JSX/font-loading logic stays in one place. Route segment config
// (`runtime`, `alt`, `size`, `contentType`) must be declared inline here:
// Next.js statically parses these fields and refuses re-exports.

export const runtime = "edge";

export const alt = "Murat Zorlu: I build the internal tools companies run on";

export const size = {
  width: 1200,
  height: 630,
} as const;

export const contentType = "image/png";

export { default } from "./opengraph-image";
