// src/features/about/utils/testimonials.ts
export type Columns = { sm?: 1 | 2; md?: 1 | 2 | 3; lg?: 1 | 2 | 3 };

export function makeGridClasses(columns: Columns): string {
  const sm = columns.sm === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2";
  const md =
    columns.md === 1 ? "md:grid-cols-1" :
    columns.md === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  const lg =
    columns.lg === 1 ? "lg:grid-cols-1" :
    columns.lg === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";
  return ["grid gap-6", sm, md, lg].join(" ");
}

export function initials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const take = parts.length >= 2 ? [parts[0], parts[parts.length - 1]] : parts;
  return take.map((p) => p[0]?.toUpperCase() ?? "").join("");
}
