// src/app/projects/loading.tsx
import {
  Shimmer,
  CardSkeleton,
  PillSkeleton,
} from "@/components/ui/skeleton-primitives";

export default function ProjectsLoading() {
  return (
    <div className="w-full">
      {/* ── Page header ── */}
      <header className="mb-6 md:mb-8" style={{ animation: "fade-in-up 0.4s ease-out both" }}>
        <Shimmer className="h-10 w-40 mb-2" />
        <Shimmer className="h-5 w-80 max-w-full" />
      </header>

      {/* ── Filter bar ── */}
      <div
        className="flex flex-wrap gap-2 mb-6"
        style={{ animation: "fade-in-up 0.4s ease-out 0.1s both" }}
      >
        {["w-14", "w-20", "w-16", "w-18", "w-16"].map((w, i) => (
          <PillSkeleton key={i} width={w} />
        ))}
      </div>

      {/* ── Projects grid ── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} delay={0.15 + i * 0.08}>
            {/* Image */}
            <Shimmer className="mb-4 h-44 w-full" rounded="rounded-xl" />

            {/* Title + badge */}
            <div className="flex items-center gap-2 mb-2">
              <Shimmer className="h-5 w-40" />
              <Shimmer className="h-5 w-14" rounded="rounded-md" />
            </div>

            {/* Description */}
            <Shimmer className="h-4 w-full mb-1" />
            <Shimmer className="h-4 w-5/6 mb-4" />

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              <Shimmer className="h-5 w-14" rounded="rounded-md" />
              <Shimmer className="h-5 w-18" rounded="rounded-md" />
              <Shimmer className="h-5 w-12" rounded="rounded-md" />
              <Shimmer className="h-5 w-16" rounded="rounded-md" />
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-auto">
              <Shimmer className="h-8 w-20" rounded="rounded-full" />
              <Shimmer className="h-8 w-24" rounded="rounded-full" />
            </div>
          </CardSkeleton>
        ))}
      </div>
    </div>
  );
}
