// src/app/about/loading.tsx
import {
  Shimmer,
  CardSkeleton,
  IconBoxSkeleton,
  PillSkeleton,
} from "@/components/ui/skeleton-primitives";

export default function AboutLoading() {
  return (
    <div className="w-full">
      {/* ── Page header ── */}
      <header className="mb-6 md:mb-8" style={{ animation: "fade-in-up 0.4s ease-out both" }}>
        <Shimmer className="h-10 w-48 mb-2" />
        <Shimmer className="h-5 w-72" />
      </header>

      {/* ── Intro skeleton ── */}
      <section className="mt-10" style={{ animation: "fade-in-up 0.5s ease-out 0.1s both" }}>
        <CardSkeleton>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="shrink-0">
              <div
                className="size-28 rounded-2xl bg-muted"
                style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
              />
            </div>
            <div className="flex-1 space-y-3">
              <Shimmer className="h-6 w-48" />
              <Shimmer className="h-4 w-full" />
              <Shimmer className="h-4 w-full" />
              <Shimmer className="h-4 w-3/4" />
            </div>
          </div>
        </CardSkeleton>
      </section>

      {/* ── Experience skeleton ── */}
      <section className="mt-10 md:mt-12" style={{ animation: "fade-in-up 0.5s ease-out 0.2s both" }}>
        <Shimmer className="h-7 w-52 mb-6" />
        <div className="flex gap-2 mb-6">
          {["w-14", "w-16", "w-20", "w-20"].map((w, i) => (
            <PillSkeleton key={i} width={w} />
          ))}
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} delay={0.25 + i * 0.1}>
              <div className="flex items-center gap-3 mb-3">
                <IconBoxSkeleton />
                <div className="flex-1">
                  <Shimmer className="h-5 w-40 mb-1" />
                  <Shimmer className="h-3 w-28" />
                </div>
                <Shimmer className="h-5 w-20" rounded="rounded-md" />
              </div>
              <Shimmer className="h-4 w-full mb-1" />
              <Shimmer className="h-4 w-5/6 mb-3" />
              <div className="flex gap-2">
                <Shimmer className="h-5 w-14" rounded="rounded-md" />
                <Shimmer className="h-5 w-16" rounded="rounded-md" />
                <Shimmer className="h-5 w-18" rounded="rounded-md" />
              </div>
            </CardSkeleton>
          ))}
        </div>
      </section>

    </div>
  );
}
