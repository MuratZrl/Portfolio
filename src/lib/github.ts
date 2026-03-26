// src/lib/github.ts
import type { Project, ProjectCategory } from "@/constants/projects/types";

const GITHUB_USERNAME = "MuratZrl";
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

type GitHubRepo = {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  archived: boolean;
  created_at: string;
  updated_at: string;
};

type ContributorStats = {
  total: number;
  author: { login: string };
};

/**
 * Fetch all public repos for the configured GitHub user.
 * Uses Next.js fetch cache with 1-hour revalidation.
 */
export async function getGitHubRepos(): Promise<Project[]> {
  const res = await fetch(
    `${GITHUB_API}?per_page=100&sort=updated&type=owner`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    console.error(`GitHub API error: ${res.status}`);
    return [];
  }

  const repos: GitHubRepo[] = await res.json();
  const filtered = repos.filter((r) => !r.fork && !r.archived);

  // Fetch commit counts in parallel
  const commitCounts = await Promise.all(
    filtered.map((r) => getCommitCount(r.full_name)),
  );

  return filtered.map((r, i) => repoToProject(r, commitCounts[i]));
}

/** Get total commit count for a repo using the Contributors Stats API. */
async function getCommitCount(fullName: string): Promise<number> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${fullName}/contributors?per_page=100&anon=true`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return 0;
    const contributors: ContributorStats[] = await res.json();
    return contributors.reduce((sum, c) => sum + c.total, 0);
  } catch {
    return 0;
  }
}

/** Map language / topics to the closest ProjectCategory. */
function inferCategory(repo: GitHubRepo): ProjectCategory {
  const lang = (repo.language ?? "").toLowerCase();
  const topics = repo.topics.map((t) => t.toLowerCase());
  const all = [lang, repo.name.toLowerCase(), ...topics].join(" ");

  if (all.includes("e-commerce") || all.includes("ecommerce") || all.includes("shop"))
    return "E-Commerce";
  if (all.includes("auth") || all.includes("authentication") || all.includes("oauth"))
    return "Auth";
  if (all.includes("cli") || all.includes("tooling") || all.includes("devtool"))
    return "Tooling";
  if (all.includes("backend") || all.includes("api") || all.includes("express") || all.includes("fastapi"))
    return "Backend";
  if (all.includes("frontend") || all.includes("react") || all.includes("vue") || all.includes("svelte") || lang === "css" || lang === "html")
    return "Frontend";

  return "Full-Stack";
}

function repoToProject(repo: GitHubRepo, commitCount: number): Project {
  const tags: string[] = [];
  if (repo.language) tags.push(repo.language);
  tags.push(...repo.topics);
  tags.push(...inferTags(repo));

  const createdDate = repo.created_at.slice(0, 10) as Project["createdAt"];

  return {
    slug: `/projects/gh-${repo.name}` as Project["slug"],
    title: formatRepoName(repo.name),
    summary: repo.description ?? "No description provided.",
    tags,
    category: inferCategory(repo),
    links: {
      ...(repo.homepage
        ? { demo: { href: repo.homepage, label: "Live" } }
        : {}),
      repo: { href: repo.html_url, label: "Repo" },
    },
    metrics:
      repo.stargazers_count > 0
        ? { stars: String(repo.stargazers_count) }
        : undefined,
    featured: false,
    createdAt: createdDate,
    commitCount,
  };
}

/**
 * Enrich curated projects with commit counts from their GitHub repos.
 */
export async function enrichWithCommitCounts(
  projects: readonly Project[],
): Promise<Project[]> {
  const enriched = await Promise.all(
    projects.map(async (p) => {
      const repoUrl = p.links?.repo?.href ?? "";
      const match = repoUrl.match(/github\.com\/([^/]+\/[^/]+)/);
      if (!match) return { ...p };
      const commitCount = await getCommitCount(match[1]);
      return { ...p, commitCount };
    }),
  );
  return enriched;
}

/** Extra details for a single repo's detail page. */
export type RepoDetails = {
  readme: string | null;
  languages: Record<string, number>;
  lastCommitDate: string | null;
  openIssues: number;
  forks: number;
  watchers: number;
  defaultBranch: string;
};

/**
 * Fetch detailed info for a single GitHub repo by name.
 */
export async function getRepoDetails(repoName: string): Promise<RepoDetails | null> {
  const fullName = `${GITHUB_USERNAME}/${repoName}`;
  const opts = { next: { revalidate: 3600 } } as const;

  try {
    const [repoRes, readmeRes, langsRes, commitsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${fullName}`, opts),
      fetch(`https://api.github.com/repos/${fullName}/readme`, {
        ...opts,
        headers: { Accept: "application/vnd.github.raw+json" },
      }),
      fetch(`https://api.github.com/repos/${fullName}/languages`, opts),
      fetch(`https://api.github.com/repos/${fullName}/commits?per_page=1`, opts),
    ]);

    const repo = repoRes.ok ? await repoRes.json() : null;
    const readme = readmeRes.ok ? await readmeRes.text() : null;
    const languages: Record<string, number> = langsRes.ok ? await langsRes.json() : {};
    const commits = commitsRes.ok ? await commitsRes.json() : [];

    return {
      readme,
      languages,
      lastCommitDate: commits[0]?.commit?.committer?.date?.slice(0, 10) ?? null,
      openIssues: repo?.open_issues_count ?? 0,
      forks: repo?.forks_count ?? 0,
      watchers: repo?.watchers_count ?? 0,
      defaultBranch: repo?.default_branch ?? "main",
    };
  } catch {
    return null;
  }
}

/**
 * Find a GitHub repo name from a project (curated or auto-fetched).
 */
export function extractRepoName(project: Project): string | null {
  const repoUrl = project.links?.repo?.href ?? "";
  const match = repoUrl.match(/github\.com\/[^/]+\/([^/]+)/);
  return match ? match[1] : null;
}

/** Known tech keywords → display label. Checked against description + repo name. */
const TAG_KEYWORDS: [pattern: RegExp, label: string][] = [
  [/\bnext\.?js\b/i, "Next.js"],
  [/\bnestjs\b/i, "NestJS"],
  [/\btypescript\b/i, "TypeScript"],
  [/\btailwind/i, "Tailwind CSS"],
  [/\breact\b/i, "React"],
  [/\bnode\.?js\b/i, "Node.js"],
  [/\bexpress\b/i, "Express"],
  [/\bsocket\.?io\b/i, "Socket.io"],
  [/\bredis\b/i, "Redis"],
  [/\bpostgresql\b|\bpostgres\b/i, "PostgreSQL"],
  [/\bprisma\b/i, "Prisma"],
  [/\bsupabase\b/i, "Supabase"],
  [/\bdocker\b/i, "Docker"],
  [/\bstripe\b/i, "Stripe"],
  [/\bjwt\b/i, "JWT"],
  [/\boauth\b/i, "OAuth"],
  [/\bgraphql\b/i, "GraphQL"],
  [/\bmongodb\b|\bmongo\b/i, "MongoDB"],
  [/\bmui\b|\bmaterial.?ui\b/i, "MUI"],
  [/\bpuppeteer\b/i, "Puppeteer"],
  [/\bsoap\b/i, "SOAP"],
  [/\bcron\b/i, "Cron"],
  [/\bscrape[sr]?\b|\bscraping\b/i, "Web Scraping"],
  [/\brate.?limit/i, "Rate Limiting"],
  [/\bcircuit.?breaker\b/i, "Circuit Breaker"],
  [/\bload.?balanc/i, "Load Balancing"],
  [/\breverse.?proxy\b/i, "Reverse Proxy"],
  [/\bkanban\b/i, "Kanban"],
  [/\bwebsocket\b/i, "WebSocket"],
  [/\bdrag.?and.?drop\b/i, "Drag & Drop"],
  [/\bframer.?motion\b/i, "Framer Motion"],
  [/\bshadcn\b/i, "shadcn/ui"],
  [/\bzod\b/i, "Zod"],
  [/\be-?commerce\b/i, "E-Commerce"],
  [/\bmulti.?tenant\b/i, "Multi-Tenant"],
  [/\be2e\b|\bend.?to.?end\b/i, "E2E Tests"],
  [/\brls\b/i, "RLS"],
];

/** Extract extra tags from repo description and name that aren't already present. */
function inferTags(repo: GitHubRepo): string[] {
  const text = `${repo.name} ${repo.description ?? ""}`;
  const existing = new Set(
    [...repo.topics, repo.language ?? ""].map((t) => t.toLowerCase()),
  );

  const extra: string[] = [];
  for (const [pattern, label] of TAG_KEYWORDS) {
    if (pattern.test(text) && !existing.has(label.toLowerCase())) {
      extra.push(label);
      existing.add(label.toLowerCase());
    }
  }
  return extra;
}

/** "my-cool-repo" → "My Cool Repo" */
function formatRepoName(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
