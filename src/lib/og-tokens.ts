// src/lib/og-tokens.ts
//
// MANUAL MIRROR of the .dark token block in src/app/globals.css. Nothing
// keeps these in sync automatically: whenever a token in that block changes,
// this file must be updated in the same commit. Satori (next/og) cannot
// resolve CSS custom properties, which is why the image routes import these
// constants instead of reading the stylesheet.

export const OG_GROUND = "#0A0A0B"; // .dark --ground
export const OG_TEXT = "#E8E8EA"; // .dark --text
export const OG_TEXT_MUTED = "#9A9AA3"; // .dark --text-muted
export const OG_ACCENT = "#3B82F6"; // .dark --accent
export const OG_ON_ACCENT = "#0A0A0B"; // .dark --on-accent

// --accent as raw channels, for rgba() gradient stops.
export const OG_ACCENT_RGB = "59, 130, 246";
