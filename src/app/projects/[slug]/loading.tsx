// src/app/projects/[slug]/loading.tsx
import { Shimmer } from "@/components/ui/skeleton-primitives";
import { Page } from "@/components/layout/Page";
import { Separator } from "@/components/ui/separator";

export default function ProjectDetailLoading() {
  return (
    <Page>
      <section>
        {/* Back link */}
        <Shimmer className="h-5 w-32 mb-6" />

        {/* Title & actions */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 space-y-2">
            <Shimmer className="h-9 w-80 max-w-full md:h-10" />
            <Shimmer className="h-6 w-full max-w-2xl" />
            <Shimmer className="h-6 w-3/4 max-w-xl" />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Shimmer className="h-9 w-32" rounded="rounded-md" />
            <Shimmer className="h-9 w-32" rounded="rounded-md" />
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {["w-20", "w-24", "w-16", "w-24", "w-20", "w-16"].map((w, i) => (
            <Shimmer key={i} className={`h-7 ${w}`} rounded="rounded-md" />
          ))}
        </div>

        {/* Hero image (BrowserFrame placeholder) */}
        <div className="mt-8">
          <BrowserFrameSkeleton />
        </div>
      </section>

      <Separator className="my-8" />

      {/* Stats grid */}
      <section>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1 rounded-xl border border-[var(--edge-soft)] bg-[var(--surface)] px-3 py-4 "
            >
              <Shimmer className="h-4 w-4" rounded="rounded-md" />
              <Shimmer className="h-3 w-16" />
              <Shimmer className="h-4 w-20" />
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}

/* -------------------------------- Helpers -------------------------------- */

function BrowserFrameSkeleton() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary/15 via-muted/50 to-primary/5 p-3 sm:p-6 lg:p-8">
      <div className="overflow-hidden rounded-xl border border-[var(--edge-soft)] bg-card shadow-xl">
        <div
          aria-hidden
          className="flex h-7 items-center gap-1.5 border-b border-[var(--edge-soft)] bg-muted/60 px-3"
        >
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <Shimmer className="aspect-video w-full" rounded="rounded-none" />
      </div>
    </div>
  );
}
