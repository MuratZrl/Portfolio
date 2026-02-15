// src/app/donate/loading.tsx
import {
  Shimmer,
  CardSkeleton,
  IconBoxSkeleton,
  PillSkeleton,
} from "@/components/ui/skeleton-primitives";

export default function DonateLoading() {
  return (
    <div className="w-full">
      {/* ── Page header ── */}
      <header className="mb-6 md:mb-8" style={{ animation: "fade-in-up 0.4s ease-out both" }}>
        <Shimmer className="h-10 w-32 mb-2" />
        <Shimmer className="h-5 w-80 max-w-full" />
      </header>

      {/* ── Verified badge ── */}
      <div style={{ animation: "fade-in-up 0.4s ease-out 0.1s both" }}>
        <Shimmer className="h-8 w-48 mb-6" rounded="rounded-full" />
      </div>

      {/* ── Tab bar ── */}
      <div
        className="flex gap-2 mb-6"
        style={{ animation: "fade-in-up 0.4s ease-out 0.15s both" }}
      >
        <PillSkeleton width="w-20" />
        <PillSkeleton width="w-18" />
      </div>

      {/* ── Account card ── */}
      <CardSkeleton delay={0.2}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <IconBoxSkeleton />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Shimmer className="h-5 w-32" />
              <Shimmer className="h-5 w-10" rounded="rounded-md" />
            </div>
            <Shimmer className="h-3 w-40" />
          </div>
        </div>

        {/* IBAN field */}
        <div className="mb-5 rounded-xl border border-border/50 bg-background/60 p-4">
          <div className="flex items-center justify-between mb-2">
            <Shimmer className="h-3 w-10" />
            <div className="flex gap-2">
              <Shimmer className="h-7 w-16" rounded="rounded-lg" />
              <Shimmer className="h-7 w-16" rounded="rounded-lg" />
            </div>
          </div>
          <Shimmer className="h-10 w-full" rounded="rounded-lg" />
          <Shimmer className="h-3 w-64 mt-2" />
        </div>

        {/* Detail fields */}
        <div className="mb-5 grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border/50 bg-background/60 p-3">
              <div className="flex items-center justify-between mb-1.5">
                <Shimmer className="h-3 w-16" />
                <Shimmer className="h-6 w-14" rounded="rounded-lg" />
              </div>
              <Shimmer className="h-9 w-full" rounded="rounded-lg" />
            </div>
          ))}
        </div>

        {/* Note builder */}
        <div className="rounded-xl border border-border/50 bg-background/60 p-4 mb-5">
          <Shimmer className="h-5 w-36 mb-1" />
          <Shimmer className="h-3 w-64 mb-3" />
          <div className="flex gap-2">
            <Shimmer className="h-10 flex-1" rounded="rounded-lg" />
            <Shimmer className="h-10 w-24" rounded="rounded-lg" />
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-border/50" />

        {/* Actions */}
        <div className="flex gap-3 mb-5">
          <Shimmer className="h-9 w-32" rounded="rounded-full" />
          <Shimmer className="h-9 w-28" rounded="rounded-full" />
        </div>

        {/* Summary */}
        <div className="rounded-xl border border-border/50 bg-background/60 p-4">
          <Shimmer className="h-5 w-32 mb-2" />
          <Shimmer className="h-24 w-full" rounded="rounded-lg" />
        </div>
      </CardSkeleton>

      {/* ── Notes card ── */}
      <div className="mt-6">
        <CardSkeleton delay={0.4}>
          <div className="flex items-center gap-3 mb-4">
            <IconBoxSkeleton />
            <Shimmer className="h-5 w-16" />
          </div>
          <div className="space-y-3">
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-5/6" />
            <Shimmer className="h-4 w-2/3" />
          </div>
        </CardSkeleton>
      </div>
    </div>
  );
}
