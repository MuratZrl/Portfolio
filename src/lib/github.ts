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
  const all = [lang, ...topics].join(" ");

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

/** "my-cool-repo" → "My Cool Repo" */
function formatRepoName(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
