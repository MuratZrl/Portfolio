// src/app/contact/loading.tsx
import {
  Shimmer,
  CardSkeleton,
  IconBoxSkeleton,
} from "@/components/ui/skeleton-primitives";

export default function ContactLoading() {
  return (
    <div className="w-full">
      {/* ── Page header ── */}
      <header className="mb-6 md:mb-8" style={{ animation: "fade-in-up 0.4s ease-out both" }}>
        <Shimmer className="h-10 w-36 mb-2" />
        <Shimmer className="h-5 w-96 max-w-full" />
      </header>

      <section className="grid w-full items-start gap-6 lg:grid-cols-[1fr_340px]">
        {/* ── Form skeleton ── */}
        <CardSkeleton delay={0.1}>
          <div className="flex items-center gap-3 mb-6">
            <IconBoxSkeleton />
            <Shimmer className="h-5 w-36" />
          </div>

          {/* Name + Email */}
          <div className="grid gap-5 sm:grid-cols-2 mb-5">
            <div>
              <Shimmer className="h-4 w-20 mb-2" />
              <Shimmer className="h-10 w-full" rounded="rounded-lg" />
            </div>
            <div>
              <Shimmer className="h-4 w-14 mb-2" />
              <Shimmer className="h-10 w-full" rounded="rounded-lg" />
            </div>
          </div>

          {/* Subject */}
          <div className="mb-5">
            <Shimmer className="h-4 w-16 mb-2" />
            <div className="grid grid-cols-3 gap-2">
              <Shimmer className="h-10 w-full" rounded="rounded-lg" />
              <Shimmer className="h-10 w-full" rounded="rounded-lg" />
              <Shimmer className="h-10 w-full" rounded="rounded-lg" />
            </div>
          </div>

          {/* Message */}
          <div className="mb-5">
            <div className="flex justify-between mb-2">
              <Shimmer className="h-4 w-18" />
              <Shimmer className="h-4 w-14" />
            </div>
            <Shimmer className="h-44 w-full" rounded="rounded-lg" />
          </div>

          {/* Submit */}
          <Shimmer className="h-12 w-full" rounded="rounded-xl" />
        </CardSkeleton>

        {/* ── Details sidebar skeleton ── */}
        <aside className="flex flex-col gap-4">
          {/* Direct */}
          <CardSkeleton delay={0.2}>
            <div className="flex items-center gap-3 mb-5">
              <IconBoxSkeleton />
              <Shimmer className="h-5 w-16" />
            </div>
            <div className="space-y-4">
              <div>
                <Shimmer className="h-3 w-10 mb-1" />
                <Shimmer className="h-4 w-48" />
              </div>
              <div className="h-px bg-border/50" />
              <div className="flex items-start gap-3">
                <Shimmer className="size-8" rounded="rounded-lg" />
                <div>
                  <Shimmer className="h-3 w-16 mb-1" />
                  <Shimmer className="h-4 w-36" />
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shimmer className="size-8" rounded="rounded-lg" />
                <div>
                  <Shimmer className="h-3 w-28 mb-1" />
                  <Shimmer className="h-4 w-40" />
                </div>
              </div>
            </div>
          </CardSkeleton>

          {/* Elsewhere */}
          <CardSkeleton delay={0.3}>
            <div className="flex items-center gap-3 mb-5">
              <IconBoxSkeleton />
              <Shimmer className="h-5 w-24" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2.5">
                  <Shimmer className="size-8" rounded="rounded-lg" />
                  <div className="flex-1">
                    <Shimmer className="h-4 w-16 mb-1" />
                    <Shimmer className="h-3 w-28" />
                  </div>
                </div>
              ))}
            </div>
          </CardSkeleton>

          {/* Support */}
          <CardSkeleton delay={0.4}>
            <div className="flex items-center gap-3 mb-4">
              <IconBoxSkeleton />
              <Shimmer className="h-5 w-20" />
            </div>
            <Shimmer className="h-4 w-56 mb-3" />
            <Shimmer className="h-8 w-24" rounded="rounded-full" />
          </CardSkeleton>
        </aside>
      </section>
    </div>
  );
}
