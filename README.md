<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-2-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" />
</p>

<h1 align="center">murat-zorlu.dev</h1>

<p align="center">
  Personal portfolio built with Next.js 16, React 19, and Tailwind CSS 4.<br/>
  Frosted glass design, dark mode, GitHub auto-sync, contact form, and more.
</p>

<p align="center">
  <a href="https://murat-zorlu-dev.vercel.app"><strong>Live Demo</strong></a>
</p>

---

## Features

- **Frosted Glass UI** — backdrop-blur cards, gradient overlays, and smooth hover animations
- **Dark / Light Mode** — system preference detection with manual toggle, OKLCH color system
- **GitHub Auto-Sync** — fetches all public repos via GitHub API with 1-hour ISR revalidation
- **Contact Form** — React Hook Form + Zod validation, honeypot spam protection, IP rate limiting, Supabase storage
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
| **Database** | Supabase (PostgreSQL) |
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
│   ├── about/               # Timeline, skills, FAQ, CV
│   ├── contact/             # Form schema & sections
│   ├── home/                # Hero, value props, tech stack
│   └── projects/            # Project cards & filters
├── constants/projects/      # Project data & types
├── lib/
│   ├── github.ts            # GitHub API integration
│   ├── supabase/            # Supabase client
│   ├── media.ts             # Placeholder helpers
│   └── utils.ts             # cn() utility
└── theme/                   # Theme provider & toggle
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
git clone https://github.com/MuratZrl/Portfolio.git
cd Portfolio
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

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
| `npm run types:sb` | Generate Supabase types |

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, value props, featured projects, tech stack |
| `/about` | Experience timeline, skills matrix, principles, FAQ |
| `/projects` | All projects with category filters & pagination + GitHub repos |
| `/contact` | Contact form with validation & rate limiting |

---

## GitHub Auto-Sync

The projects page automatically fetches your public GitHub repositories and displays them alongside curated projects. Repos are:

- Filtered (no forks or archived repos)
- Auto-categorized by language and topics
- Deduplicated against manually curated projects
- Refreshed every hour via ISR

No API token required for public repos.

---

## Deployment

This project is configured for **Vercel**. Push to `main` and it deploys automatically.

Make sure to add the environment variables in your Vercel project settings.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built by <a href="https://github.com/MuratZrl">Murat Zorlu</a>
</p>
