// src/app/opengraph-image.tsx
//
// Open Graph image generated at build time by Next.js' file-based convention.
// Output: GET /opengraph-image -> image/png, 1200x630.

import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Murat Zorlu | Full-Stack Developer (Next.js, NestJS, TypeScript)";

export const size = {
  width: 1200,
  height: 630,
} as const;

export const contentType = "image/png";

// ---------------------------------------------------------------------------
// Design tokens
//
// Pulled from src/app/globals.css `.dark` block. Satori does not parse
// oklch(), so values are converted to their sRGB hex equivalents.
//
//   --background      oklch(0.145 0 0)      -> #0a0a0a
//   --foreground      oklch(0.985 0 0)      -> #fafafa
//   --muted-foreground oklch(0.708 0 0)     -> #a1a1a1
//   --primary         oklch(0.65 0.15 235)  -> #009bdc  (cyan-blue accent)
// ---------------------------------------------------------------------------
const COLOR_BG = "#0a0a0a";
const COLOR_FG = "#fafafa";
const COLOR_MUTED = "#a1a1a1";
const COLOR_ACCENT = "#009bdc";

// Satori does not support WOFF2 — it only parses TTF / OTF. Google Fonts
// serves WOFF2 to modern UAs, which is why the previous CSS-based loader
// failed at runtime with `Unsupported OpenType signature wOF2`.
//
// We fetch raw TTF files directly from jsDelivr, mirroring the official
// vercel/geist-font repo. These URLs return `Content-Type: font/ttf`.
const GEIST_REGULAR_TTF_URL =
  "https://cdn.jsdelivr.net/gh/vercel/geist-font@main/packages/next/dist/fonts/geist-sans/Geist-Regular.ttf";
const GEIST_BOLD_TTF_URL =
  "https://cdn.jsdelivr.net/gh/vercel/geist-font@main/packages/next/dist/fonts/geist-sans/Geist-Bold.ttf";

async function loadFont(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download font from ${url}: ${res.status}`);
  }
  return await res.arrayBuffer();
}

export default async function OpengraphImage(): Promise<ImageResponse> {
  const [geistRegular, geistBold] = await Promise.all([
    loadFont(GEIST_REGULAR_TTF_URL),
    loadFont(GEIST_BOLD_TTF_URL),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: COLOR_BG,
          color: COLOR_FG,
          fontFamily: "Geist",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Top-right radial glow — same primary cyan used on the home hero */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "780px",
            height: "780px",
            display: "flex",
            backgroundImage:
              "radial-gradient(circle at 70% 25%, rgba(0,155,220,0.22) 0%, rgba(0,155,220,0.07) 35%, rgba(0,155,220,0) 70%)",
          }}
        />

        {/* Accent bar + text */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "3px",
              height: "120px",
              background: COLOR_ACCENT,
              marginRight: "40px",
              display: "flex",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 96,
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: COLOR_FG,
                display: "flex",
              }}
            >
              Murat Zorlu
            </div>

            <div
              style={{
                fontSize: 48,
                fontWeight: 400,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                color: COLOR_MUTED,
                marginTop: 18,
                display: "flex",
              }}
            >
              Full-Stack Developer
            </div>

            <div
              style={{
                fontSize: 30,
                fontWeight: 400,
                letterSpacing: "0.02em",
                color: COLOR_ACCENT,
                marginTop: 36,
                display: "flex",
              }}
            >
              Next.js · NestJS · TypeScript
            </div>
          </div>
        </div>

        {/* Domain mark, bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            fontSize: 24,
            color: COLOR_MUTED,
            letterSpacing: "0.06em",
            display: "flex",
          }}
        >
          muratzorlu.dev
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Geist",
          data: geistRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Geist",
          data: geistBold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
