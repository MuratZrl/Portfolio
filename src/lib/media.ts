// src/lib/media.ts
export function placeholder(
  w: number = 1280,
  h: number = 720,
  text?: string,
  format: "png" | "jpg" = "png"
): string {
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://placehold.co/${w}x${h}.${format}${q}`; // ← .png önemli
}