// src/app/loading.tsx
import {
  Shimmer,
  CardSkeleton,
  IconBoxSkeleton,
  PillSkeleton,
} from "@/components/ui/skeleton-primitives";

export default function HomeLoading() {
  return (
    <div className="w-full space-y-16 sm:space-y-24">
      {/* ── Hero skeleton ── */}
      <div
        className="flex flex-col items-center gap-6 py-16 sm:py-24"
        style={{ animation: "fade-in-up 0.4s ease-out both" }}
      >
        {/* Avatar */}
        <div
          className="relative size-24 rounded-full bg-muted"
          style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, oklch(0.72 0.17 162 / 0.3), transparent 40%, oklch(0.72 0.17 162 / 0.3))",
              animation: "spin 3s linear infinite",
            }}
          />
          <div className="absolute inset-[3px] rounded-full bg-muted" />
        </div>

        {/* Status badge */}
        <Shimmer className="h-7 w-40" rounded="rounded-full" />

        {/* Title lines */}
        <div className="flex flex-col items-center gap-3">
          <Shimmer className="h-9 w-72 sm:w-96" />
          <Shimmer className="h-5 w-56 sm:w-80" />
        </div>

        {/* CTA buttons */}
        <div className="flex gap-3">
          <PillSkeleton width="w-24" />
          <PillSkeleton width="w-28" />
        </div>
      </div>

      {/* ── Value Props skeleton ── */}
      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        style={{ animation: "fade-in-up 0.5s ease-out 0.15s both" }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} delay={0.2 + i * 0.08}>
            <div className="flex items-center gap-3 mb-4">
              <IconBoxSkeleton />
              <Shimmer className="h-5 w-28" />
            </div>
            <Shimmer className="h-4 w-full mb-2" />
            <Shimmer className="h-4 w-3/4" />
          </CardSkeleton>
        ))}
      </div>

      {/* ── Projects skeleton ── */}
      <div style={{ animation: "fade-in-up 0.5s ease-out 0.3s both" }}>
        <div className="mb-6 flex items-center gap-3">
          <Shimmer className="h-7 w-40" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} delay={0.35 + i * 0.08}>
              <Shimmer className="mb-4 h-40 w-full" rounded="rounded-xl" />
              <Shimmer className="h-5 w-3/4 mb-2" />
              <Shimmer className="h-4 w-full mb-1" />
              <Shimmer className="h-4 w-2/3 mb-4" />
              <div className="flex gap-2">
                <Shimmer className="h-5 w-14" rounded="rounded-md" />
                <Shimmer className="h-5 w-16" rounded="rounded-md" />
                <Shimmer className="h-5 w-12" rounded="rounded-md" />
              </div>
            </CardSkeleton>
          ))}
        </div>
      </div>

      {/* ── Tech Stack skeleton ── */}
      <div style={{ animation: "fade-in-up 0.5s ease-out 0.45s both" }}>
        <div className="mb-6 flex items-center gap-3">
          <Shimmer className="h-7 w-32" />
        </div>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/80 p-3"
              style={{ animation: `fade-in-up 0.4s ease-out ${0.5 + i * 0.05}s both` }}
            >
              <div
                className="flex size-8 items-center justify-center rounded-lg bg-primary/10"
                style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
              >
                <div className="size-4 rounded bg-primary/20" />
              </div>
              <div className="flex-1">
                <Shimmer className="h-4 w-16 mb-1" />
                <Shimmer className="h-2 w-full" rounded="rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA skeleton ── */}
      <CardSkeleton className="text-center py-12" delay={0.6}>
        <Shimmer className="mx-auto h-8 w-64 mb-3" />
        <Shimmer className="mx-auto h-4 w-80 mb-6" />
        <div className="flex justify-center gap-3">
          <PillSkeleton width="w-28" />
          <PillSkeleton width="w-24" />
        </div>
      </CardSkeleton>
    </div>
  );
}
