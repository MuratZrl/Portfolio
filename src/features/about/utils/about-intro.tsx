// src/features/about/utils/about-intro.ts
export function initials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const take = parts.length >= 2 ? [parts[0], parts[parts.length - 1]] : parts;
  return take.map((p) => p[0]?.toUpperCase() ?? "").join("");
}