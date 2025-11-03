// src/features/about/sections/SkillsMatrix.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Layout,
  Database,
  Wrench,
  ShieldCheck,
  Languages,
  ExternalLink,
} from "lucide-react";

type Skill = {
  name: string;
  level: number; // 0..100
  hint?: string;
};

type GroupId = "frontend" | "backend" | "tooling" | "quality";

type Group = {
  id: GroupId;
  title: string;
  icon: React.ReactNode;
  skills: readonly Skill[];
  note?: string;
};

type Lang = {
  name: string;
  level: "Native" | "C2" | "C1" | "B2" | "B1" | "A2" | "A1";
};

type Cert = {
  title: string;
  org: string;
  year?: string;
  href?: string;
};

type SkillsMatrixProps = {
  heading?: string;
  subheading?: string;
  groups?: readonly Group[];
  languages?: readonly Lang[];
  certs?: readonly Cert[];
  className?: string;
};

const DEFAULT_GROUPS: readonly Group[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: <Layout className="h-4 w-4" aria-hidden />,
    skills: [
      { name: "Next.js (RSC + SA)", level: 90, hint: "RSC, Server Actions, Route Handlers" },
      { name: "TypeScript", level: 90, hint: "strict, generics, utility types" },
      { name: "Shadcn UI", level: 85, hint: "primitives + composition" },
      { name: "Tailwind CSS", level: 85, hint: "design tokens, fluid spacing" },
    ],
    note: "Product-focused component design with accessibility and performance first.",
  },
  {
    id: "backend",
    title: "Backend",
    icon: <Database className="h-4 w-4" aria-hidden />,
    skills: [
      { name: "Server Actions", level: 80, hint: "mutations + cache-aware" },
      { name: "PostgreSQL", level: 75, hint: "indexes, plan analysis, JSONB" },
      { name: "Prisma", level: 75, hint: "schema-first, migrations" },
      { name: "Auth", level: 70, hint: "session/JWT, roles/permissions" },
    ],
    note: "Keep it simple. Fewer dependencies, higher productivity.",
  },
  {
    id: "tooling",
    title: "Tooling",
    icon: <Wrench className="h-4 w-4" aria-hidden />,
    skills: [
      { name: "ESLint", level: 85, hint: "rules, perf, CI enforcement" },
      { name: "Prettier", level: 90, hint: "readability standard" },
      { name: "Turborepo", level: 70, hint: "remote cache + pipelines" },
      { name: "Vite", level: 70, hint: "fast dev, close to test runner" },
    ],
  },
  {
    id: "quality",
    title: "Quality",
    icon: <ShieldCheck className="h-4 w-4" aria-hidden />,
    skills: [
      { name: "Playwright", level: 70, hint: "e2e, traces, CI" },
      { name: "Vitest", level: 75, hint: "unit, mocks, coverage" },
      { name: "Lighthouse", level: 85, hint: "perf budgets, PWA" },
      { name: "Axe (A11y)", level: 80, hint: "WCAG checks" },
    ],
    note: "Allow failures in CI so issues fall before they hit prod.",
  },
] as const;

const DEFAULT_LANGS: readonly Lang[] = [
  { name: "Turkish", level: "Native" },
  { name: "English", level: "B2" },
  { name: "Espanol", level: "B1" },
] as const;

const DEFAULT_CERTS: readonly Cert[] = [
  { title: "Web Accessibility (A11y) Principles", org: "Independent Study", year: "2024" },
  { title: "Modern Next.js Architecture", org: "Personal R&D", year: "2025" },
] as const;

export default function SkillsMatrix({
  heading = "Skills & Tools",
  subheading = "Technologies used in practice and quality tooling.",
  groups = DEFAULT_GROUPS,
  languages = DEFAULT_LANGS,
  certs = DEFAULT_CERTS,
  className,
}: SkillsMatrixProps): React.JSX.Element {
  const headingId = React.useId();
  const firstTab = groups[0]?.id ?? "frontend";

  return (
    <section
      aria-labelledby={headingId}
      className={cn(/* burada sayfa padding’i yok, global layout veriyor */ className)}
    >
      <div className="mb-8 flex flex-col gap-2">
        <h2 id={headingId} className="text-xl font-semibold tracking-tight sm:text-2xl">
          {heading}
        </h2>
        <p className="text-sm text-muted-foreground">{subheading}</p>
      </div>

      {/* EŞİT YÜKSEKLİK SİHİRİ: items-stretch + iki kolonu h-full esnet */}
      <div className="grid items-stretch gap-8 lg:grid-cols-3">
        {/* Left: Tabs alanı 2 kolon kaplar ve yükseklik doldurur */}
        <div className="lg:col-span-2 h-full">
          <Tabs defaultValue={firstTab} className="h-full flex flex-col">
            <TabsList className="flex w-full flex-wrap justify-start">
              {groups.map((g) => (
                <TabsTrigger key={g.id} value={g.id} className="gap-2">
                  {g.icon}
                  <span>{g.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {groups.map((g) => (
              <TabsContent
                key={g.id}
                value={g.id}
                className="mt-6 flex-1"
              >
                <Card className="h-full flex flex-col">
                  <CardHeader className="pb-0">
                    <CardTitle className="text-base sm:text-lg">{g.title}</CardTitle>
                    {g.note ? <CardDescription>{g.note}</CardDescription> : null}
                  </CardHeader>

                  <CardContent className="pt-4 flex-1">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {g.skills.map((s) => (
                        <SkillRow key={s.name} skill={s} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Right: iki kart; ikincisi kalan yüksekliği doldurur */}
        <div className="h-full grid grid-rows-[auto,1fr] gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Languages className="h-4 w-4" aria-hidden />
                Languages
              </CardTitle>
              <CardDescription>Language proficiency for communication and documentation.</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2">
                {languages.map((l) => (
                  <li key={l.name} className="flex items-center justify-between">
                    <span className="text-sm">{l.name}</span>
                    <Badge variant="outline" className="text-xs">{l.level}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="h-full flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <ShieldCheck className="h-4 w-4" aria-hidden />
                Certificates
              </CardTitle>
              <CardDescription>Official or independent validations.</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 flex-1">
              <ul className="space-y-3">
                {certs.map((c) => (
                  <li key={`${c.title}-${c.org}`} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-medium">{c.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {c.org}{c.year ? ` · ${c.year}` : ""}
                      </div>
                    </div>
                    {c.href ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View certificate: ${c.title}`}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                        Open
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Parts ---------------------------------- */

function SkillRow({ skill }: { skill: Skill }): React.JSX.Element {
  const clamped = clamp0to100(skill.level);
  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <Badge variant="outline">{skill.name}</Badge>
          {skill.hint ? (
            <span className="hidden truncate text-xs text-muted-foreground sm:inline">
              {skill.hint}
            </span>
          ) : null}
        </div>
        <span className="tabular-nums text-xs text-muted-foreground">{clamped}%</span>
      </div>
      <Progress value={clamped} aria-label={`Level for ${skill.name} is ${clamped} percent`} />
    </div>
  );
}

function clamp0to100(n: number): number {
  if (Number.isNaN(n)) return 0;
  if (n < 0) return 0;
  if (n > 100) return 100;
  return Math.round(n);
}
