<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Resend-Email-000000?style=for-the-badge&logo=resend&logoColor=white" />
</p>

<h1 align="center">muratzorlu.dev</h1>

<p align="center">
  Personal portfolio built with Next.js 16, React 19, and Tailwind CSS 4.<br/>
  Frosted glass design, dark mode, contact form, and more.
</p>

<p align="center">
  <a href="https://muratzorlu.dev"><strong>Live Demo</strong></a>
</p>

---

## Features

- **Frosted Glass UI** — backdrop-blur cards, gradient overlays, and smooth hover animations
- **Dark / Light Mode** — system preference detection with manual toggle, OKLCH color system
- **Contact Form** — React Hook Form + Zod validation, honeypot spam protection, IP rate limiting, Resend email forwarding
- **SEO Ready** — sitemap, robots.txt, web manifest, metadata API
- **Fully Responsive** — mobile-first with hamburger nav, optimized for all breakpoints
- **Skeleton Loading** — animated loading states across all sections
- **CV Download** — one-click resume download from the navbar

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16 (App Router, RSC, Server Actions) |
| **Language** | TypeScript 5.9 (strict mode) |
| **UI** | React 19, Tailwind CSS 4, shadcn/ui, Radix UI |
| **Icons & Fonts** | Lucide React, Geist Sans & Mono |
| **Forms** | React Hook Form, Zod 4 |
| **Email** | Resend |
| **Theming** | next-themes, OKLCH color system |
| **Deployment** | Vercel |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/
│   │   ├── contact/        # POST — form submissions (Node.js runtime)
│   │   └── qr/             # GET  — QR code generator (Edge runtime)
│   ├── about/
│   ├── contact/
│   ├── projects/
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page
│   └── globals.css          # Theme variables (OKLCH)
├── components/
│   ├── layout/              # Container, Navbar, Footer, Page
│   └── ui/                  # shadcn/ui components
├── features/                # Feature modules
│   ├── about/               # Timeline, languages, CV
│   ├── contact/             # Form schema & sections
│   ├── home/                # Hero, value props, tech stack
│   └── projects/            # Project cards & filters
├── constants/projects/      # Project data & types
├── lib/
│   ├── media.ts             # Placeholder helpers
│   └── utils.ts             # cn() utility
└── theme/                   # Theme provider & toggle
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- A [Resend](https://resend.com) account (free tier is enough for the contact form)

### Installation

```bash
git clone https://github.com/MuratZrl/Portfolio.git
cd Portfolio
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your Resend API key:

```env
RESEND_API_KEY=your_resend_api_key_here
```

Get an API key at [resend.com/api-keys](https://resend.com/api-keys). The contact form sends through Resend's `onboarding@resend.dev` sender — to send from a custom domain instead, verify your domain in Resend and update the `from` address in `src/app/api/contact/route.ts`.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

### Other Scripts

| Script | Description |
|---|---|
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript type checking |

---

## Pages and locales

Two locales with different positioning, routed by [next-intl](https://next-intl.dev). Turkish is the default and lives at the bare path; English sits under `/en`. There is no browser-language detection and no locale cookie: `/` is Turkish for everyone.

| Route | Locale | Description |
|---|---|---|
| `/` | TR | Small-business offer: hero, what I build, examples, how it works, contact |
| `/paketler` | TR | Packages and prices (`/en/paketler` redirects here) |
| `/contact` | TR | WhatsApp button, contact form and details |
| `/en` | EN | Developer portfolio: hero, how I build, projects, stack, CTA |
| `/en/about` | EN | Experience timeline, languages, CV (`/about` redirects here) |
| `/en/projects` | EN | Projects with category filters (`/projects` and `/projects/*` redirect here) |
| `/en/contact` | EN | Contact form with validation and rate limiting |

All user-facing copy lives in `messages/tr.json` and `messages/en.json`; the two files share one key set but are not translations of each other. Locale routing is in `src/i18n/` and `src/proxy.ts`; per-page canonical and hreflang metadata come from `src/lib/site.ts`.

---

## Deployment

This project is configured for **Vercel**. Push to `main` and it deploys automatically.

Add `RESEND_API_KEY` to your Vercel project's environment variables (Production scope at minimum).

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built by <a href="https://github.com/MuratZrl">Murat Zorlu</a>
</p>
