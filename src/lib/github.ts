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

  return repos
    .filter((r) => !r.fork && !r.archived)
    .map((r) => repoToProject(r));
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

function repoToProject(repo: GitHubRepo): Project {
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
  };
}

/** "my-cool-repo" → "My Cool Repo" */
function formatRepoName(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
