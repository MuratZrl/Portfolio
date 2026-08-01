import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Content-Security-Policy, set statically so pages keep static generation.
// The deliberate tradeoff (decided 2026-08-01): 'unsafe-inline' in script-src
// caps securityheaders.com at grade A. The strict alternative is a per-request
// nonce via a proxy.ts, which forces every HTML route into dynamic rendering;
// rejected because edge-cached static pages matter more here than the A+ badge.
//
// The directive list comes from an audit of what the site loads, all of it
// same-origin in production: /_next/static chunks and CSS, /_next/image (the
// placehold.co fallbacks proxy through it), next/font files, fetch("/api/
// contact"), Vercel Analytics at /_vercel/insights/, and the CV PDF iframe
// on /about (frame-src 'self'). 'unsafe-eval' is dev-only: React uses eval
// for server-error stacks in development, never in production.
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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
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

export default nextConfig;
