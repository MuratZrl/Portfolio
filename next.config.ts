import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const isDev = process.env.NODE_ENV === "development";

// Content-Security-Policy, set statically so pages keep static generation.
// The deliberate tradeoff (decided 2026-08-01): 'unsafe-inline' in script-src
// caps securityheaders.com at grade A. The strict alternative is a per-request
// nonce via a proxy.ts, which forces every HTML route into dynamic rendering;
// rejected because edge-cached static pages matter more here than the A+ badge.
//
// The directive list comes from an audit of what the site loads, all of it
// same-origin in production: /_next/static chunks and CSS, /_next/image,
// next/font files, fetch("/api/contact"), Vercel Analytics at
// /_vercel/insights/, and the CV PDF iframe on /about (frame-src 'self').
// 'unsafe-eval' is dev-only: React uses eval for server-error stacks in
// development, never in production.
//
// img-src 'self' is now literally true: every image on the site is a local
// file under public/images. The placehold.co fallback that used to sit behind
// project cards is gone, and with it the images.remotePatterns entry that
// allowed it. Note that the fallback was rendered with `unoptimized`, so it
// bypassed /_next/image and this directive would have blocked it outright.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

// HSTS is absent on purpose: Vercel already sets it at the platform level and
// a duplicate would be sent twice.
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  devIndicators: false,
  async redirects() {
    // The developer-portfolio pages exist only in English. Their old bare
    // URLs keep resolving through a permanent redirect rather than turning
    // into Turkish 404s. /paketler is the mirror case: Turkish only, so the
    // prefixed form folds back to the bare path. These run before the locale
    // proxy in src/proxy.ts, which then rewrites the /en target internally.
    return [
      { source: "/about", destination: "/en/about", permanent: true },
      { source: "/projects", destination: "/en/projects", permanent: true },
      { source: "/projects/:path*", destination: "/en/projects/:path*", permanent: true },
      { source: "/en/paketler", destination: "/paketler", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // The about page embeds this PDF in a same-origin iframe
        // (src/features/about/sections/CV.client.tsx). X-Frame-Options: DENY
        // blocks even same-origin framing, so the PDF alone gets SAMEORIGIN
        // and a frame-ancestors CSP scoped to this response. Later entries
        // override earlier ones for the same header key.
        source: "/cv/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        ],
      },
    ];
  },
};

// Wires src/i18n/request.ts in as the next-intl request config.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
